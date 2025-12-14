import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Header Section */}
      <header className="relative bg-gradient-to-br from-pink-600 via-rose-600 to-purple-600 text-white py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="inline-block mb-4 px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/30">
            ✨ Premium Pet Healthcare
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Welcome to<br />
            <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
              VetPets AnimaLand
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Comprehensive pet care for your beloved companions, delivered with expertise and compassion
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-white text-pink-600 font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all transform hover:scale-105 hover:-translate-y-1 inline-flex items-center gap-2"
          >
            Explore Our Clinic
            <span className="text-xl">→</span>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-50 to-transparent"></div>
      </header>

      {/* About Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <p className="text-gray-700 text-xl max-w-4xl mx-auto leading-relaxed">
            VetPets AnimaLand is dedicated to providing compassionate, high-quality veterinary care
            to pets and their owners. Our team of experienced veterinarians and staff are committed
            to ensuring your pets stay happy and healthy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/4587999/pexels-photo-4587999.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Caring pets" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Experienced Veterinarians</h3>
              <p className="text-gray-600 leading-relaxed">Our vets provide expert care for all pets, from routine checkups to advanced surgical procedures.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/4588004/pexels-photo-4588004.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Healthy pets" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Comprehensive Services</h3>
              <p className="text-gray-600 leading-relaxed">From wellness exams to customized treatment plans, we cover all aspects of comprehensive pet care.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Pet love" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-8">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">💖</span>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Caring Environment</h3>
              <p className="text-gray-600 leading-relaxed">A welcoming, safe, and stress-free space designed for the comfort of both pets and their owners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Login Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="inline-block mb-6 px-4 py-2 bg-pink-500/20 backdrop-blur-sm rounded-full text-pink-300 text-sm font-medium">
            🔐 Secure Access
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Administrative Portal</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            If you are an admin, securely login to manage the clinic system, appointments, records, and more.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105 hover:-translate-y-1 inline-flex items-center gap-2"
          >
            <span className="text-xl">🔑</span>
            Admin Login
            <span className="text-xl">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm">© 2025 VetPets AnimaLand. All rights reserved.</p>
          <p className="text-sm mt-2">Compassionate care for your beloved companions 🐾</p>
        </div>
      </footer>
    </div>
  );
}
