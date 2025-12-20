import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-PH', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-PH', {
      timeZone: 'Asia/Manila',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <span className="text-xl">🕐</span>
        </div>
        <div>
          <p className="text-xs text-white/80 font-medium">Philippine Time</p>
          <p className="text-lg font-bold drop-shadow-md">{formatTime(time)}</p>
        </div>
      </div>
      <div className="text-xs text-white/90 font-medium pl-13">
        {formatDate(time)}
      </div>
    </div>
  );
}

function Sidebar({ status }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useAuth();

  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: "📊" },
    { text: "Owners", path: "/owners", icon: "👥" },
    { text: "Employee", path: "/employee", icon: "👨‍⚕️" },
    { text: "Pets", path: "/pets", icon: "🐕" },
    { text: "Appointment", path: "/appointment", icon: "📅" },
    { text: "Treatment Records", path: "/treatment-records", icon: "📋" },
  ];

  if (!status) return null;

  const activePage = menuItems.find((item) => item.path === location.pathname)?.text || "";

  return (
    <aside
      className={`bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white w-64 min-h-screen p-6 flex flex-col shadow-2xl transition-transform relative overflow-hidden ${
        status ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-y-16 -translate-x-16"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* LOGO */}
        <div className="mb-10 flex items-center gap-3 group cursor-pointer">
          <div className="w-14 h-14 bg-white/25 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <span className="text-2xl font-bold drop-shadow-lg">🐾</span>
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold tracking-wide drop-shadow-md">
              {username || "AnimaLand"}
            </h2>
            <p className="text-xs text-white/90 font-medium">Vet Clinic System</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {menuItems.map((item, idx) => {
              const isActive = activePage === item.text;
              return (
                <li key={idx}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-4 p-4 rounded-2xl w-full text-left transition-all duration-300 group ${
                      isActive
                        ? "bg-white text-pink-600 shadow-2xl font-bold scale-105 translate-x-2"
                        : "hover:bg-white/15 hover:translate-x-2 hover:shadow-lg active:scale-95"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className={`text-2xl transform transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-125 group-hover:rotate-12"
                    }`}>
                      {item.icon}
                    </span>
                    <span className={`text-base ${isActive ? "font-bold" : "font-medium"}`}>
                      {item.text}
                    </span>
                    {isActive && (
                      <span className="ml-auto">
                        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Clock and Date */}
        <div className="mt-auto pt-6 border-t border-white/30">
          <Clock />
        </div>


      </div>
    </aside>
  );
}

export default Sidebar;