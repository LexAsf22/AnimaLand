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
            onClick={() => navigate("/login")}
            className="bg-white text-pink-600 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            Admin Login →
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {/* ... your services cards ... */}
      </section>
    </div>
  );
}
