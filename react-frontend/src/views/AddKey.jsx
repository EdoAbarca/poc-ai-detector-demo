import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useAuth } from "../auth/authProvider";

function AddKey() {

  const [key, setKey] = useState("");
  const [options, setOptions] = useState([]);
  const [userKeys, setUserKeys] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [formPass, setFormPass] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    async function fetchOptions() {
      try {
        let response = await fetch("http://localhost:3333/api/final/ai/paid");
        const data = await response.json();
        console.log(data);
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOptions();
  }, [])

  useEffect(() => {
    async function fetchUserKeys() {
      try {
        let response = await fetch(`http://localhost:3333/api/final/key/user/${user.idUser}`);
        const data = await response.json();
        console.log(data);
        setUserKeys(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserKeys();
  }, [])

  function goBack() {
    navigate("/keys");
  }

  useEffect(() => {
    //console.log(userKeys);
    const keyPass = key.length > 0; //input
    const optionPass = selectedOption.length > 0; //IA seleccionada
    let oneKeyPass = false; //Verificar si ya se cargó una api key para la IA seleccionada
    //console.log(oneKeyPass);

    if (optionPass && keyPass) {
      oneKeyPass = !userKeys.find((item) => item.ai.name === selectedOption);
      console.log(oneKeyPass);
      if (!oneKeyPass) {
        Toastify({
          text: "Ya se ha cargado una API Key para la IA seleccionada. Si desea agregar una nueva, por favor elimine la existente.",
          duration: 3000,
          close: true,
          style: {
            background: "red",
            text: "white"
          }
        }).showToast();
      }
    }
    setFormPass(keyPass && optionPass && oneKeyPass);
  }, [selectedOption])

  async function handleSubmit(event) {
    event.preventDefault();
    let validKey = false;
    const selectedAi = options.find(option => option.name === selectedOption);
    if (selectedOption === "ChatGPT (GPT-4)") {
      let chatgpt_response = null;
      try {
        chatgpt_response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + key,
            },
            body: JSON.stringify({
              model: "gpt-4",
              messages: [
                {
                  role: "user",
                  content: "Just say Hi!"
                }
              ]
            }),
          }
        );
        const data = await chatgpt_response.json();
        console.log(data);
        console.log(chatgpt_response.status);
        if (chatgpt_response.status === 200) {
          validKey = true;
        }
      } catch (error) {
        console.log("Error:", error);
        Toastify({
          text: "Error al verificar la API Key: " + error.message,
          duration: 3000,
          close: true,
          style: {
            background: "red",
            text: "white"
          }
        }).showToast();
        return;
      }
    } else {
      let originality_response = null;
      try {
        originality_response = await fetch(//payments
          "https://api.originality.ai/api/v1/account/credits/balance", {
          headers: {
            "Content-Type": "application/json",
            "X-OAI-API-KEY": key,
          },
        });
        const data = await originality_response.json();
        console.log(data);
        console.log(originality_response.status);
        if (originality_response.status === 200) {
          validKey = true;
        }
      } catch (error) {
        console.log("Error:", error);
        Toastify({
          text: "Error al verificar la API Key: " + error.message,
          duration: 3000,
          close: true,
          style: {
            background: "red",
            text: "white"
          }
        }).showToast();
        return;
      }
    }

    const body = {
      "api_key": key,
      "ai_id": selectedAi.id,
      "user_id": user.idUser,
    }
    console.log(body);

    try {
      const response = await fetch("http://localhost:3333/api/final/key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ body })
      });
      const data = await response.json();
      console.log(data);
      Toastify({
        text: "API Key agregada exitósamente.",
        duration: 3000,
        close: true,
        style: {
          background: "green"
        }
      }).showToast();
      goBack();
    } catch (error) {
      console.error(error);
      Toastify({
        text: "Error al agregar la API Key: " + error.message,
        duration: 3000,
        close: true,
        style: {
          background: "red",
          text: "white"
        }
      }).showToast();
    }
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agregar API Key</h2>
          <form className="flex flex-col">
            <input
              type="text"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Llave acceso (API Key)"
              value={key}
              onChange={(event) => setKey(event.target.value)}
            />
            <select
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
            >
              <option value="">Seleccione una opción</option>
              {options.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`w-full py-2 border rounded-xl ${formPass ? "border-green-500 bg-white text-green-500 transition duration-500 ease-in-out hover:bg-green-500 hover:text-white" : "border-gray-300 bg-gray-300 text-gray-500"}`}
              disabled={!formPass}
            >
              Crear
            </button>
            <Link to={"/keys"} className="text-black py-2 px-4 mt-4 rounded-xl border border-black text-center font-semibold">
              Volver
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddKey;