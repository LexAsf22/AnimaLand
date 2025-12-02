import { useState } from "react";

export default function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin(username.trim(), password);
    }, 2000);
  }

  return (
    <>
      {/* STUNNING Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600">
          <div className="text-center relative">
            {/* Multiple expanding rings for dramatic effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/30 rounded-full animate-ping"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-white/20 rounded-full animate-ping" style={{animationDelay: '0.5s', animationDuration: '2s'}}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-white/10 rounded-full animate-ping" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
            </div>
            
            {/* Massive bouncing heart with glow effect */}
            <div className="relative z-10 mb-8">
              <svg className="w-32 h-32 text-white mx-auto drop-shadow-2xl animate-bounce" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.8))'}}>
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            
            {/* Animated text with pulse */}
            <div className="relative z-10 space-y-4">
              <h2 className="text-5xl font-serif text-white font-bold tracking-wide animate-pulse drop-shadow-lg">
                Welcome! 🐾
              </h2>
              <p className="text-white text-2xl font-medium animate-bounce drop-shadow-md">
                Entering AnimaLand...
              </p>
            </div>
            
            {/* Four dancing dots */}
            <div className="relative z-10 flex justify-center gap-4 mt-10">
              <div className="w-5 h-5 bg-white rounded-full animate-bounce shadow-lg"></div>
              <div className="w-5 h-5 bg-white rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.15s'}}></div>
              <div className="w-5 h-5 bg-white rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.3s'}}></div>
              <div className="w-5 h-5 bg-white rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.45s'}}></div>
            </div>

            {/* Sparkle effects */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-20 right-16 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute bottom-16 left-20 w-4 h-4 bg-white rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute bottom-10 right-10 w-3 h-3 bg-white rounded-full animate-ping" style={{animationDelay: '0.9s'}}></div>
          </div>
        </div>
      )}

      {/* Main Login Screen with Dramatic Exit */}
      <div className={`fixed inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-auto transition-all duration-1000 ${isLoading ? 'scale-150 opacity-0 blur-2xl rotate-12' : 'scale-100 opacity-100 blur-0 rotate-0'}`}>
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className={`w-full max-w-5xl flex items-center gap-12 transition-all duration-1000 ${isLoading ? '-translate-y-32 opacity-0 scale-75' : 'translate-y-0 opacity-100 scale-100'}`}>
            {/* Image Section */}
            <div className={`hidden lg:flex flex-1 items-center justify-center transition-all duration-1000 ${isLoading ? '-translate-x-20 opacity-0' : 'translate-x-0 opacity-100'}`}>
              <img 
                src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=600&q=80" 
                alt="Veterinary care" 
                className="rounded-3xl shadow-2xl w-full h-auto object-cover max-h-[600px]"
              />
            </div>

            {/* Login Section */}
            <div className={`flex-1 w-full max-w-md transition-all duration-1000 ${isLoading ? 'translate-x-20 opacity-0' : 'translate-x-0 opacity-100'}`}>
              {/* Logo/Icon Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full mb-4 shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-serif text-gray-800 mb-2">AnimaLand Vet Clinic</h1>
                <p className="text-sm text-gray-500 font-light tracking-wide">Veterinary Clinic</p>
              </div>

              {/* Login Card */}
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-pink-100 hover:shadow-2xl transition-shadow">
                <h2 className="text-2xl font-serif text-gray-800 mb-8 text-center">Welcome Back</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white/50"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white/50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={onSwitchToRegister}
                      className="text-pink-500 hover:text-pink-600 font-semibold transition-colors hover:underline"
                    >
                      Create Account
                    </button>
                  </p>
                </div>
              </div>

              {/* Footer */}
              <p className="text-center text-xs text-gray-500 mt-8">
                © 2025 AnimaLand Vet Clinic. Caring for your beloved companions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}