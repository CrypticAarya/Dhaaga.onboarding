import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('dhaaga_token');

  const handleLogout = () => {
    localStorage.removeItem('dhaaga_token');
    navigate('/login');
  };

  return (
    <nav className="border-b border-dhaaga-border sticky top-0 bg-dhaaga-bg/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo */}
          <div className="w-8 h-8 rounded-full bg-dhaaga-accent flex items-center justify-center">
            <span className="text-dhaaga-cards font-heading text-lg italic">D</span>
          </div>
          <span className="font-heading text-2xl font-semibold tracking-wide text-dhaaga-primary">Dhaaga</span>
        </Link>
        
        <div className="flex items-center gap-8">
          {token ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-dhaaga-muted hover:text-dhaaga-primary transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-rose-800 hover:text-rose-900 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-dhaaga-muted hover:text-dhaaga-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-6 py-2.5 bg-dhaaga-primary text-dhaaga-cards text-sm font-medium rounded-full hover:bg-dhaaga-primary/90 transition-all shadow-sm">
                Apply as Brand
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
