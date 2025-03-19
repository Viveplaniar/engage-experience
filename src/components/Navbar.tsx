
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out',
        scrolled 
          ? 'py-3 glassmorphism' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center gap-2"
          aria-label="Planiar logo"
        >
          <span className="text-2xl font-semibold bg-clip-text text-planiar-600">Planiar</span>
        </a>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#beneficios" className="text-sm font-medium text-gray-700 hover:text-planiar-500 transition-colors">
            Beneficios
          </a>
          <a href="#como-funciona" className="text-sm font-medium text-gray-700 hover:text-planiar-500 transition-colors">
            Cómo Funciona
          </a>
          <a href="#testimonios" className="text-sm font-medium text-gray-700 hover:text-planiar-500 transition-colors">
            Testimonios
          </a>
          <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-planiar-500 transition-colors">
            Preguntas Frecuentes
          </a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <a 
            href="#registro" 
            className={cn(
              "hidden md:inline-flex h-9 px-4 py-2 rounded-full text-sm font-medium transition-all",
              "bg-planiar-500 text-white hover:bg-planiar-600",
              "shadow-sm hover:shadow-md"
            )}
          >
            Registrate Gratis
          </a>
          
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
