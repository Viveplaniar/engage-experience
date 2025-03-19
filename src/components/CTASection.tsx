
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="registro" ref={sectionRef} className="section-padding bg-white overflow-hidden">
      <div className="container mx-auto relative">
        <div 
          className={cn(
            "relative z-10 bg-gradient-to-br from-planiar-600 to-planiar-900 rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden",
            "transform transition-all duration-1000 opacity-0 translate-y-10",
            isVisible && "opacity-100 translate-y-0"
          )}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-planiar-500 opacity-20 rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-planiar-500 opacity-10 rounded-full transform translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 md:max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para dar el siguiente paso con tus experiencias?
              </h2>
              <p className="text-planiar-100 text-lg mb-6">
                Únete a Planiar hoy mismo y empieza a conectar con clientes que buscan exactamente lo que ofreces. Sin costos iniciales, solo pagás cuando vendés.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Registro gratuito y rápido",
                  "Soporte personalizado para configurar tu perfil",
                  "Acceso a miles de usuarios interesados en experiencias únicas",
                  "Panel de control intuitivo para gestionar tus reservas"
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className={cn(
                      "flex items-start opacity-0 transform translate-y-4",
                      isVisible && "opacity-100 translate-y-0 transition-all duration-500"
                    )}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <svg className="flex-shrink-0 h-6 w-6 text-planiar-200 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div 
              className={cn(
                "relative rounded-xl overflow-hidden p-6 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 w-full md:w-96",
                "transform transition-all duration-700 opacity-0 translate-y-10",
                isVisible && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Registrate gratis
              </h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Nombre completo</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-planiar-200 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-planiar-200 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Teléfono</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-planiar-200 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Teléfono"
                  />
                </div>
                <div>
                  <label htmlFor="business" className="sr-only">Nombre del negocio</label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-planiar-200 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Nombre del negocio"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-white text-planiar-600 rounded-lg font-medium hover:bg-opacity-95 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-planiar-600"
                >
                  Comenzar ahora
                </button>
              </form>
              <p className="mt-4 text-xs text-center text-planiar-200">
                Al registrarte aceptas nuestros términos y condiciones y política de privacidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
