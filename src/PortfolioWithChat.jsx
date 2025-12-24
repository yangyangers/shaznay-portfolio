import React, { useState, useEffect, useRef } from "react";

export default function PortfolioWithChat() {
  const [showChat, setShowChat] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Shaznay's assistant – ask me about her skills, education, or resume.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bottomRef = useRef(null);

  const FLOWISE_API_URL = "https://lopezshaznayelaifinals.up.railway.app/api/v1/prediction/128c5ff7-b5d0-4bc0-8425-df4afb5df15d";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(FLOWISE_API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          question: text
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      const reply = data.text || data.answer || data.output || "Sorry, I couldn't process that request.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Flowise error:", error);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry – can't reach the assistant right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearHistory() {
    const initial = [
      {
        role: "assistant",
        content: "Hi! I'm Shaznay's assistant – ask me about her skills, education, or resume.",
      },
    ];
    setMessages(initial);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100' : 'bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-slate-800'}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="relative max-w-6xl mx-auto p-4 md:p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Shaznay Samantha Lopez
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-1 font-medium">
              University of Cebu • 4th Year BSIT
            </p>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="space-x-6 hidden md:flex">
            {['skills', 'projects', 'education', 'certificates', 'contact', 'resume'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors relative group capitalize"
              >
                {section}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition ml-4"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={`md:hidden ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-t py-4`}>
            {['skills', 'projects', 'education', 'certificates', 'contact', 'resume'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full text-left px-6 py-3 ${darkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-indigo-400' : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'} transition-colors capitalize font-semibold`}
              >
                {section}
              </button>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`block w-full text-left px-6 py-3 ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-indigo-50'} transition-colors font-semibold`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <section id="hero" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 min-h-[80vh]">
          <div className="space-y-8 order-2 md:order-1">
            <div className="inline-block animate-bounce">
              <span className="px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold shadow-md">
                👋 Welcome to my portfolio
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              Hi – I'm{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Shaznay
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
              4th year BSIT student passionate about crafting elegant web and mobile solutions. 
              I turn ideas into reality through clean code and thoughtful design.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('skills')}
                className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Explore My Work</span>
                <span className="relative z-10 inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <a 
                href="/cv.pdf" 
                download
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-indigo-200 hover:border-indigo-400"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center items-center order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full blur-2xl opacity-20 animate-spin-slow"></div>

              <div className="relative rounded-full shadow-2xl w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-indigo-200 to-purple-200 hover:scale-110 transition-transform duration-700 ring-8 ring-white flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="/myphoto.jpg" 
                  alt="Shaznay" 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-32 mb-16 scroll-mt-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold">
                💻 What I Do
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Technical Skills
            </h3>
            <p className="text-slate-600 text-lg">Technologies and tools I work with</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "HTML/CSS/JS", icon: "🌐", color: "from-orange-400 to-red-400", desc: "Modern web development" },
              { name: "Flutter/Dart", icon: "📱", color: "from-blue-400 to-cyan-400", desc: "Cross-platform apps" },
              { name: "ASP.NET Core", icon: "⚡", color: "from-purple-400 to-indigo-400", desc: "Backend development" },
              { name: "SQL Server/MySQL", icon: "🗄️", color: "from-green-400 to-emerald-400", desc: "Database management" },
              { name: "Firebase", icon: "🔥", color: "from-yellow-400 to-orange-400", desc: "Cloud services" },
              { name: "UI/UX Basics", icon: "🎨", color: "from-pink-400 to-rose-400", desc: "Design principles" }
            ].map((skill, i) => (
              <div 
                key={i} 
                className={`group relative ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${skill.color} rounded-full opacity-5 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${skill.color} rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-3xl">{skill.icon}</span>
                  </div>
                  <h4 className={`font-bold text-xl ${darkMode ? 'text-slate-100' : 'text-slate-800'} mb-2`}>{skill.name}</h4>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-32 mb-16 scroll-mt-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold">
                🧩 Real Work
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </h3>
            <p className="text-slate-600 text-lg">
              Systems and applications I've built
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
            {[
              {
                title: "Homeowner Subdivision Management System",
                tech: "ASP.NET Core MVC • EF Core • SQL Server",
                desc: "A role-based system for admins, staff, and homeowners with announcements, feedback & complaints, invoices, and dashboards.",
                image: "/elnet.png",
                color: "from-indigo-500 to-purple-500",
              },
              {
                title: "Sports Store Web Application",
                tech: "ASP.NET Core MVC • SQL Server",
                desc: "E-commerce system with product catalog, shopping cart, pagination, checkout validation, and session persistence.",
                image: "/sport.png",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Online Library Book Borrowing System",
                tech: "Flask • Python • SQL",
                desc: "A library system that manages users, book inventory, borrowing and returning of books with admin controls.",
                image: "/library.png",
                color: "from-green-500 to-emerald-500",
              },
              {
                title: "AI-Powered Portfolio Assistant (RAG)",
                tech: "Flowise • GroqAI • RAG",
                desc: "A personalized AI assistant integrated into my portfolio that answers questions about my skills, education, and projects.",
                image: "/ai.png",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "GREEN ROUTE: Planner for Cyclists and Pedestrians",
                tech: "Flutter • Firebase • Google Maps",
                desc: "A mobile capstone project that designs a route-planning system emphasizing safety, accessibility, and sustainable transportation for cyclists and pedestrians.",
                image: "/greenroute.jpg",
                color: "from-emerald-500 to-teal-500",
              },
              {
                title: "Smart Trash Bin with Sensors",
                tech: "IoT • Sensors • Solar Power",
                desc: "A touchless trash bin concept using sensors and solar energy to improve hygiene and accessibility.",
                image: "/trash.png",
                color: "from-yellow-500 to-orange-500",
              },
            ].map((project, i) => (
              <div
                key={i}
                className={`group relative ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 overflow-hidden flex flex-col`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Project Image */}
                <div className={`relative h-48 md:h-56 overflow-hidden ${darkMode ? 'bg-gradient-to-br from-slate-700 to-slate-600' : 'bg-gradient-to-br from-slate-200 to-slate-300'}`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                </div>

                {/* Project Content */}
                <div className="relative p-6 md:p-8 flex flex-col flex-1">
                  <h4 className={`text-xl md:text-2xl font-black ${darkMode ? 'text-slate-100' : 'text-slate-900'} mb-2 group-hover:text-indigo-600 transition-colors`}>
                    {project.title}
                  </h4>
                  <p className="text-sm font-semibold text-indigo-600 mb-3">
                    {project.tech}
                  </p>
                  <p className={`leading-relaxed text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mt-32 mb-16 scroll-mt-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold">
                🎓 Learning Journey
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Education
            </h3>
            <p className="text-slate-600 text-lg">Academic background</p>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-6">
            {[
              {
                level: "Bachelor of Science in Information Technology",
                icon: "🎓",
                school: "University of Cebu - Main Campus",
                years: "2022 - Present",
                color: "from-indigo-500 to-purple-500",
                highlight: true
              },
              {
                level: "Senior High School - STEM",
                icon: "📚",
                school: "University of Cebu - Pri",
                years: "2018 - 2020",
                color: "from-blue-500 to-cyan-500"
              },
              {
                level: "Junior High School",
                icon: "📖",
                school: "Ramon Duterte Memorial National High School",
                years: "2014 - 2018",
                color: "from-green-500 to-emerald-500"
              },
              {
                level: "Elementary",
                icon: "✏️",
                school: "Guadalupe Elementary School",
                years: "2008 - 2014",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((edu, i) => (
              <div 
                key={i}
                className={`bg-white ${edu.highlight ? 'p-8 md:p-10' : 'p-6 md:p-8'} rounded-3xl ${edu.highlight ? 'shadow-2xl' : 'shadow-lg'} hover:shadow-xl transition-all duration-500 border-2 ${edu.highlight ? (darkMode ? 'border-slate-700' : 'border-indigo-100') : (darkMode ? 'border-slate-700' : 'border-slate-100')} relative overflow-hidden group ${darkMode ? 'bg-slate-800' : 'bg-white'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${edu.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className="flex items-start space-x-4 md:space-x-6">
                    <div className={`flex-shrink-0 ${edu.highlight ? 'w-16 h-16 md:w-20 md:h-20' : 'w-14 h-14 md:w-16 md:h-16'} bg-gradient-to-br ${edu.color} rounded-2xl md:rounded-3xl flex items-center justify-center text-white ${edu.highlight ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      {edu.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`${edu.highlight ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-black ${darkMode ? 'text-slate-100' : 'text-slate-900'} mb-2 md:mb-3 group-hover:text-indigo-600 transition-colors`}>
                        {edu.level}
                      </h4>
                      <p className={`text-indigo-600 font-bold ${edu.highlight ? 'text-base md:text-lg' : 'text-sm md:text-base'} mb-2`}>
                        {edu.school}
                      </p>
                      <p className={`text-sm md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{edu.years}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section id="certificates" className="mt-32 mb-16 scroll-mt-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold">
                🏆 Achievements
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Certificates
            </h3>
            <p className="text-slate-600 text-lg">Professional certifications and achievements</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { name: "Cisco CCNAv7: Introduction to Networks", icon: "🌐", color: "from-blue-500 to-cyan-500", pdf: "/certificates/ccna-intro-networks.pdf" },
              { name: "Cisco CCNAv7: Switching, Routing and Wireless Essentials", icon: "🔌", color: "from-indigo-500 to-purple-500", pdf: "/certificates/ccna-switching-routing.pdf" }
            ].map((cert, i) => (
              <a
                key={i}
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 overflow-hidden cursor-pointer`}
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${cert.color} group-hover:w-full group-hover:opacity-10 transition-all duration-500`}></div>
                <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${cert.color} rounded-2xl md:rounded-3xl flex items-center justify-center text-white text-3xl md:text-4xl shadow-lg group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}>
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg md:text-xl font-black ${darkMode ? 'text-slate-100' : 'text-slate-900'} mb-2 group-hover:text-indigo-600 transition-colors`}>{cert.name}</h4>
                    <p className={`text-sm flex items-center ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Cisco Networking Academy
                      <span className="ml-3 text-indigo-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-2 text-xl">→</span>
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-32 mb-16 scroll-mt-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold">
                📬 Get in Touch
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Contact Information
            </h3>
            <p className="text-slate-600 text-lg">Let's connect and discuss opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
            {[
              {
                icon: "📧",
                title: "Email",
                value: "shaznaylopez@gmail.com",
                link: "mailto:shaznaylopez@gmail.com",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "📱",
                title: "Phone",
                value: "09293171433",
                link: "tel:09293171433",
                color: "from-green-500 to-emerald-500"
              }
            ].map((contact, i) => (
              <a
                key={i}
                href={contact.link}
                className="group relative bg-white p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-slate-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {contact.icon}
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {contact.title}
                  </h4>
                  <p className="text-slate-600 text-lg font-semibold break-all">
                    {contact.value}
                  </p>
                  <p className="text-indigo-600 text-sm mt-4 flex items-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-2">
                    Click to open
                    <span className="ml-2 text-xl">→</span>
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 p-8 md:p-12 rounded-3xl border-2 border-indigo-100">
            <h4 className="text-2xl font-black text-slate-900 mb-6 text-center">Send me a Message</h4>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-5 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 transition text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-5 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 transition text-sm md:text-base"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-5 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 transition text-sm md:text-base"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-5 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 transition text-sm md:text-base resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Resume */}
        <section id="resume" className="mt-32 mb-32 scroll-mt-20">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-12 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-white rounded-full opacity-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white rounded-full opacity-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="inline-block mb-6">
                <span className="text-5xl md:text-6xl">📄</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black mb-6 text-white">
                Ready to work together?
              </h3>
              <p className="text-indigo-100 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
                Download my resume to learn more about my experience and projects
              </p>
              <a 
                href="/cv.pdf" 
                download 
                className="inline-flex items-center space-x-4 px-10 md:px-12 py-5 md:py-6 bg-white text-indigo-600 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all transform hover:-translate-y-2 hover:scale-105 font-bold text-base md:text-lg group/btn"
              >
                <span>Download CV</span>
                <span className="text-2xl md:text-3xl group-hover/btn:translate-y-1 transition-transform">⬇️</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Chat Assistant Button */}
      <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-50">
        <button
          onClick={() => setShowChat((s) => !s)}
          className="flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 md:px-8 py-4 md:py-5 rounded-3xl shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-2 hover:scale-110 group relative overflow-hidden"
          aria-label="Open AI Assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-2xl md:text-3xl relative z-10 group-hover:scale-125 transition-transform">💬</span>
          <span className="font-bold text-sm md:text-lg relative z-10 hidden sm:inline">AI Assistant</span>
        </button>
      </div>

      {/* Chat Panel */}
      <aside
        className={`fixed right-2 md:right-6 bottom-20 md:bottom-24 z-50 w-[calc(100vw-1rem)] sm:w-96 max-w-full bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 border-2 border-indigo-100 ${showChat ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
        style={{ maxHeight: "600px" }}
        aria-hidden={!showChat}
      >
        <div className="p-4 md:p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <div className="font-bold text-base md:text-lg">AI Assistant</div>
                <div className="text-xs text-indigo-100 hidden sm:block">Powered by Shaznay Samantha Lopez</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={clearHistory} 
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition backdrop-blur-sm"
                aria-label="Clear chat history"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowChat(false)} 
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`${
                  m.role === "user" 
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" 
                    : "bg-white text-slate-800 shadow-md border border-slate-200"
                } p-3 md:p-4 rounded-2xl max-w-[85%] md:max-w-[80%] ${m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"} text-sm md:text-base whitespace-pre-wrap`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-md border border-slate-200">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 md:p-4 bg-white border-t border-slate-200">
          <div className="flex items-center space-x-2 md:space-x-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-4 md:px-5 py-2 md:py-3 text-sm md:text-base rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 transition"
              aria-label="Chat input"
            />
            <button 
              disabled={loading} 
              onClick={handleSend}
              className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      </aside>

      <footer className={`relative max-w-6xl mx-auto p-8 text-center ${darkMode ? 'border-slate-700 text-slate-500' : 'border-slate-200 text-slate-500'} border-t mt-16`}>
        <p className="text-sm">
          Built with <span className="text-red-500">❤️</span> by Shaznay Samantha Lopez • © 2025
        </p>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
