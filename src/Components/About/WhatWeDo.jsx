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
            title: "Intellectual Property",
            description:
                "We help businesses and creators protect and manage their intellectual property, including trademarks, copyrights, patents, portfolio management, enforcement, and dispute resolution.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a3 3 0 110 6 3 3 0 010-6zm0 10c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
                    />
                </svg>
            ),
            color: "bg-blue-100",
            textColor: "text-blue-600",
        },
        {
            title: "Media & Entertainment",
            description:
                "We provide end-to-end legal support for film, music, and entertainment, including agreements, licensing, distribution, talent management, and compliance services.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 17l7.5-5-7.5-5v10zM19.5 21h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5z"
                    />
                </svg>
            ),
            color: "bg-amber-100",
            textColor: "text-amber-600",
        },
        {
            title: "Technology Law",
            description:
                "Our technology law team assists with data privacy, IT & e-commerce compliance, and drafting SaaS, software, and technology agreements tailored to your business needs.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0L16.95 7.05M7.05 16.95l-1.414 1.414"
                    />
                </svg>
            ),
            color: "bg-emerald-100",
            textColor: "text-emerald-600",
        },
        {
            title: "Business Audit & Corporate Advisory",
            description:
                "We guide startups and enterprises through legal structuring, compliance, mergers, acquisitions, contracts, and tax advisory to ensure smooth corporate operations.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"   
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6h16M4 10h16M4 14h10M4 18h10"
                    />
                </svg>
            ),
            color: "bg-purple-100",
            textColor: "text-purple-600",
        },
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