import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      {/* Hero Section */}
      <section className="relative text-center py-32 px-6 bg-gradient-to-br from-pink-600 via-rose-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            🐾 Trusted Pet Care Since 2020
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
            VetPets AnimaLand
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Where every pet receives the love and care they deserve
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-pink-600 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            Admin Dashboard →
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive veterinary care tailored to your pet's unique needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🩺</span>
            </div>
            <h3 className="font-bold text-2xl mb-3 text-gray-900">Wellness Exams</h3>
            <p className="text-gray-600 leading-relaxed">Regular health checkups to keep your pets in top shape and catch any issues early.</p>
          </div>
          <div className="group bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">💉</span>
            </div>
            <h3 className="font-bold text-2xl mb-3 text-gray-900">Vaccinations</h3>
            <p className="text-gray-600 leading-relaxed">Protect your pets from preventable diseases with our comprehensive vaccination programs.</p>
          </div>
          <div className="group bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">⚕️</span>
            </div>
            <h3 className="font-bold text-2xl mb-3 text-gray-900">Surgery & Treatment</h3>
            <p className="text-gray-600 leading-relaxed">Advanced care and treatment with state-of-the-art facilities for any medical needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
