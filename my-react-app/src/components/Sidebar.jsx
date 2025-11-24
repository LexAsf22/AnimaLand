function Sidebar({ isOpen }) {
  const menuItems = [
    { icon: "📊", label: "Dashboard", href: "#dashboard" },
    { icon: "📅", label: "Appointments", href: "#appointments", badge: "5" },
    { icon: "🐶", label: "Patients", href: "#patients" },
    { icon: "📋", label: "Medical Records", href: "#records" },
    { icon: "💉", label: "Treatments", href: "#treatments" },
    { icon: "📝", label: "Prescriptions", href: "#prescriptions" },
    { icon: "💵", label: "Billing", href: "#billing" },
    { icon: "⚙️", label: "Settings", href: "#settings" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-teal-700 to-teal-800 shadow-2xl z-20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">

          <div className="p-6 border-b border-teal-600">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full text-3xl">🐾</div>
              <div className="text-white">
                <h2 className="text-xl font-bold">PawCare</h2>
                <p className="text-xs text-teal-200">Veterinary Clinic</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-white rounded-lg hover:bg-teal-600 transition-all duration-200"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>

                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-teal-600">
            <a
              href="#logout"
              className="flex items-center space-x-3 px-4 py-3 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              <span>🚪</span>
              <span className="font-medium">Logout</span>
            </a>

            <div className="mt-4 p-3 bg-teal-900 rounded-lg">
              <p className="text-teal-200 text-xs text-center">
                Need help? <a href="#support" className="text-white font-semibold underline">Contact Support</a>
              </p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;
