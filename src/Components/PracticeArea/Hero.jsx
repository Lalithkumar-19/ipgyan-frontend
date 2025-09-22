import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, contentRef.current], {
        opacity: 0,
        y: 30
      });

      // Create timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          toggleActions: "play none none none"
        }
      });
      
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
      }, "-=0.5")
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
      }, "-=0.3");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative md:px-20 -mt-10 px-3 min-h-screen overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://www.shimodalaw.com/wp-content/uploads/employment-lawyer.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-4xl text-white space-y-8 md:space-y-10 py-20">
          <div>
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-5xl  font-bold leading-tight"
            >
              LEGAL EXPERTISE
              <br />
              <span className="text-amber-400">ACROSS DIVERSE AREAS</span>
            </h1>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-2xl"
          >
            Comprehensive legal services tailored to your specific needs and circumstances
          </p>
          <div className='flex flex-row w-full'>
            <button 
            onClick={()=>{
              document.getElementById("services").scrollIntoView({ behavior: "smooth" });
            }}
            className='bg-amber-400 text-white w-[300px] h-[70px] font-bold text-base lg:text-lg cursor-pointer px-3 py-1.5 lg:px-4 lg:py-2 rounded transition-all hover:bg-[#e5a00d] active:scale-95'>
              See Our Practice Areas
            </button>

          </div>
          
          {/* Practice Areas Grid */}
          {/* <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {[
              { name: "Criminal Defense", icon: "⚖️" },
              { name: "Personal Injury", icon: "🤕" },
              { name: "Family Law", icon: "👨‍👩‍👧‍👦" },
              { name: "Business Law", icon: "🏢" },
              { name: "Real Estate", icon: "🏠" },
              { name: "DUI/DWI", icon: "🚗" }
            ].map((area, index) => (
              <div 
                key={index} 
                className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">{area.name}</div>
                  <div className="text-sm text-gray-300 mt-1">Learn more →</div>
                </div>
              </div>
            ))}
          </div> */}
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