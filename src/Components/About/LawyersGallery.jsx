import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const LawyersGallery = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        if (inView) {
            const tl = gsap.timeline();
            
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(".lawyer-card",
                { y: 60, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.1,
                    ease: "power2.out" 
                },
                "-=0.4"
            );
        }
    }, [inView]);

    const lawyers = [
        {
            id: 1,
            name: "Sarah Johnson",
            designation: "Senior Family Law Attorney",
            email: "sarah@ipgyan.com",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
            specialties: ["Divorce", "Child Custody", "Mediation"],
            bio: "With over 15 years of experience, Sarah specializes in complex family law cases and has a reputation for compassionate yet effective representation."
        },
        {
            id: 2,
            name: "Michael Chen",
            designation: "Estate Litigation Partner",
            email: "michael@ipgyan.com",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
            specialties: ["Will Disputes", "Trust Litigation", "Estate Planning"],
            bio: "Michael has successfully represented clients in numerous high-profile estate disputes, recovering millions in assets for rightful beneficiaries."
        },
        {
            id: 3,
            name: "Elena Rodriguez",
            designation: "Immigration Law Specialist",
            email: "elena@ipgyan.com",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
            specialties: ["Work Visas", "Family Sponsorship", "Citizenship"],
            bio: "Elena is fluent in three languages and has helped hundreds of families navigate the complex immigration system to build new lives."
        },
        {
            id: 4,
            name: "David Williams",
            designation: "Strata Law Expert",
            email: "david@ipgyan.com",
            image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
            specialties: ["Strata Disputes", "Property Law", "Corporate Governance"],
            bio: "David's expertise in strata law has made him a sought-after advisor for both property owners and corporations across the region."
        },
        {
            id: 5,
            name: "Priya Sharma",
            designation: "Family Law Associate",
            email: "priya@ipgyan.com",
            image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
            specialties: ["Parenting Plans", "Spousal Support", "Separation Agreements"],
            bio: "Priya brings a fresh perspective to family law with a focus on collaborative approaches and out-of-court settlements."
        },
        {
            id: 6,
            name: "James Wilson",
            designation: "Litigation Partner",
            email: "james@ipgyan.com",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
            specialties: ["Civil Litigation", "Appeals", "Legal Strategy"],
            bio: "With a background in appellate law, James has successfully argued cases at multiple levels of court, establishing important legal precedents."
        }
    ];

    return (
        <section 
            ref={sectionRef}
            id='team'
            className="py-16 md:py-24  px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
            
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
                        Meet Our Legal Team
                    </h2>
                    {/* <div className="w-24 h-1 bg-amber-500 mx-auto my-4"></div> */}
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mt-6 font-inria">
                        Our award-winning attorneys bring decades of combined experience and a commitment to excellence in every case.
                    </p>
                </div>

                {/* Lawyers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {lawyers.map((lawyer) => (
                        <div 
                            key={lawyer.id}
                            className={`lawyer-card relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform hover:-translate-y-2 }`}
                            onMouseEnter={() => setActiveCard(lawyer.id)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            {/* Image Container */}
                            <div className="relative h-[400px] overflow-hidden">
                                <div className="absolute inset-0  z-10"></div>
                                <img 
                                    src={lawyer.image} 
                                    alt={lawyer.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                                
                                {/* Specialties Badges */}
                                <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2">
                                    {lawyer.specialties.map((specialty, index) => (
                                        <span 
                                            key={index}
                                            className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 font-inria">
                                    {lawyer.name}
                                </h3>
                                <p className="text-amber-600 font-medium text-sm mb-3">
                                    {lawyer.designation}
                                </p>
                                
                                {/* Email */}
                                <div className="flex items-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a 
                                        href={`mailto:${lawyer.email}`}
                                        className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
                                    >
                                        {lawyer.email}
                                    </a>
                                </div>
                                
                                {/* Bio (shown on hover) */}
                                <div className={`overflow-hidden transition-all duration-500  max-h-40 opacity-100`}>
                                    <p className="text-gray-600 text-sm">
                                        {lawyer.bio}
                                    </p>
                                    
                                    {/* CTA Button */}
                                    <button className="mt-4 px-4 py-2 cursor-pointer bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors w-full">
                                        Schedule Consultation
                                    </button>
                                </div>
                            </div>
                            
                            {/* Corner Decoration */}
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500 transform rotate-45 translate-x-8 -translate-y-8"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                {/* <div className="text-center mt-12 md:mt-16">
                    <p className="text-gray-700 mb-6">
                        Ready to work with our exceptional legal team?
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg transform hover:-translate-y-1">
                        Contact Us Today
                    </button>
                </div> */}
            </div>
        </section>
    );
};

export default LawyersGallery;