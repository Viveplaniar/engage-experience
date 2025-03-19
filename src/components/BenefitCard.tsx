
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon, index }) => {
  const [flipped, setFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, index * 100); // Staggered animation based on index
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "perspective relative h-64 md:h-80 opacity-0 translate-y-10 transition-all duration-700",
        isVisible && "opacity-100 translate-y-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onTouchStart={() => setFlipped(!flipped)}
    >
      <div 
        className={cn(
          "flip-card-inner relative w-full h-full transition-transform duration-500 preserve-3d shadow-xl",
          flipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front side */}
        <div className="flip-card-front absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-white border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-planiar-50 p-3 text-planiar-600">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <span className="text-planiar-500 text-sm font-medium flex items-center">
              Toca para ver más
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
        
        {/* Back side */}
        <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-planiar-600 p-6 flex flex-col items-center justify-center text-white">
          <p className="text-lg">{description}</p>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <span className="text-white text-sm font-medium flex items-center">
              Volver
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
