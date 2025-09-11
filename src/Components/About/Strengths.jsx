import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const Strengths = () => {

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const strengthsRef = useRef([]);
    const navigate=useNavigate();
    
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    // Add strengths to ref array
    const addToStrengthsRef = (el) => {
        if (el && !strengthsRef.current.includes(el)) {
            strengthsRef.current.push(el);
        }
    };

    useEffect(() => {
        if (inView) {
            const tl = gsap.timeline();
            
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(descRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                "-=0.4"
            )
            .fromTo(strengthsRef.current,
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.7, 
                    stagger: 0.15,
                    ease: "power2.out" 
                },
                "-=0.3"
            );
        }
    }, [inView]);

    const strengths = [
        {
            title: "Business Enablers",
            description: "We go beyond traditional legal services to become strategic partners who enable business growth and success.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Bespoke Solutions",
            description: "Leveraging our core strengths and extensive experience to provide tailored legal solutions for each client's unique needs.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            color: "from-amber-500 to-amber-600"
        },
        {
            title: "Quality & Promptness",
            description: "Recognized for our exceptional delivery quality and timely responses that have earned us industry awards and client trust.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "from-emerald-500 to-emerald-600"
        },
        {
            title: "Global Reach",
            description: "Strong international relationships allow us to serve cross-border legal needs across multiple jurisdictions worldwide.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "from-purple-500 to-purple-600"
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Decorative elements */}
           
            
            <div 
                ref={ref}
                className="max-w-7xl mx-auto relative z-10"
            >
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 
                        ref={titleRef}
                        className="text-3xl md:text-4xl lg:text-4xl font-bold text-amber-500 font-inria"
                    >
                        Strengths & Values
                    </h2>
                    {/* <div className="w-24 h-1 bg-amber-500 mx-auto my-4"></div> */}
                    <p 
                        ref={descRef}
                        className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mt-6 font-inria"
                    >
                        At IPGYAN, we believe in being business enablers while providing innovative legal solutions. 
                        Our commitment to excellence has positioned us among the most trusted law firms, recognized 
                        for our quality delivery and client-focused approach.
                    </p>
                </div>

                {/* Strengths Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {strengths.map((strength, index) => (
                        <div 
                            key={index}
                            ref={addToStrengthsRef}
                            className="bg-gray-50 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-500 group"
                        >
                            <div className="flex items-start space-x-6">
                                {/* Icon with gradient background */}
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${strength.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="text-white">
                                        {strength.icon}
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-inria group-hover:text-blue-700 transition-colors">
                                        {strength.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {strength.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Awards Recognition */}
                <div 
                    ref={addToStrengthsRef}
                    className="mt-16 p-8 md:p-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 text-center"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-inria">
                        Award-Winning Excellence
                    </h3>
                    <p className="text-gray-700 max-w-3xl mx-auto">
                        Our firm's prompt and quality delivery has been recognized by clients and industry peers, 
                        earning us several prestigious awards and placing us among the top trusted law firms in India.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {["Legal Excellence Award", "Client Choice Award", "Innovation in Law", "Best Boutique Firm"].map((award, index) => (
                            <span key={index} className="px-4 py-2 bg-white text-amber-500 text-sm font-medium rounded-full shadow-sm">
                                {award}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-lg text-gray-700 mb-6">
                        Experience the IPGYAN difference – where legal expertise meets business acumen.
                    </p>
                    <button 
                    onClick={()=>{
                        navigate('/contact')
                    }}
                    className="px-8 py-3 cursor-pointer bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors shadow-md">
                        Connect With Us
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Strengths;