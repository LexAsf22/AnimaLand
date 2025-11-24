function Header({ onSidebarToggle }) {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg px-6 py-4">
      <div className="flex justify-between items-center">

        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 text-white hover:bg-teal-800 rounded-lg transition-colors duration-200"
          >
            ☰
          </button>

          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full text-teal-600 text-2xl">
              🐾
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold leading-tight">PawCare Veterinary</h1>
              <p className="text-xs text-teal-100">Compassionate Care for Your Pets</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">

          <div className="relative">
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="pl-4 pr-4 py-2 w-64 border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/95"
            />
          </div>

          <button className="relative p-2 text-white hover:bg-teal-800 rounded-lg transition-colors duration-200">
            🔔
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 cursor-pointer transition-colors duration-200">
            <div className="bg-white rounded-full p-2">
              🩺
            </div>
            <div className="text-white">
              <div className="font-semibold text-sm">Dr. KR</div>
              <div className="text-xs text-teal-100">Veterinarian</div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
