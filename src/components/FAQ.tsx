
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "¿Cuánto cuesta ser proveedor en Planiar?",
    answer: "Planiar no cobra costos fijos ni mensuales. Solo pagas una comisión cuando vendes una experiencia a través de la plataforma. De esta manera, no hay riesgos para tu negocio y solo pagas cuando obtienes resultados."
  },
  {
    question: "¿Cómo recibo mis pagos por las ventas realizadas?",
    answer: "Los pagos se procesan automáticamente y se transfieren a tu cuenta bancaria cada 15 días. Todo el proceso es seguro y transparente, y puedes seguir el estado de tus pagos en tiempo real desde tu panel de control."
  },
  {
    question: "¿Cuánto tiempo toma configurar mi perfil y comenzar a vender?",
    answer: "El proceso de registro y configuración es muy rápido. La mayoría de los proveedores logran tener su perfil completo y sus primeras experiencias publicadas en menos de 24 horas. Nuestro equipo de soporte está disponible para ayudarte en cada paso."
  },
  {
    question: "¿Qué tipo de experiencias puedo ofrecer en Planiar?",
    answer: "Puedes ofrecer una amplia variedad de experiencias: desde tours y actividades al aire libre, talleres y clases, hasta eventos gastronómicos, culturales o de bienestar. Lo importante es que sean experiencias memorables que ofrezcan valor a los usuarios."
  },
  {
    question: "¿Puedo gestionar mi disponibilidad y reservas desde mi teléfono?",
    answer: "¡Absolutamente! Planiar cuenta con una aplicación móvil optimizada donde puedes gestionar tu calendario, confirmar reservas, comunicarte con clientes y revisar tus estadísticas de ventas, todo desde tu smartphone."
  },
  {
    question: "¿Qué sucede si necesito cancelar una reserva?",
    answer: "Entendemos que pueden surgir imprevistos. La plataforma te permite establecer tus propias políticas de cancelación. En caso de necesitar cancelar, puedes hacerlo fácilmente desde tu panel de control, y el sistema notificará automáticamente a los clientes afectados."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    
    if (faqRef.current) {
      observer.observe(faqRef.current);
    }
    
    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  return (
    <section id="faq" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas saber para empezar a ofrecer tus experiencias en Planiar.
          </p>
        </div>
        
        <div 
          ref={faqRef}
          className={cn(
            "max-w-3xl mx-auto",
            "transform transition-all duration-700 opacity-0 translate-y-10",
            isVisible && "opacity-100 translate-y-0"
          )}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={cn(
                  "border-b border-gray-100 last:border-none",
                  "transition-all duration-200",
                  openIndex === index ? "bg-gray-50" : "hover:bg-gray-50"
                )}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <span className={cn(
                    "flex-shrink-0 ml-2 text-planiar-500 transition-transform duration-200",
                    openIndex === index ? "transform rotate-180" : ""
                  )}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                
                <div 
                  className={cn(
                    "transition-all duration-300 overflow-hidden",
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="p-6 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className={cn(
            "mt-12 text-center",
            "transform transition-all duration-700 opacity-0 translate-y-10",
            isVisible && "opacity-100 translate-y-0"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-gray-600 mb-4">
            ¿No encontrás la respuesta que buscás?
          </p>
          <a 
            href="#contacto" 
            className="inline-flex items-center text-planiar-600 hover:text-planiar-700 font-medium"
          >
            Contactanos
            <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
