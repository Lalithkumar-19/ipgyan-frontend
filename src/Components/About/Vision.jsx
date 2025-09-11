import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const Vision = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const visionPointsRef = useRef([]);
    
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    // Add vision points to ref array
    const addToVisionPointsRef = (el) => {
        if (el && !visionPointsRef.current.includes(el)) {
            visionPointsRef.current.push(el);
        }
    };

    useEffect(() => {
        if (inView) {
            const tl = gsap.timeline();
            
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(visionPointsRef.current,
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

    const visionPoints = [
        {
            title: "Balanced Approach",
            description: "Helping identify a balance between business opportunities and avoidance pitfalls.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            color: "bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            title: "Client-Focused Service",
            description: "Cater to the needs of each client with best suited advice and services.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: "bg-amber-100",
            textColor: "text-amber-600"
        },
        {
            title: "Close Collaboration",
            description: "Proximity with our clients to better articulate their expectations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            color: "bg-emerald-100",
            textColor: "text-emerald-600"
        }
    ];

    return (
        <section 
            ref={sectionRef}
            id='vision'
            className="py-16 md:py-24 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full translate-x-1/3 translate-y-1/3"></div>
            
            <div 
                ref={ref}
                className="max-w-7xl mx-auto relative z-10"
            >
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 
                        ref={titleRef}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500 font-inria"
                    >
                        Our Vision
                    </h2>
                    {/* <div className="w-24 h-1 bg-amber-500 mx-auto my-4"></div> */}
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mt-6 font-inria">
                        At IPGYAN, we believe in building lasting relationships with our clients through exceptional service and strategic guidance.
                    </p>
                </div>

                {/* Vision Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {visionPoints.map((point, index) => (
                        <div 
                            key={index}
                            ref={addToVisionPointsRef}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center text-center"
                        >
                            {/* Icon Container */}
                            <div className={`p-4 rounded-2xl ${point.color} mb-6`}>
                                <div className={point.textColor}>
                                    {point.icon}
                                </div>
                            </div>
                            
                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-4 font-inria">
                                {point.title}
                            </h3>
                            <p className="text-gray-600">
                                {point.description}
                            </p>
                            
                            {/* Decorative element */}
                            <div className="w-16 h-1 bg-amber-400 mt-6"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                {/* <div className="text-center mt-16">
                    <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                        Our vision guides everything we do, ensuring we deliver the highest quality legal services tailored to your unique needs.
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
                        Learn More About Us
                    </button>
                </div> */}
            </div>
        </section>
    );
};

export default Vision;