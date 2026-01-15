import { Home, MapPin, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r border-slate-100 bg-white fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
            <MapPin className="text-white w-5 h-5" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">
            Angola <span className="text-blue-600">Connect</span>
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 px-4 py-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200
             ${
               isActive
                 ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                 : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
             }`
          }
        >
          <Home size={18} strokeWidth={2.2} />
          Início
        </NavLink>

        <NavLink
          to="/municipios"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200
             ${
               isActive
                 ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                 : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
             }`
          }
        >
          <MapPin size={18} strokeWidth={2.2} />
          Municípios
        </NavLink>

        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200
             ${
               isActive
                 ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                 : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
             }`
          }
        >
          <User size={18} strokeWidth={2.2} />
          Perfil
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 w-full px-4">
        <button
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-[13px] font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          <LogOut
            size={18}
            strokeWidth={2.2}
            className="group-hover:text-red-600 transition-colors"
          />
          Terminar Sessão
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
