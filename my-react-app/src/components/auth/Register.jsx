import { useState } from "react";

export default function Register({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (username.trim() === "") {
      alert("Username cannot be empty");
      return;
    }

    const success = onRegister(username.trim(), password);
    if (success) {
      setUsername("");
      setPassword("");
      setConfirm("");
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-auto">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-5xl flex items-center gap-12">
          {/* Image Section */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=600&q=80" 
              alt="Veterinary care" 
              className="rounded-3xl shadow-2xl w-full h-auto object-cover max-h-[600px]"
            />
          </div>

          {/* Register Section */}
          <div className="flex-1 w-full max-w-md">
            {/* Logo/Icon Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-serif text-gray-800 mb-2">AnimaLand Vet Clinic</h1>
              <p className="text-sm text-gray-500 font-light tracking-wide">Veterinary Clinic</p>
            </div>

            {/* Register Card */}
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-pink-100">
              <h2 className="text-2xl font-serif text-gray-800 mb-2 text-center">Create Account</h2>
              <p className="text-sm text-gray-500 text-center mb-8">Join our caring community</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    placeholder="Choose a username"
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
                    placeholder="Create a password"
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white/50"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Create Account
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-pink-500 hover:text-pink-600 font-semibold transition-colors"
                  >
                    Sign In
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
  );
}