import React, { useEffect, useRef } from 'react';

const ClientShowcase = () => {
  const logos = [
    {
      id: "logo-1",
      name: "company 1",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    },
    {
      id: "logo-2",
      name: "company 2",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    },
    {
      id: "logo-3",
      name: "company 3",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    },
    {
      id: "logo-4",
      name: "company 4",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    },
    {
      id: "logo-5",
      name: "company 5",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    },
    {
      id: "logo-6",
      name: "company 6",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    // Simple animation for the logos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const logoElements = document.querySelectorAll('.client-logo');
    logoElements.forEach((el) => observer.observe(el));

    return () => {
      logoElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-16 px-3 md:px-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-black text-xl md:text-2xl lg:text-3xl  font-normal font-inria leading-tight md:leading-[40px] lg:leading-[50px] xl:leading-[60px] max-w-2xl text-center mx-auto">
            We've had the privilege of working with some of the most innovative companies in the industry
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
          
          {/* Animated scrolling container */}
          <div 
            ref={containerRef}
            className="flex animate-scroll"
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {/* Double the logos for seamless looping */}
            {[...logos, ...logos].map((logo, index) => (
              <div 
                key={`${logo.id}-${index}`} 
                className="client-logo flex-shrink-0 mx-8 w-40 h-40 opacity-0 transition-opacity duration-700"
              >
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                      <img 
                        src={logo.image} 
                        alt={logo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-slate-800">{logo.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-fade-in-up {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </div>
    </section>
  );
};

export default ClientShowcase;