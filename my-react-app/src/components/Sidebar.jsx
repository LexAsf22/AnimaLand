function Sidebar({ status, activePage, onMenuClick }) {
  const menuItems = [
    { icon: "🏥", text: "Dashboard" },
    { icon: "🐾", text: "Users" },
    { icon: "📈", text: "Analytics" },
    { icon: "⚙️", text: "Settings" },
  ];

  if (!status) return null;

  return (
    <aside className="bg-green-700 text-white w-64 min-h-screen p-6 flex flex-col">
      <h2 className="text-3xl font-bold mb-10 tracking-wide select-none">Animaland</h2>

      <nav>
        <ul className="space-y-5">
          {menuItems.map((item, idx) => {
            const isActive = activePage === item.text;
            return (
              <li key={idx}>
                <button
                  onClick={() => onMenuClick(item.text)}
                  className={`flex items-center gap-4 p-3 rounded-md w-full text-left
                    transition-colors duration-200
                    ${
                      isActive
                        ? "bg-green-900 shadow-lg font-semibold"
                        : "hover:bg-green-800"
                    }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-lg">{item.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
