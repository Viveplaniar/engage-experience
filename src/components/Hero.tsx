
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const parallaxElements = heroRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || "0.2";
        const yPos = scrollPosition * parseFloat(speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.querySelectorAll('.delayed-animation').forEach(element => {
          element.classList.add('animate-fade-in');
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 z-0 parallax" 
        data-speed="0.15"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%), url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 pt-20 md:pt-0">
        <div className="max-w-3xl mx-auto md:ml-0">
          <div className="flex flex-col items-start space-y-6 text-left">
            <span 
              className="delayed-animation opacity-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-planiar-100 text-planiar-800"
            >
              Para empresas y emprendedores
            </span>
            
            <h1 
              className="delayed-animation opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              ¡Sumá tus experiencias a Planiar y llegá a más clientes!
            </h1>
            
            <p 
              className="delayed-animation opacity-0 text-xl md:text-2xl text-gray-600 max-w-2xl"
              style={{ transitionDelay: "0.2s" }}
            >
              Potenciá tu negocio conectando con personas en busca de experiencias únicas. Sin costos fijos, solo pagás cuando vendés.
            </p>
            
            <div 
              className="delayed-animation opacity-0 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
              style={{ transitionDelay: "0.3s" }}
            >
              <a 
                href="#registro" 
                className={cn(
                  "inline-flex h-12 px-8 items-center justify-center rounded-full",
                  "bg-planiar-600 text-white hover:bg-planiar-700 hover:scale-105",
                  "text-base font-medium transition-all duration-300 ease-in-out",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                Registrate gratis
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
              
              <a 
                href="#como-funciona" 
                className="inline-flex h-12 px-6 items-center justify-center rounded-full bg-white text-planiar-600 hover:text-planiar-700 hover:bg-gray-100 text-base font-medium transition-all border border-gray-200 hover:border-gray-300 shadow-sm"
              >
                ¿Cómo funciona?
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating element for visual interest */}
      <div className="hidden lg:block absolute bottom-[10%] right-[10%] z-10 w-64 h-64 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/40 shadow-xl animate-float" style={{ backdropFilter: 'blur(12px)' }}>
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
          <p className="text-lg font-medium text-gray-900">Más de</p>
          <p className="text-5xl font-bold text-planiar-600 my-2">500+</p>
          <p className="text-lg font-medium text-gray-900">proveedores confían en Planiar</p>
        </div>
      </div>
      
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 z-5 opacity-5" style={{ 
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
        backgroundSize: '30px 30px' 
      }}></div>
    </div>
  );
};

export default Hero;
