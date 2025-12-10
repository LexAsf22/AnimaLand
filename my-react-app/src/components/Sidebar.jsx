import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar({ status }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useAuth();

  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: "🏠" },
    { text: "Users", path: "/users", icon: "👤" },
    { text: "Employee", path: "/employee", icon: "💼" },
    { text: "Appointment", path: "/appointment", icon: "📅" },
    { text: "Treatment Records", path: "/treatment-records", icon: "📝" },
    { text: "Settings", path: "/settings", icon: "⚙️" },
  ];

  if (!status) return null;

  const activePage = menuItems.find((item) => item.path === location.pathname)?.text || "";

  return (
    <aside
      className={`bg-gradient-to-b from-pink-500 via-rose-500 to-pink-600 text-white w-64 min-h-screen p-6 flex flex-col shadow-xl transition-transform ${
        status ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* LOGO */}
      <div className="mb-10 flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <span className="text-xl font-bold">AL</span>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-wide">{username || "AnimaLand"}</h2>
          <p className="text-xs text-white/80">Vet Clinic</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, idx) => {
            const isActive = activePage === item.text;
            return (
              <li key={idx}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-4 p-4 rounded-xl w-full text-left transition-all ${
                    isActive
                      ? "bg-white text-pink-600 shadow-lg font-semibold scale-105"
                      : "hover:bg-white/10 hover:translate-x-1"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className={isActive ? "text-pink-600" : "text-white"}>{item.icon}</span>
                  <span className="text-base">{item.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-white/20">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-xs text-white/90 mb-2">Need Help?</p>
          <button className="text-sm text-white hover:text-white/80">Contact Support →</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
