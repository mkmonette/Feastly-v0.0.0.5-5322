import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Benefits from '@/components/sections/Benefits';
import Footer from '@/components/layout/Footer';
import AuthPage from '@/components/auth/AuthPage';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ProductProvider } from '@/context/ProductContext';

function HomePage({ setView }) {
  return (
    <>
      <Header onAuthClick={() => setView('auth')} />
      <main>
        <Hero />
        <Features />
        <Benefits />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_data');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user_data');
  };

  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={
              user ? <Navigate to="/dashboard" replace /> : <HomePage setView={(v) => window.location.hash = `#/${v}`} />
            } />
            
            <Route path="/auth" element={
              user ? <Navigate to="/dashboard" replace /> : <AuthPage onBack={() => window.location.hash = '#/'} onLogin={handleLogin} />
            } />

            <Route path="/*" element={
              user ? <DashboardLayout role={user.role} onLogout={handleLogout} /> : <Navigate to="/" replace />
            } />
          </Routes>
          
          {/* Navigation Helper for demo */}
          <div className="fixed bottom-4 left-4 z-50 flex space-x-2">
            {['Admin', 'Business', 'Customer'].map(role => (
              <button 
                key={role}
                onClick={() => handleLogin({ role })}
                className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg hover:bg-orange-600 transition-colors uppercase tracking-wider"
              >
                Dev: {role}
              </button>
            ))}
            {user && (
              <button 
                onClick={handleLogout}
                className="bg-white text-gray-900 border border-gray-200 px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm hover:bg-gray-50 transition-colors uppercase tracking-wider"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;