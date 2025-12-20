
function Header({ onSidebarToggle, onLogout, user }) {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white px-6 py-4 shadow-2xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="text-white hover:bg-white/25 p-3 rounded-xl transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95 shadow-lg backdrop-blur-md bg-white/15"
          aria-label="Toggle Sidebar"
        >
          <svg className="w-6 h-6 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <span className="font-serif font-bold text-xl select-none drop-shadow-md block">AnimaLand Admin</span>
            <span className="text-xs text-white/90 font-medium">Management System</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-2xl px-5 py-2.5 shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
          <div className="w-9 h-9 bg-white/30 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-white/80 font-medium">Welcome back</p>
            <p className="select-none font-bold drop-shadow-md">{user?.username || 'Admin'}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2 font-bold shadow-xl hover:scale-110 hover:shadow-2xl active:scale-95"
        >
          <svg className="w-5 h-5 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
