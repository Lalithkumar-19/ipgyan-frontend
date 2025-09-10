import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { gsap } from 'gsap';

const OurLawyers = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const carouselRef = useRef(null);
    const lawyersRef = useRef([]);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const sectionRef = useRef(null);
    const hasAnimated = useRef(false);

    const lawyers = [
        {
            id: 1,
            name: "John Doe",
            designation: "Senior Partner",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 2,
            name: "Jane Smith",
            designation: "Corporate Law Expert",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 3,
            name: "Robert Johnson",
            designation: "Litigation Specialist",
            image: "https://t4.ftcdn.net/jpg/02/95/96/79/360_F_295967926_T2nUnmhQc00dwwp3KsvJSPHMP2xhekry.jpg"
        },
        {
            id: 4,
            name: "Emily Davis",
            designation: "Family Law Expert",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 5,
            name: "Michael Wilson",
            designation: "Intellectual Property Lawyer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 6,
            name: "Sarah Brown",
            designation: "Employment Law Specialist",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
        }
    ];

    const slidesToShow = isMobile ? 1 : isTablet ? 2 : 3;
    const totalSlides = Math.ceil(lawyers.length / slidesToShow);

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
                .fromTo(lawyersRef.current, 
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
                
                // Remove scroll listener after animation
                window.removeEventListener('scroll', checkScroll);
            }
        };
        
        // Check on initial render
        checkScroll();
        
        // Add scroll listener
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
        // Reset autoplay timer when user manually navigates
        setAutoPlay(false);
        setTimeout(() => setAutoPlay(true), 8000);
    };

    // Handle mouse events for pausing autoplay
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
                        Our Lawyers
                    </h1>
                    <div className='w-full flex flex-col md:flex-row justify-center items-center mb-4 md:mb-6'>
                        {/* Decorative SVG - Hidden on mobile for better spacing */}
                        <svg 
                            className="hidden md:block w-20 md:w-32 lg:w-40 xl:w-60" 
                            viewBox="0 0 284 87" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M282.796 8.77172C273.36 -1.55129 263.968 -1.51201 254.619 8.88956C245.271 19.2911 235.878 19.3304 226.443 9.0074C217.008 -1.3156 207.615 -1.27632 198.267 9.12525C188.918 19.5268 179.526 19.5661 170.09 9.24309C160.655 -1.07992 151.263 -1.04064 141.914 9.36093C132.565 19.7625 123.173 19.8018 113.738 9.47878C104.302 -0.844233 94.9102 -0.804952 85.5614 9.59662C76.2127 19.9982 66.8206 20.0375 57.3851 9.71446C47.9497 -0.608546 38.5576 -0.569265 29.2088 9.8323C19.86 20.2339 10.4679 20.2732 1.03246 9.95015" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M282.891 31.4628C273.455 21.1397 264.063 21.179 254.714 31.5806C245.365 41.9822 235.973 42.0215 226.538 31.6984C217.102 21.3754 207.71 21.4147 198.362 31.8163C189.013 42.2179 179.621 42.2571 170.185 31.9341C160.75 21.6111 151.358 21.6504 142.009 32.052C132.66 42.4535 123.268 42.4928 113.833 32.1698C104.397 21.8468 95.005 21.8861 85.6563 32.2877C76.3075 42.6892 66.9154 42.7285 57.48 32.4055C48.0445 22.0825 38.6524 22.1218 29.3036 32.5233C19.9549 42.9249 10.5628 42.9642 1.12731 32.6412" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M282.986 54.1539C273.55 43.8309 264.158 43.8702 254.809 54.2718C245.46 64.6733 236.068 64.7126 226.633 54.3896C217.197 44.0666 207.805 44.1059 198.457 54.5074C189.108 64.909 179.716 64.9483 170.28 54.6253C160.845 44.3023 151.453 44.3416 142.104 54.7431C132.755 65.1447 123.363 65.184 113.928 54.861C104.492 44.538 95.1 44.5773 85.7513 54.9788C76.4025 65.3804 67.0104 65.4197 57.5749 55.0967C48.1395 44.7737 38.7474 44.8129 29.3986 55.2145C20.0498 65.6161 10.6577 65.6554 1.22228 55.3324" stroke="#3A3A3A" strokeOpacity="0.1" />
                        </svg>
                        
                        <p 
                            ref={descRef}
                            className="text-black text-sm sm:text-base md:text-lg font-normal font-inria max-w-2xl mx-auto px-2 md:px-4 lg:px-8 opacity-0"
                        >
                            Meet our team of dedicated legal professionals, committed to providing expert advice and tailored solutions to meet your legal needs.
                        </p>

                        <svg 
                            className="hidden md:block w-20 md:w-32 lg:w-40 xl:w-60" 
                            viewBox="0 0 284 87" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M282.796 8.77172C273.36 -1.55129 263.968 -1.51201 254.619 8.88956C245.271 19.2911 235.878 19.3304 226.443 9.0074C217.008 -1.3156 207.615 -1.27632 198.267 9.12525C188.918 19.5268 179.526 19.5661 170.09 9.24309C160.655 -1.07992 151.263 -1.04064 141.914 9.36093C132.565 19.7625 123.173 19.8018 113.738 9.47878C104.302 -0.844233 94.9102 -0.804952 85.5614 9.59662C76.2127 19.9982 66.8206 20.0375 57.3851 9.71446C47.9497 -0.608546 38.5576 -0.569265 29.2088 9.8323C19.86 20.2339 10.4679 20.2732 1.03246 9.95015" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M282.891 31.4628C273.455 21.1397 264.063 21.179 254.714 31.5806C245.365 41.9822 235.973 42.0215 226.538 31.6984C217.102 21.3754 207.71 21.4147 198.362 31.8163C189.013 42.2179 179.621 42.2571 170.185 31.9341C160.75 21.6111 151.358 21.6504 142.009 32.052C132.66 42.4535 123.268 42.4928 113.833 32.1698C104.397 21.8468 95.005 21.8861 85.6563 32.2877C76.3075 42.6892 66.9154 42.7285 57.48 32.4055C48.0445 22.0825 38.6524 22.1218 29.3036 32.5233C19.9549 42.9249 10.5628 42.9642 1.12731 32.6412" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M282.986 54.1539C273.55 43.8309 264.158 43.8702 254.809 54.2718C245.46 64.6733 236.068 64.7126 226.633 54.3896C217.197 44.0666 207.805 44.1059 198.457 54.5074C189.108 64.909 179.716 64.9483 170.28 54.6253C160.845 44.3023 151.453 44.3416 142.104 54.7431C132.755 65.1447 123.363 65.184 113.928 54.861C104.492 44.538 95.1 44.5773 85.7513 54.9788C76.4025 65.3804 67.0104 65.4197 57.5749 55.0967C48.1395 44.7737 38.7474 44.8129 29.3986 55.2145C20.0498 65.6161 10.6577 65.6554 1.22228 55.3324" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M283.08 76.845C273.645 66.522 264.253 66.5612 254.904 76.9628C245.555 87.3644 236.163 87.4037 226.728 77.0806C217.292 66.7576 207.9 66.7969 198.551 77.1985C189.203 87.6001 179.811 87.6393 170.375 77.3163C160.940 66.9933 151.548 67.0326 142.199 77.4342C132.85 87.8357 123.458 87.875 114.022 77.552C104.587 67.229 95.1949 67.2683 85.8461 77.6699C76.4973 88.0714 67.1052 88.1107 57.6698 77.7877C48.2343 67.4647 38.8422 67.504 29.4935 77.9055C20.1447 88.3071 10.7526 88.3464 1.31713 78.0234" stroke="#3A3A3A" strokeOpacity="0.1" />
                        </svg>
                    </div>
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
                            {lawyers.map((lawyer, index) => (
                                <div
                                    key={lawyer.id}
                                    ref={el => lawyersRef.current[index] = el}
                                    className="w-full md:w-1/2 lg:w-1/3 px-2 sm:px-3 md:px-4 flex-shrink-0 opacity-0"
                                >
                                    <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-6 md:mb-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        <div className="h-[280px] sm:h-[300px] md:h-[330px] overflow-hidden">
                                            <img
                                                src={lawyer.image}
                                                alt={lawyer.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-4 md:p-5 lg:p-6 text-center">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{lawyer.name}</h3>
                                            <p className="text-amber-500 text-xs sm:text-sm">{lawyer.designation}</p>
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

export default OurLawyers;