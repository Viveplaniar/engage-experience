
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "María Rodríguez",
    role: "Dueña de Aventuras Outdoor",
    content: "Desde que me uní a Planiar, mis reservas aumentaron un 70%. La plataforma es increíblemente fácil de usar y el equipo de soporte siempre está disponible cuando lo necesito.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Carlos Méndez",
    role: "Propietario de Viñedo La Aurora",
    content: "Planiar nos permitió digitalizar nuestras degustaciones de vino y llegar a un público más joven. En 3 meses recuperamos la inversión y ahora tenemos reservas completas cada fin de semana.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Laura Fernández",
    role: "Fundadora de Talleres Creativos",
    content: "La sencillez para gestionar reservas y la visibilidad que nos da Planiar es incomparable. Nuestros talleres ahora tienen listas de espera gracias a la exposición en la plataforma.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    name: "Javier Morales",
    role: "Chef de Experiencias Gastronómicas",
    content: "Lo que más valoro es que solo pago cuando vendo. Esto nos permitió probar diferentes formatos de experiencias culinarias sin riesgo financiero hasta encontrar las más exitosas.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isAutoplay) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoplay, currentSlide]);

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
    
    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }
    
    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <section id="testimonios" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros proveedores
          </h2>
          <p className="text-xl text-gray-600">
            Conocé las experiencias de quienes ya forman parte de la comunidad Planiar.
          </p>
        </div>
        
        <div 
          ref={sliderRef}
          className={cn(
            "max-w-4xl mx-auto relative pb-12",
            "transform transition-all duration-1000 opacity-0 translate-y-10",
            isVisible && "opacity-100 translate-y-0"
          )}
        >
          <div className="overflow-hidden relative rounded-2xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 bg-gradient-to-br from-planiar-50 to-white p-6 md:p-10"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      <svg className="h-8 w-8 text-planiar-300 mb-4" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path>
                      </svg>
                      
                      <p className="text-lg md:text-xl text-gray-700 mb-6">
                        {testimonial.content}
                      </p>
                      
                      <div className="mt-auto">
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-planiar-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevSlide} 
              className="absolute top-1/2 left-3 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              onClick={nextSlide} 
              className="absolute top-1/2 right-3 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  index === currentSlide 
                    ? "bg-planiar-600 w-8" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
