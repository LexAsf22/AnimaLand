function Sidebar({ status, activePage, onMenuClick }) {
  const menuItems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      text: "Dashboard",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: "Users",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      text: "Employee",
    },

    // ⭐ NEW APPOINTMENTS MENU ITEM
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: "Appointment",
    },

    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m0 0v2H9v-2m4-6H9m6 0h-6m6 0h.01" />
        </svg>
      ),
      text: "Treatment Records",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: "Settings",
    },
  ];

  if (!status) return null;

  return (
    <aside className="bg-gradient-to-b from-pink-500 via-rose-500 to-pink-600 text-white w-64 min-h-screen p-6 flex flex-col shadow-xl">
      
      {/* LOGO */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold tracking-wide">AnimaLand</h2>
            <p className="text-xs text-white/80">Vet Clinic</p>
          </div>
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
                  onClick={() => onMenuClick(item.text)}
                  className={`flex items-center gap-4 p-4 rounded-xl w-full text-left transition-all
                    ${isActive
                      ? "bg-white text-pink-600 shadow-lg font-semibold scale-105"
                      : "hover:bg-white/10 hover:translate-x-1"
                    }`}
                >
                  <span className={isActive ? "text-pink-600" : "text-white"}>
                    {item.icon}
                  </span>
                  <span className="text-base">{item.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* FOOTER AREA */}
      <div className="mt-auto pt-6 border-t border-white/20">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-xs text-white/90 mb-2">Need Help?</p>
          <button className="text-sm text-white hover:text-white/80">
            Contact Support →
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
