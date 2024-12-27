import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashCan, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import HoverText from "../components/HoverText.jsx";
import Modal from "../components/Modal.jsx";
import Navbar from "../components/Navbar.jsx";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useAuth } from "../auth/authProvider.jsx";

function Keys() {
  const [keys, setKeys] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [hiddenIds, setHiddenIds] = useState([]);
  const user = useAuth();

  useEffect(() => {
    async function fetchKeys() {
      try {
        const response = await fetch(`http://localhost:3333/api/final/key/user/${user.idUser}`);
        const data = await response.json();
        setKeys(data);
        console.log(data);
        const ids = data.map(item => item.id);
        console.log(ids);
        setHiddenIds(ids);
      } catch (error) {
        console.log(error);
      }
    }

    fetchKeys();
  }, [user.idUser]);

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:3333/api/final/key/${id}`, {
        method: "DELETE",
      });
      setKeys(keys.filter((item) => item.id !== id));
      Toastify({
        text: "API Key eliminada.",
        duration: 3000,
        close: true,
        style: {
          background: "blue",
          text: "white",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Error al eliminar la API Key: " + error.message,
        duration: 3000,
        close: true,
        style: {
          background: "red",
          text: "white",
        },
      }).showToast();
    }
  }

  function handleHide(id) {
    setHiddenIds([...hiddenIds, id]);
  }

  function handleUnhide(id) {
    setHiddenIds(hiddenIds.filter((item) => item !== id));
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="w-full sm:px-6">
        <div className="bg-white px-4 py-4 md:px-8 md:py-7 xl:px-10">
          <div className="flex items-center">
            <h1 className="font-bold text-5xl my-2">API Keys</h1>
            <HoverText text="Las API Keys son códigos alfanuméricos, necesarios para acceder a los servicios de Originality y ChatGPT (GPT-4). En caso de dudas, ver FAQ." width={375} />
            <div className="ml-auto">
              <Link to={"/keys/add"}>
                <button className="rounded-xl mt-4 mx-4 px-6 py-3 bg-white text-green-500 border border-green-500 transform ease-in-out duration-500 hover:bg-green-500 hover:text-white sm:mt-0">
                  <p className="text-sm font-medium leading-none">Agregar</p>
                </button>
              </Link>
              <Link to={"/loggedin"}>
                <button className="border border-black rounded-xl mt-4 px-6 py-3 sm:mt-0">
                  <p className="text-sm font-medium leading-none">Volver</p>
                </button>
              </Link>
            </div>
          </div>

          <div className="static overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Código</th>
                  <th scope="col" className="px-6 py-3">IA</th>
                  <th scope="col" className="px-6 py-3 text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {keys && keys.map((item) => (
                  <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {hiddenIds.includes(item.id) ? "**********" : item.api_key}
                    </th>
                    <td className="px-6 py-4">{item.ai.name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button onClick={() => { setOpen(true); setSelectedId(item.id); }} className="text-white font-bold bg-red-600 hover:bg-red-700 rounded-full px-3 py-2">
                          <FontAwesomeIcon icon={faTrash} beat />
                        </button>
                        <button onClick={() => hiddenIds.includes(item.id) ? handleUnhide(item.id) : handleHide(item.id)} className="text-white font-bold bg-black rounded-full px-3 py-2">
                          {hiddenIds.includes(item.id) ? <FontAwesomeIcon icon={faEye} beat /> : <FontAwesomeIcon icon={faEyeSlash} beat />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {selectedId && (
                  <Modal open={open} onClose={() => setOpen(false)} className="flex items-center justify-center min-h-screen">
                    <div className="text-center w-56">
                      <FontAwesomeIcon icon={faTrashCan} size="xl" className="mx-auto text-red-500" />
                      <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">¿Estás segur@?</h3>
                        <p className="text-sm text-gray-500">Esta acción es irreversible</p>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => { handleDelete(selectedId); setOpen(false); }} className="w-full bg-red-500 shadow-red-400/40 text-white flex gap-2 items-center justify-center py-2 px-4 font-semibold shadow-md rounded-xl">Eliminar</button>
                        <button className="w-full border bg-white flex gap-2 items-center justify-center py-2 px-4 font-semibold shadow-md rounded-xl" onClick={() => setOpen(false)}>Volver</button>
                      </div>
                    </div>
                  </Modal>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keys;
