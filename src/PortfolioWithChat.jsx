import React, { useState, useEffect, useRef } from "react";

export default function PortfolioWithChat() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Shaznay's assistant – ask me about her skills, education, or resume.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Replace this with your Flowise deployment URL
  const FLOWISE_API_URL = "https://flowise-production-a48c.up.railway.app/api/v1/prediction/128c5ff7-b5d0-4bc0-8425-df4afb5df15d";

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
      // Option 1: Try WITHOUT Authorization header first
      const res = await fetch(FLOWISE_API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
          // Remove Authorization if your Flowise instance doesn't need it
        },
        body: JSON.stringify({ 
          question: text
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Response:", errorText);
        throw new Error(`Flowise API error: ${res.status}`);
      }

      const data = await res.json();
      console.log("API Response:", data);
      
      const reply = data.text || data.answer || data.output || JSON.stringify(data);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-slate-800">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative max-w-6xl mx-auto p-6 flex items-center justify-between backdrop-blur-sm">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Shaznay Samantha Lopez
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-medium">
            University of Cebu • 4th Year BSIT
          </p>
        </div>
        <nav className="space-x-6 hidden md:flex">
          <a href="#skills" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors relative group">
            Skills
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#education" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors relative group">
            Education
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#certificates" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors relative group">
            Certificates
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#resume" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors relative group">
            Resume
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative max-w-6xl mx-auto p-6">
        <section id="hero" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                👋 Welcome to my portfolio
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              Hi – I'm{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Shaznay
              </span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              4th year BSIT student passionate about crafting elegant web and mobile solutions. 
              I turn ideas into reality through clean code and thoughtful design.
            </p>
            <div className="flex gap-4">
              <a 
                href="#skills" 
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105"
              >
                Explore My Work
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a 
                href="#cv" 
                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-indigo-200"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>

              <div className="relative rounded-full shadow-2xl w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 hover:scale-105 transition-transform duration-500 ring-8 ring-white flex items-center justify-center overflow-hidden">
                
                {/* PLACE YOUR IMAGE HERE */}
                <img 
                  src="/myphoto.jpg" 
                  alt="Shaznay" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Technical Skills
            </h3>
            <p className="text-slate-600">Technologies and tools I work with</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "HTML/CSS/JS", icon: "🌐", color: "from-orange-400 to-red-400" },
              { name: "Flutter/Dart", icon: "📱", color: "from-blue-400 to-cyan-400" },
              { name: "ASP.NET Core", icon: "⚡", color: "from-purple-400 to-indigo-400" },
              { name: "SQL Server/MySQL", icon: "🗄️", color: "from-green-400 to-emerald-400" },
              { name: "Firebase", icon: "🔥", color: "from-yellow-400 to-orange-400" },
              { name: "UI/UX Basics", icon: "🎨", color: "from-pink-400 to-rose-400" }
            ].map((skill, i) => (
              <div 
                key={i} 
                className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-slate-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative flex items-center space-x-4">
                  <span className="text-4xl">{skill.icon}</span>
                  <span className="font-bold text-slate-800">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Education
            </h3>
            <p className="text-slate-600">Academic background</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-indigo-100 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  🎓
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">
                    Bachelor of Science in Information Technology
                  </h4>
                  <p className="text-indigo-600 font-semibold mb-2">University of Cebu</p>
                  <p className="text-slate-600">4th Year Student • Expected Graduation 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section id="certificates" className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Certificates
            </h3>
            <p className="text-slate-600">Professional certifications and achievements</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Cisco CCNAv7: Introduction to Networks", icon: "🌐", color: "from-blue-500 to-cyan-500", pdf: "/certificates/ccna-intro-networks.pdf" },
              { name: "Cisco CCNAv7: Switching, Routing and Wireless Essentials", icon: "🔌", color: "from-indigo-500 to-purple-500", pdf: "/certificates/ccna-switching-routing.pdf" }
            ].map((cert, i) => (
              <a
                key={i}
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-slate-100 overflow-hidden cursor-pointer"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${cert.color}`}></div>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-2xl flex items-center justify-center text-white text-3xl`}>
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900">{cert.name}</h4>
                    <p className="text-slate-500 text-sm mt-1 flex items-center">
                      Cisco Networking Academy
                      <span className="ml-2 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Resume */}
        <section id="resume" className="mt-24 mb-32">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-3xl shadow-2xl">
            <h3 className="text-4xl font-black mb-4 text-white">
              Ready to work together?
            </h3>
            <p className="text-indigo-100 mb-8 text-lg">
              Download my resume to learn more about my experience and projects
            </p>
            <a 
              href="/cv.pdf" 
              download 
              className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 font-bold text-lg group"
            >
              <span>Download CV</span>
              <span className="text-2xl group-hover:translate-y-1 transition-transform">⬇️</span>
            </a>
          </div>
        </section>
      </main>

      {/* Chat Assistant Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setShowChat((s) => !s)}
          className="flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1 hover:scale-105 group"
        >
          <span className="text-2xl">💬</span>
          <span className="font-bold">AI Assistant</span>
        </button>
      </div>

      {/* Chat Panel */}
      <aside
        className={`fixed right-6 bottom-24 z-50 w-96 max-w-full bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 border-2 border-indigo-100 ${showChat ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
        style={{ maxHeight: "600px" }}
      >
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <div className="font-bold text-lg">AI Assistant</div>
                <div className="text-xs text-indigo-100">Powered by Flowise</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={clearHistory} 
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition backdrop-blur-sm"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowChat(false)} 
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`${
                  m.role === "user" 
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" 
                    : "bg-white text-slate-800 shadow-md border border-slate-200"
                } p-4 rounded-2xl max-w-[80%] ${m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
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

        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center space-x-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-5 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 transition"
            />
            <button 
              disabled={loading} 
              onClick={handleSend}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </aside>

      <footer className="relative max-w-6xl mx-auto p-8 text-center text-slate-500 border-t border-slate-200 mt-16">
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
      `}</style>
    </div>
  );
}