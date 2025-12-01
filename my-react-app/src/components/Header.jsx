function Header({ onSidebarToggle }) {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      <button
        onClick={onSidebarToggle}
        className="text-gray-700 text-2xl focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-800">Admin Dashboard</span>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}

export default Header;
