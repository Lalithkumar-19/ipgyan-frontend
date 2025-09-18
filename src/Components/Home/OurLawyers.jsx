import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';

const OurTeam = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const carouselRef = useRef(null);
    const teamRef = useRef([]);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const sectionRef = useRef(null);
    const hasAnimated = useRef(false);

    const team = [
        {
            id: 1,
            name: "Debarghya Mitra",
            designation: "Designated Partner",
            description:
                "Strategy-first legal & business advisor with cross-domain experience in media, music-tech business, brand partnerships, and operations. Bridges legal, creative, and commercial teams to move projects from talk to traction.",
            image: "https://media.licdn.com/dms/image/v2/D5603AQHBkNBiqHKD4w/profile-displayphoto-shrink_400_400/B56ZVALocgGQAc-/0/1740538547574?e=1761177600&v=beta&t=zmjUV8C6HBPpzCm27KkNEC8D_IALQgc_GM9GYpvX_sY"
        },
        {
            id: 2,
            name: "Shail Bala Tripathy",
            designation: "Designated & Managing Partner",
            description:
                "IP, Media & Tech counsel with 6+ years’ experience across commercial contracts, IP monetisation, and creator/startup advisory. TEDx speaker on climate action & innovation; known for crisp drafting and negotiation that protects value and accelerates deals.",
            image: "https://www.shailbalatripathy.in/shail2.jpeg"
        },
        {
            id: 3,
            name: "Senior Legal Associate",
            designation: "Contracts & IP Execution",
            description:
                "Supports contracts, IP execution, filings, drafting, diligence and closing checklists. Coordinates with clients to ensure timelines are met efficiently.",
            image: "https://d1imjpjik7kc4g.cloudfront.net/images/5-Law-Firm-Titles-You-Should-Know-About-new.jpg"
        },
        {
            id: 4,
            name: "Advisory Network",
            designation: "Specialist Collaborators",
            description:
                "A network of specialists we collaborate with for domain-specific mandates—tax, data security, valuation, and international filings.",
            image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    const slidesToShow = isMobile ? 1 : isTablet ? 2 : 3;
    const totalSlides = Math.ceil(team.length / slidesToShow);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto scroll functionality
    useEffect(() => {
        let interval;
        if (autoPlay) {
            interval = setInterval(() => {
                nextSlide();
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [autoPlay, currentSlide]);

    // Scroll animation with GSAP
    useEffect(() => {
        const checkScroll = () => {
            if (hasAnimated.current) return;

            const section = sectionRef.current;
            if (!section) return;

            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                hasAnimated.current = true;

                const tl = gsap.timeline();

                tl.fromTo(titleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
                )
                    .fromTo(descRef.current,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                        "-=0.4"
                    )
                    .fromTo(teamRef.current,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: "power2.out"
                        },
                        "-=0.3"
                    );

                window.removeEventListener('scroll', checkScroll);
            }
        };

        checkScroll();
        window.addEventListener('scroll', checkScroll);

        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setAutoPlay(false);
        setTimeout(() => setAutoPlay(true), 8000);
    };

    const handleMouseEnter = () => {
        setAutoPlay(false);
    };

    const handleMouseLeave = () => {
        setAutoPlay(true);
    };

    return (
        <div
            ref={sectionRef}
            className="w-full md:w-[90%] lg:w-[80%] mx-auto py-10 md:py-12 lg:py-16 bg-white"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-10 lg:mb-12">
                    <h1
                        ref={titleRef}
                        className="text-amber-500 text-2xl sm:text-3xl md:text-4xl font-bold font-inria mb-3 md:mb-4 opacity-0"
                    >
                        Our Team
                    </h1>
                    <p
                        ref={descRef}
                        className="text-black text-sm sm:text-base md:text-lg font-normal font-inria max-w-2xl mx-auto px-2 md:px-4 lg:px-8 opacity-0"
                    >
                        Meet our team of dedicated legal and business professionals, bridging law, strategy, and innovation to deliver tailored solutions for clients.
                    </p>
                </div>

                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="overflow-hidden" ref={carouselRef}>
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
                        >
                            {team.map((member, index) => (
                                <div
                                    key={member.id}
                                    ref={el => teamRef.current[index] = el}
                                    className="w-full md:w-1/2 lg:w-1/3 px-2 sm:px-3 md:px-4 h-[560px] flex-shrink-0 opacity-0"
                                >
                                    <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-6 md:mb-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        <div className="h-[280px] sm:h-[300px] md:h-[330px] overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-4 md:p-5 lg:p-6 text-center md:h-[280px] h-[170px]">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                                            <p className="text-amber-500 text-xs sm:text-sm mb-2">{member.designation}</p>
                                            <p className="text-gray-600 text-xs sm:text-sm">{member.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 md:mt-8 space-x-3 md:space-x-4">
                        <button
                            onClick={prevSlide}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-amber-500 text-amber-500 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            aria-label="Previous slide"
                        >
                            <FaArrowLeft className="text-sm md:text-base" />
                        </button>
                        <div className="flex items-center space-x-1 md:space-x-2">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-amber-500 scale-125' : 'bg-gray-300'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={nextSlide}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-amber-500 text-amber-500 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            aria-label="Next slide"
                        >
                            <FaArrowRight className="text-sm md:text-base" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurTeam;
