import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);


    try {
      // Request login
      const response = await fetch("http://localhost:3333/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const res = await response.json();
      console.log(res);

      if (response.status === 200) {
        // Successful login
        user.loginAction(res);
        Toastify({
          text: "Inicio de sesión exitoso.",
          duration: 3000,
          close: true,
          style: {
            background: "green",
          },
        }).showToast();
        navigate("/loggedin");
      } else {
        // Error
        Toastify({
          text: `Error: ${res.message}`,
          duration: 3000,
          close: true,
          style: {
            background: "red",
            text: "white",
          },
        }).showToast();
      }
    } catch (error) { //Por algún motivo no cae aquí
      // Error
      console.log(error);
      Toastify({
        text: `Error: ${error.message}`,
        duration: 3000,
        close: true,
        style: {
          background: "red",
          text: "white",
        },
      }).showToast();
    }

  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inicio de sesión</h2>
          <form className="flex flex-col">
            <input
              type="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Correo electrónico"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="flex items-center justify-between flex-wrap">
              <label htmlFor="remember-me" className="text-sm text-gray-900 cursor-pointer">
                <input type="checkbox" id="remember-me" className="mr-2" />Recordarme
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline mb-0.5">
                ¿Olvidaste tu contraseña?
              </a>
              <p className="text-gray-900 mt-4">
                {" "}
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-sm text-blue-500 -200 hover:underline">
                  Registrarse
                </Link>
              </p>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="border border-green-500 text-green-500 bg-white font-bold py-2 px-4 rounded-xl mt-4 hover:text-white hover:bg-green-500 transition ease-in-out duration-500"
            >
              Entrar
            </button>
            <Link
              to={"/"}
              className="text-black py-2 px-4 mt-4 rounded-xl border border-black text-center font-semibold"
            >
              Volver
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;