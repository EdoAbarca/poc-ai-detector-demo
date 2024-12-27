import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../components/Modal.jsx";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import HoverText from "../components/HoverText.jsx";
import { useAuth } from '../auth/authProvider.jsx';
import Navbar from "../components/Navbar.jsx";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function LoggedIn() {
  const [analysis, setAnalysis] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const user = useAuth();

  useEffect(() => {
    try {
      const fetchAnalysis = async () => {
        const response = await fetch(`http://localhost:3333/api/final/analysis/user/${user.idUser}`);
        const data = await response.json();
        console.log(data);
        const reversed_data = data.slice().reverse();
        console.log(reversed_data);
        setAnalysis(reversed_data);
      }
      fetchAnalysis();
    } catch (error) {
      console.log(error);
      setAnalysis([]);
    }
  }, []);

  async function handleAnalysisDelete(id) {
    try {
      await fetch(`http://localhost:3333/api/final/analysis/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
      setAnalysis(analysis.filter(item => item.id !== id));
      Toastify({
        text: "Análisis eliminado con éxito.",
        duration: 3000,
        close: true,
        style: {
          background: "blue",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Error al eliminar el análisis: " + error.message,
        duration: 3000,
        close: true,
        style: {
          background: "red",
          text: "white"
        }
      }).showToast();
    }
  }
  
  /* 
    async function testDebertav3(){
      try {
        const response = await fetch("http://localhost:8003/api/debertav3/detect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "title": "Prueba deberta v3",
            "text": ["El presidente de la República, Sebastián Piñera, anunció este jueves un nuevo plan de ayuda para la clase media, que incluye un bono de $500 mil para quienes hayan visto disminuidos sus ingresos y un préstamo solidario para la clase media, que se podrá pagar en cuatro años y con un año de gracia. El mandatario explicó que el bono de $500 mil se entregará a quienes hayan visto disminuidos sus ingresos en al menos un 20% y que pertenezcan al 80% más vulnerable de la población, según el Registro Social de Hogares. Además, el bono será entregado a quienes tengan ingresos formales entre $400 mil y $2 millones. El beneficio se entregará por una sola vez y se podrá solicitar a partir del 8 de abril en el sitio web del Servicio de Impuestos Internos (SII)."]
          })
        });
        console.log(response)
        const data = await response.json();
        console.log(data);
      }
      catch (error) {
        console.log(error);
      }
    }
  <button onClick={testDebertav3} className="p-2 rounded-xl mx-3 border border-green-500 text-green-500 bg-white transform ease-in-out duration-500 hover:bg-green-500 hover:text-white">Test deberta v3</button>           
  */

  return (
    <>
      <Navbar user={user} />
      <div className="mx-6">
        <div className="mx-auto flex max-w-screen-sm items-center justify-center mt-10">
          <div className="h-32 w-full rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 ">
            <div className="flex h-full w-full items-center justify-center bg-gray-800 rounded-full">
              <h1 className="text-2xl font-bold text-white">Bienvenido, {user.user}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-10 md:py-20 px-0 md:p-10 md:px-0">
          <div className="flex items-center mb-10">
            <div className="flex items-center">
              <h1 className="text-5xl font-semibold align-middle">Historial</h1>
              <HoverText text="Aquí se mostrarán los análisis realizados previamente. Para ver el análisis en detalle, seleccionar el botón Ver." width={280} />
            </div>
            <div className="ml-auto">
              <Link to="/analysis/form">
                <button className="p-2 rounded-xl mx-3 border border-green-500 text-green-500 bg-white transform ease-in-out duration-500 hover:bg-green-500 hover:text-white">Nuevo análisis</button>
              </Link>
              <Link to="/keys">
                <button className="p-2 rounded-xl mx-3 border border-blue-500 text-blue-500 bg-white transform ease-in-out duration-500 hover:bg-blue-500 hover:text-white">Gestionar API keys</button>
              </Link>
              <Link to="/tags">
                <button className="p-2 rounded-xl mx-3 border border-blue-500 text-blue-500 bg-white transform ease-in-out duration-500 hover:bg-blue-500 hover:text-white">Gestionar categorías</button>
              </Link>
            </div>
          </div>
          {analysis && analysis.length > 0 ? (
            <>
              <div id="tarjetas analisis" className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 items-start">
                {analysis.map((item) => (
                  <div key={item.id} className="p-5 shadow-lg transition-transform duration-500 hover:scale-105 bg-gray-100 rounded-2xl">
                    <h2 className="font-semibold my-3 text-gray-600 text-xl text-center">{item.title}</h2>
                    <div className="flex flex-row justify-between mt-2 font-semibold text-md text-gray-600">
                      <span>Fecha</span>
                      <span>{item.created}</span>
                    </div>
                    <div className="flex flex-row justify-between mt-2 font-semibold text-md text-gray-600">
                      <span>Archivos</span>
                      <span>{item.documents.length}</span>
                    </div>
                    <div className="flex flex-row justify-between mt-2 font-semibold text-md text-gray-600">
                      <span>Tags: </span>
                      <span>{item.tags && item.tags.map((tag, index) => (
                        <span key={index} className="font-semibold text-white rounded-xl bg-black inline-block ml-2 mb-0.5 px-2">
                          {tag.name}
                        </span>
                      ))}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 justify-between px-4 gap-4">
                      <Link to={`/analysis/${item.id}`} state={{ item }} className="text-center mt-4 p-2 text-blue-500 bg-white border border-blue-500 rounded-xl transition ease-in-out duration-500 hover:bg-blue-500 hover:text-white">
                        <button>Ver</button>
                      </Link>
                      <button onClick={() => {
                        setOpen(true);
                        setSelectedId(item.id);
                      }} className="text-center mt-4 p-2 text-red-500 bg-white rounded-xl border border-red-500 transition ease-in-out duration-500 hover:bg-red-500 hover:text-white">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
              {selectedId && (
                <Modal open={open} onClose={() => setOpen(false)} className="flex items-center justify-center min-h-screen">
                  <div className="text-center w-56">
                    <FontAwesomeIcon icon={faTrashCan} size="xl" className="mx-auto text-red-500" />
                    <div className="mx-auto my-4 w-48">
                      <h3 className="text-lg font-black text-gray-800">¿Estás segur@?</h3>
                      <p className="text-sm text-gray-500">Esta acción es irreversible</p>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => { handleAnalysisDelete(selectedId); setOpen(false) }} className="w-full bg-red-500 shadow-red-400/40 text-white flex gap-2 items-center justify-center py-2 px-4 font-semibold shadow-md rounded-xl">Eliminar</button>
                      <button className="w-full border bg-white flex gap-2 items-center justify-center py-2 px-4 font-semibold shadow-md rounded-xl" onClick={() => setOpen(false)}>Volver</button>
                    </div>
                  </div>
                </Modal>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-center text-gray-600 text-xl">No hay análisis para mostrar.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LoggedIn;