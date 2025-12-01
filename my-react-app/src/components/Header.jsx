function Header({ onSidebarToggle }) {
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
        <div className="w-9 h-9 rounded-full bg-green-300 flex items-center justify-center font-bold text-green-900 cursor-default">
          Lex
        </div>
      </div>
    </header>
  );
}

export default Header;
