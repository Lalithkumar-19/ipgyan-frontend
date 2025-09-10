import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const WhatWeDo = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const cardsRef = useRef([]);
    
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    // Add cards to ref array
    const addToCardsRef = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
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
            .fromTo(cardsRef.current,
                { y: 60, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.15,
                    ease: "power2.out" 
                },
                "-=0.3"
            );
        }
    }, [inView]);

    const practiceAreas = [
        {
            title: "Family Law",
            description: "Our family and divorce lawyers focus on all issues relating to family law including divorce, common law spouses, support, asset division, debt division and child custody or parenting time.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: "bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            title: "Estate Litigation",
            description: "Our estate litigators assist with estate litigation and have numerous court successes in addition to settlements dealing with unfair wills, will disputes, trust disputes etc.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            color: "bg-amber-100",
            textColor: "text-amber-600"
        },
        {
            title: "Immigration Law",
            description: "Our immigration lawyers have extensive experience with all aspects of immigration law and our strata lawyers deal with both strata owners and corporations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "bg-emerald-100",
            textColor: "text-emerald-600"
        },
        {
            title: "Strata Law",
            description: "Our strata lawyers deal with both strata owners and corporations, providing expert guidance on all matters related to strata properties and governance.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            color: "bg-purple-100",
            textColor: "text-purple-600"
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        >
            <div 
                ref={ref}
                className="max-w-7xl mx-auto"
            >
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 
                        ref={titleRef}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500 font-inria"
                    >
                        What We Do
                    </h2>
                    {/* <div className="w-24 h-1 bg-amber-500 mx-auto my-4"></div> */}
                    <p 
                        ref={descRef}
                        className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mt-6 font-inria"
                    >
                        At <span className="font-semibold text-amber-600">IPGYAN</span>, our lawyers primarily focus on Family Law, Estate Litigation, Immigration Law and Strata Law.
                    </p>
                </div>

                {/* Practice Areas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {practiceAreas.map((area, index) => (
                        <div 
                            key={index}
                            ref={addToCardsRef}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                        >
                            {/* Icon Container */}
                            <div className={`p-6 flex items-center justify-center ${area.color}`}>
                                <div className={area.textColor}>
                                    {area.icon}
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 font-inria">
                                    {area.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {area.description}
                                </p>
                            </div>
                            
                            {/* Learn More Link */}
                            {/* <div className="px-6 pb-6 mt-auto">
                                <button className="text-amber-600 font-medium hover:text-amber-700 flex items-center group">
                                    Learn more
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div> */}
                        </div>
                    ))}
                </div>

               
            </div>
        </section>
    );
};

export default WhatWeDo;