import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const WhyIPgyan = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const pointsRef = useRef([]);
    
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    // Add points to ref array
    const addToPointsRef = (el) => {
        if (el && !pointsRef.current.includes(el)) {
            pointsRef.current.push(el);
        }
    };

    useEffect(() => {
        if (inView) {
            const tl = gsap.timeline();
            
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(pointsRef.current,
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.7, 
                    stagger: 0.2,
                    ease: "power2.out" 
                },
                "-=0.4"
            );
        }
    }, [inView]);

    const points = [
        {
            description: "We speak your language; we understand your unique goals and challenges. Our advice is always tailored to empower your creative and entrepreneurial vision.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: "bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            description: "We combine speed with clarity and rigor. No unnecessary delays. We believe in speed with precision.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "bg-amber-100",
            textColor: "text-amber-600"
        },
        {
            description: "You don't need to juggle multiple firms; we provide comprehensive, interconnected legal support that grows with your business.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            color: "bg-emerald-100",
            textColor: "text-emerald-600"
        },
        {
            description: "Legal yet entrepreneurial!",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h7m0 0v7m0-7l-7 7-4-4-6 6" />
                </svg>
            ),
            color: "bg-purple-100",
            textColor: "text-purple-600"
        }
    ];

    return (
        <section 
            ref={sectionRef}
            id='why-ipgyan'
            className="py-16 md:py-24  relative overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>
            
            <div 
                ref={ref}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 
                        ref={titleRef}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500 font-inria"
                    >
                        Why IPgyan
                    </h2>
                    <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
                </div>

                {/* Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {points.map((point, index) => (
                        <div 
                            key={index}
                            ref={addToPointsRef}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-start"
                        >
                            <div className={`p-3 rounded-full ${point.color} ${point.textColor} mb-4`}>
                                {point.icon}
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyIPgyan;
