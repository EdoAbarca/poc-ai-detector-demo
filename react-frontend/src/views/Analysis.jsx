import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/authProvider";

export default function Analysis() {
  const [documents, setDocuments] = useState([]);
  //const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const { id } = useParams();
  console.log(id);
  const state = useLocation();
  //const analysisTitle = state.state.item.title;
  const selectedAnalysis = state.state.item;
  console.log(selectedAnalysis);
  const user = useAuth();
  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const response = await fetch(`http://localhost:3333/api/final/analysis/${id}`);
        const data = await response.json();
        console.log(data);
        //ssetSelectedAnalysis(data);
        const docs = data.documents;
        console.log(docs);
        setDocuments(docs);
        //console.log(state);
        //console.log(analysisTitle);
      } catch (error) {
        console.log(error);
        Toastify({
          text: "Error al traer los documentos. Error: " + error.message,
          duration: 3000,
          close: true,
          style: {
            background: "red",
            text: "white",
          },
        }).showToast();
      }
    }

    fetchAnalysis();
  }, [id]);

  //Poner botón de volver 

  return (
    <div>
      <Navbar user={user}/>
      <div className="w-full sm:px-6">
        <div className="container mx-auto py-6">
          <div className="flex justify-center text-2xl font-bold">Información del análisis seleccionado</div>
        </div>
        <div className="container mx-auto py-3">
          <div>
            <ul>
              <li>Título: <span className="font-semibold">{selectedAnalysis.title}</span></li>
              <li>Fecha inicialización: <span className="font-semibold">{selectedAnalysis.created}</span></li>
              <li>Cantidad archivos: <span className="font-semibold">{documents.length}</span></li>
              <li>Categorías:
                {selectedAnalysis.tags && selectedAnalysis.tags.map((tag, index) => (
                  <span key={index} className="font-semibold text-white rounded-xl bg-black inline-block ml-2 mb-2 px-2">
                    {tag.name}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <Link to={"/loggedin"}>
            <button className="border border-black rounded-xl m-4 px-6 py-3 sm:mt-0">
              <p className="text-sm font-medium leading-none">Volver</p>
            </button>
          </Link>
        </div>

        <div className="flex justify-center bg-gray-100 py-10 p-5">
          {documents && documents.map((document, index) => (
            <div key={index} className="w-full md:w-1/3 mx-2">
              <div className="bg-white shadow-xl">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th colSpan="2" className="py-4 px-6 text-center font-semibold text-white bg-blue-400 border-b border-grey-light">
                        {document.title}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {document.results.map((result, idx) => (
                      <tr key={idx} className="hover:bg-grey-lighter">
                        <td className="py-4 px-6 border-b border-grey-light">{result.ai.name}</td>
                        <td className="py-4 px-6 text-center border-b border-grey-light">
                          {`${result.ai_score}% (${result.ai_result})`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
/*
        <div id="grid" className="container mx-auto p-10 md:py-20 px-0 md:p-10 md:px-0">
          <div id="grid-form" className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 items-start">
            {documents && documents.map((document) => (
              <div key={document.id} id="card"
                className="overflow-hidden rounded-xl border-2 bg-gradient-to-r from-sky-200 p-5 transition-transform duration-500 hover:scale-105 shadow-lg">
                <div id="bottom-section" className="">
                  <div id="title" className="text-md block overflow-x-auto text-center font-bold tracking-wide text-black">{document.title}</div>
                  {document.results.map((result) => (
                    <div key={result.id} id="row row1" className="mt-6 flex justify-between">
                      <div id="item" className="flex-grow pt-1 text-center text-indigo-800">
                        <span id="big-text" className="block">{result.ai_score}%</span>
                        <span id="regular-text" className="text-xs">{result.ai.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
*/