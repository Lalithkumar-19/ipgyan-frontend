import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50
      });

      // Create timeline
      const tl = gsap.timeline({ delay: 0.3 });
      
      // Animate elements in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative md:px-20 px-3 min-h-screen bg-slate-900 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://knightlawfirmllc.com/wp-content/uploads/2025/01/How-Are-an-Attorney-and-a-Lawyer-Different-e1744301353798.png')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div> */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent"></div>  */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-2xl text-white space-y-6 md:space-y-8 py-20">
          <div>
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              YOUR FIGHT
              <br />
              <span className="text-amber-400">IS OUR FIGHT</span>
            </h1>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-lg"
          >
            New Orleans Criminal Defense Attorneys & Personal Injury Lawyers
          </p>
          
          <div ref={buttonRef} className="pt-4 cursor-pointer flex flex-row gap-2">
            <button className="group relative cursor-pointer bg-amber-400 hover:bg-amber-500 text-white px-6 py-3 md:px-8 md:py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10">See Our Services</span>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
            </button>
            <button className="group relative cursor-pointer bg-amber-400 hover:bg-amber-500 text-white px-6 py-3 md:px-8 md:py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10">Contact US</span>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
            </button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 md:pt-12">
            {[
              { value: "25+", label: "Years Experience" },
              { value: "500+", label: "Cases Won" },
              { value: "95%", label: "Success Rate" },
              { value: "24/7", label: "Availability" }
            ].map((item, index) => (
              <div key={index} className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-orange-400">{item.value}</div>
                <div className="text-xs md:text-sm text-gray-300 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;