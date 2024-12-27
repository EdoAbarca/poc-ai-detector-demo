import homeImg from "../assets/images/homeImg.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  /*
  
  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Powerful Search</h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      Our Powerful Search feature allows you to find any email, contact, or file in seconds.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Reliable Security</h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      With Reliable Security, your data is always safe and protected.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m8 6 4-4 4 4" />
                        <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                        <path d="m20 22-5-5" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Easy Collaboration</h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      Easy Collaboration allows you to share and edit documents with your team in real time.
                    </p>
                  </div>
  */
  return (
    <div>
      <Navbar/>
      <div className="relative flex flex-col py-16 lg:pt-0 lg:flex-col lg:pb-0">
        <div className="border-y border-r-2 flex flex-col items-start w-full max-w-xl px-4 mx-auto lg:px-8 lg:max-w-screen-xl">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-red-500">
                  Prueba de concepto
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                La destreza de los LLMs no debe permitir deshonestidad
              </h2>
              <p className="text-base text-justify text-gray-700 md:text-lg">
                PoC AI Detector nace como prueba de concepto de un integrador múltiple de detectores de texto generados por inteligencia artificial, cuyo principal objetivo es identificar si estas se utilizaron para generar el texto analizado.
              </p>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <Link to="/login" className="inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-medium tracking-wide text-white transition duration-500 rounded-2xl shadow-md md:w-auto md:mr-4 md:mb-0 bg-sky-300 hover:bg-sky-500 focus:shadow-outline focus:outline-none">
                Entrar ahora
              </Link>
              <Link to="/faq" className="inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-medium tracking-wide text-white transition duration-500 rounded-2xl shadow-md md:w-auto md:mr-4 md:mb-0 bg-sky-300 hover:bg-sky-500 focus:shadow-outline focus:outline-none">
                Saber más
              </Link>
            </div>
          </div>
        </div>
        <div className="border inset-y-0 right-0 w-full max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
          <img
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full"
            src={homeImg}
            alt=""
          />
        </div>
      </div>
      <section className="w-full py-6 md:py-12 lg:py-16 xl:py-24 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  El uso de IAs en situaciones académicas es un problema creciente
                </h1>
                <p className="max-w-[720px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto p-10">
                  Este servicio no es un sustituto de su criterio, pero sí una herramienta de referencia que ayudará a detectar posibles casos de engaño.
                </p>
              </div>
              <div className="w-full max-w-full space-y-4 mx-auto">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Actualizado a lo último en IA</h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      Esta propuesta utiliza lo último en el estado de arte del área de NLP para la detección de IA.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m8 6 4-4 4 4" />
                        <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                        <path d="m20 22-5-5" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Integración de terceros</h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                      Puedes integrar tus API Keys de IAs capaces de detectar IA en textos como ChatGPT-4 o Originality, y así robustizar el proceso de detección.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                    <div className="p-2 bg-black bg-opacity-50 rounded-full">
                      <svg
                        className=" text-white h-6 w-6 mb-2 opacity-75"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Proceso automatizado</h2>
                    <p className="text-zinc-200 dark:text-zinc-100">
                    Además de las IAs integradas, provee al sistema de las API Keys de las IAs soportadas y de los documentos; Este se encargará de todo lo demás.
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-screen py-6 md:py-12 lg:py-16 xl:py-32 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 py-4">
                  Únete a la revolución de las inteligencias artificiales
                </h1>
                <Link to="/register">
                  <button className="justify-center border-white text-white text-lg font-semibold transition duration-500 hover:text-black hover:bg-white rounded-3xl m-4 py-4 px-16">
                    Registrarse
                  </button>
                </Link></div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 py-4">
                  ¿Ya tienes una cuenta? Inicia sesión
                </h1>
                <Link to="/login">
                  <button className="justify-center border-white text-white text-lg font-semibold transition duration-500 hover:text-black hover:bg-white rounded-3xl m-4 py-4 px-16">
                    Iniciar sesión
                  </button>
                </Link></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;