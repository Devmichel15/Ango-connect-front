
import { FiHome, FiMapPin, FiUser, FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r border-gray-200 bg-white fixed left-0 top-0">
      
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-lg font-semibold text-gray-900">
            <img src="/logo.png" className="w-28 " alt="" />
        </span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 px-3 py-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
             ${
               isActive
                 ? "bg-gray-100 text-gray-900"
                 : "text-gray-600 hover:bg-gray-50"
             }`
          }
        >
          <FiHome size={18} />
          Home
        </NavLink>

        <NavLink
          to="/municipios"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
             ${
               isActive
                 ? "bg-gray-100 text-gray-900"
                 : "text-gray-600 hover:bg-gray-50"
             }`
          }
        >
          <FiMapPin size={18} />
          Municípios
        </NavLink>

        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
             ${
               isActive
                 ? "bg-gray-100 text-gray-900"
                 : "text-gray-600 hover:bg-gray-50"
             }`
          }
        >
          <FiUser size={18} />
          Perfil
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full px-3 py-4">
        <button
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          <FiLogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
