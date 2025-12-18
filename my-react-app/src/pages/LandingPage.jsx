import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: "🏥",
      title: "Wellness Exams",
      description: "Comprehensive health checkups to keep your pet in optimal condition",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "💉",
      title: "Vaccinations",
      description: "Complete immunization programs to protect against diseases",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🔬",
      title: "Diagnostic Services",
      description: "State-of-the-art lab testing and imaging for accurate diagnosis",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "⚕️",
      title: "Surgery",
      description: "Advanced surgical procedures with experienced veterinary surgeons",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: "🦷",
      title: "Dental Care",
      description: "Professional teeth cleaning and oral health maintenance",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: "🚑",
      title: "Emergency Care",
      description: "24/7 emergency services for urgent pet health situations",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      pet: "Golden Retriever - Max",
      text: "The staff at VetPets AnimaLand are absolutely wonderful! They treated Max like family and explained everything clearly. Highly recommend!",
      rating: 5,
      image: "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Michael Chen",
      pet: "Persian Cat - Luna",
      text: "Best veterinary clinic I've ever been to. The doctors are knowledgeable, caring, and Luna always feels comfortable here.",
      rating: 5,
      image: "https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Emily Rodriguez",
      pet: "Beagle - Charlie",
      text: "From routine checkups to emergency care, VetPets AnimaLand has been there for us. Their compassion and expertise are unmatched!",
      rating: 5,
      image: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const stats = [
    { number: "15+", label: "Years of Experience" },
    { number: "10,000+", label: "Happy Pets Treated" },
    { number: "20+", label: "Expert Veterinarians" },
    { number: "24/7", label: "Emergency Support" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🐾</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">VetPets AnimaLand</h1>
              <p className="text-xs text-gray-600">Premium Pet Healthcare</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-2.5 text-gray-700 font-semibold hover:text-pink-600 transition-colors"
            >
              Explore
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Admin Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.coverr.co/videos/coverr-happy-puppy-running-7323/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/80 via-purple-900/70 to-rose-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <div className="inline-block mb-6 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/30 animate-pulse">
            ✨ Where Pets Come First
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight tracking-tight">
            Welcome to<br />
            <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300 bg-clip-text text-transparent">
              VetPets AnimaLand
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
            Providing exceptional veterinary care with compassion, expertise, and cutting-edge medical technology
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/home")}
              className="group bg-white text-pink-600 font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3"
            >
              Explore Our Services
              <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
            </button>
            <button
              className="bg-white/20 backdrop-blur-md text-white font-bold px-10 py-5 rounded-full border-2 border-white/50 hover:bg-white/30 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3"
            >
              <span className="text-xl">📞</span>
              Contact Us
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/6235241/pexels-photo-6235241.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Veterinarian with pet"
                className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-pink-100 rounded-full text-pink-600 font-semibold text-sm">
                About Our Clinic
              </div>
              <h2 className="text-5xl font-black mb-6 text-gray-900 leading-tight">
                Trusted Pet Healthcare Since 2010
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                VetPets AnimaLand has been the trusted choice for pet owners seeking exceptional veterinary care. Our state-of-the-art facility combines modern medical technology with compassionate care.
              </p>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Our team of board-certified veterinarians and skilled technicians are dedicated to providing comprehensive healthcare services, from preventive wellness to complex surgical procedures.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">Award-Winning Care</h3>
                    <p className="text-gray-600">Recognized for excellence in veterinary medicine and client service</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">Advanced Technology</h3>
                    <p className="text-gray-600">Equipped with the latest diagnostic and treatment equipment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">Compassionate Team</h3>
                    <p className="text-gray-600">Every pet receives personalized attention and gentle care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-purple-100 rounded-full text-purple-600 font-semibold text-sm">
              Our Services
            </div>
            <h2 className="text-5xl font-black mb-6 text-gray-900">Complete Pet Care Solutions</h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto">
              From routine wellness visits to specialized treatments, we offer comprehensive veterinary services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className="text-4xl">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-rose-100 rounded-full text-rose-600 font-semibold text-sm">
              Testimonials
            </div>
            <h2 className="text-5xl font-black mb-6 text-gray-900">What Pet Parents Say</h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-12 shadow-xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeTestimonial ? 'opacity-100 block' : 'opacity-0 hidden'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.pet}
                      className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-white shadow-lg"
                    />
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-2xl">★</span>
                      ))}
                    </div>
                    <p className="text-2xl text-gray-800 mb-6 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.pet}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial 
                      ? 'bg-pink-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facility Showcase */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full text-blue-600 font-semibold text-sm">
              Our Facility
            </div>
            <h2 className="text-5xl font-black mb-6 text-gray-900">State-of-the-Art Clinic</h2>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto">
              Tour our modern facility designed for optimal pet care and comfort
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/6235241/pexels-photo-6235241.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Examination room"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Modern Examination Rooms</h3>
                  <p className="text-white/90">Comfortable spaces for thorough checkups</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/7469408/pexels-photo-7469408.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Surgical suite"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Advanced Surgical Suite</h3>
                  <p className="text-white/90">Equipped for complex procedures</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/5792674/pexels-photo-5792674.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Diagnostic lab"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Diagnostic Laboratory</h3>
                  <p className="text-white/90">Rapid in-house testing capabilities</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/4197526/pexels-photo-4197526.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Recovery area"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Comfortable Recovery Areas</h3>
                  <p className="text-white/90">Peaceful spaces for post-treatment care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-pink-600 via-rose-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Give Your Pet<br />the Best Care?
          </h2>
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Schedule an appointment today and experience the VetPets AnimaLand difference
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/home")}
              className="bg-white text-pink-600 font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg"
            >
              <span className="text-2xl">📅</span>
              Book Appointment
              <span className="text-xl">→</span>
            </button>
            <button
              className="bg-white/20 backdrop-blur-md text-white font-bold px-12 py-6 rounded-full border-2 border-white/50 hover:bg-white/30 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3 text-lg"
            >
              <span className="text-2xl">📞</span>
              Call Us: (555) 123-4567
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🐾</span>
                </div>
                <h3 className="text-white font-bold text-lg">VetPets AnimaLand</h3>
              </div>
              <p className="text-sm leading-relaxed">
                Providing exceptional veterinary care with compassion and expertise since 2010.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Wellness Exams</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Surgery</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Emergency Care</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Dental Care</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>123 Pet Care Lane, Cabanatuan City</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>info@vetpets.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2025 VetPets AnimaLand. All rights reserved.</p>
            <p className="text-sm">Compassionate care for your beloved companions 🐾</p>
          </div>
        </div>
      </footer>
    </div>
  );
}