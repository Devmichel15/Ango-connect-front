import { useState } from "react";
import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import { HiOutlineMenu, HiX } from "react-icons/hi";

function Home() {
  // Estado para abrir/fechar sidebar no mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-64 fixed left-0 top-0 h-screen bg-white shadow-md">
        <SideBar />
      </aside>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <aside className="fixed inset-0 z-50 w-64 bg-white shadow-md md:hidden">
          <SideBar />
          {/* Botão para fechar no mobile */}
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX size={24} />
          </button>
        </aside>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col md:ml-64">
        {/* Top bar mobile: botão abrir sidebar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
          <button
            className="text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <HiOutlineMenu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Angola Connect</h1>
        </div>

        {/* Feed */}
        <div className="flex justify-center p-4">
          <div className="w-full max-w-2xl">
            <Feed />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
