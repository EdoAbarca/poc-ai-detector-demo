import Navbar from "../components/Navbar";
function ForgotPassword() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recuperar contraseña</h2>
          <form className="flex flex-col">
            <input type="email" className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Correo electrónico" />
            <input type="password" className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Nueva contraseña" />
            <div className="flex items-center justify-between flex-wrap">
              <label htmlFor="remember-me" className="text-sm text-gray-900 cursor-pointer">
                <input type="checkbox" id="remember-me" className="mr-2">
                  Recordarme
                </input>
              </label>
            </div>
            <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Actualizar</button>
            <button className="text-black py-2 px-4 rounded-md">Volver</button>
          </form>
        </div>
      </div>
    </div>
    );
}

export default ForgotPassword;