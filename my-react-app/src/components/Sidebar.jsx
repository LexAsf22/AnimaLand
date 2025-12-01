function Sidebar({ status }) {
  const menuItems = [
    { icon: "🏠", text: "Dashboard", link: "/" },
    { icon: "👥", text: "Users", link: "/user" },
    { icon: "📊", text: "Analytics", link: "/analytic" },
    { icon: "⚙️", text: "Settings", link: "/setting" },
  ];

  if (!status) return null;

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Animaland</h2>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.link}
                className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
