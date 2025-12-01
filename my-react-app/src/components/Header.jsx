function Header({ onSidebarToggle, onLogout, user }) {
  return (
    <header className="flex items-center justify-between bg-green-600 text-white px-6 py-4 shadow-md">
      <button
        onClick={onSidebarToggle}
        className="text-white text-3xl focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      <div className="flex items-center space-x-4">
        <span className="font-semibold text-lg select-none">Vet Clinic Admin</span>

        <div className="flex items-center space-x-4">
          <span className="select-none">{user?.username}</span>

          <button
            onClick={onLogout}
            className="bg-green-800 hover:bg-green-900 px-3 py-1 rounded text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
