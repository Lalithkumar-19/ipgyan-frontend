import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const testimonialRef = useRef(null);
    const contentRef = useRef(null);
    const sliderRef = useRef(null);
    const sectionRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "CEO, TechCorp",
            image: "/hero-pic.png",
            quote: "The legal team provided exceptional service during our company's expansion. Their expertise in corporate law was invaluable in navigating complex regulations."
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Founder, StartUpX",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            quote: "Their attention to detail and strategic advice helped us secure crucial investments. Highly recommended for any startup's legal needs."
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Director, Global Solutions",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            quote: "Professional, responsive, and thorough. They've been our trusted legal partner for over 5 years."
        },
        {
            id: 4,
            name: "David Wilson",
            role: "CFO, Enterprise Inc",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            quote: "The team handled our complex merger with precision and expertise. Their guidance was instrumental in the successful completion of the deal."
        }
    ];

    // GSAP animations - Fixed to ensure content is visible
    useEffect(() => {
        // Set initial styles to prevent FOUC (Flash of Unstyled Content)
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        gsap.set(sliderRef.current, { opacity: 1, x: 0 });

        // Create scroll-triggered animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
                markers: false // Set to true for debugging animation triggers
            }
        });

        tl.from(contentRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(sliderRef.current, {
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.5");

        // Clean up function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    return (
        <div
            ref={sectionRef}
            className="w-full py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6 md:px-8 min-h-screen flex items-center"
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
                    {/* Left Content */}
                    <div
                        ref={contentRef}
                        className="w-full lg:w-2/5 space-y-4 md:space-y-6"
                    >
                        <h1 className="text-amber-500 text-center md:text-start text-xl sm:text-2xl md:text-3xl font-bold font-inria">
                            Client Testimonials
                        </h1>
                        <p className="text-2xl text-center md:text-start sm:text-3xl md:text-4xl font-normal font-inria leading-tight">
                            Hear from our <br className="hidden sm:block" />
                            clients about their <br className="hidden sm:block" />
                            experiences.
                        </p>

                        {/* Additional content for better layout */}
                        <div className="hidden md:block mt-6 md:mt-8">
                            <svg 
                                className="w-full max-w-xs md:max-w-sm lg:max-w-md" 
                                viewBox="0 0 382 103" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <path d="M1 6.61111C13.6667 -0.87037 26.3333 -0.87037 39 6.61111C51.6667 14.0926 64.3333 14.0926 77 6.61111C89.6667 -0.87037 102.333 -0.87037 115 6.61111C127.667 14.0926 140.333 14.0926 153 6.61111C165.667 -0.87037 178.333 -0.87037 191 6.61111C203.667 14.0926 216.333 14.0926 229 6.61111C241.667 -0.87037 254.333 -0.87037 267 6.61111C279.667 14.0926 292.333 14.0926 305 6.61111C317.667 -0.87037 330.333 -0.87037 343 6.61111C355.667 14.0926 368.333 14.0926 381 6.61111" stroke="#3A3A3A" strokeOpacity="0.1" />
                                <path d="M1 24.5667C13.6667 17.0852 26.3333 17.0852 39 24.5667C51.6667 32.0482 64.3333 32.0482 77 24.5667C89.6667 17.0852 102.333 17.0852 115 24.5667C127.667 32.0482 140.333 32.0482 153 24.5667C165.667 17.0852 178.333 17.0852 191 24.5667C203.667 32.0482 216.333 32.0482 229 24.5667C241.667 17.0852 254.333 17.0852 267 24.5667C279.667 32.0482 292.333 32.0482 305 24.5667C317.667 17.0852 330.333 17.0852 343 24.5667C355.667 32.0482 368.333 32.0482 381 24.5667" stroke="#3A3A3A" strokeOpacity="0.1" />
                                <path d="M1 42.5222C13.6667 35.0408 26.3333 35.0408 39 42.5222C51.6667 50.0037 64.3333 50.0037 77 42.5222C89.6667 35.0408 102.333 35.0408 115 42.5222C127.667 50.0037 140.333 50.0037 153 42.5222C165.667 35.0408 178.333 35.0408 191 42.5222C203.667 50.0037 216.333 50.0037 229 42.5222C241.667 35.0408 254.333 35.0408 267 42.5222C279.667 50.0037 292.333 50.0037 305 42.5222C317.667 35.0408 330.333 35.0408 343 42.5222C355.667 50.0037 368.333 50.0037 381 42.5222" stroke="#3A3A3A" strokeOpacity="0.1" />
                                <path d="M1 60.4778C13.6667 52.9963 26.3333 52.9963 39 60.4778C51.6667 67.9593 64.3333 67.9593 77 60.4778C89.6667 52.9963 102.333 52.9963 115 60.4778C127.667 67.9593 140.333 67.9593 153 60.4778C165.667 52.9963 178.333 52.9963 191 60.4778C203.667 67.9593 216.333 67.9593 229 60.4778C241.667 52.9963 254.333 52.9963 267 60.4778C279.667 67.9593 292.333 67.9593 305 60.4778C317.667 52.9963 330.333 52.9963 343 60.4778C355.667 67.9593 368.333 67.9593 381 60.4778" stroke="#3A3A3A" strokeOpacity="0.1" />
                                <path d="M1 78.4334C13.6667 70.9519 26.3333 70.9519 39 78.4334C51.6667 85.9149 64.3333 85.9149 77 78.4334C89.6667 70.9519 102.333 70.9519 115 78.4334C127.667 85.9149 140.333 85.9149 153 78.4334C165.667 70.9519 178.333 70.9519 191 78.4334C203.667 85.9149 216.333 85.9149 229 78.4334C241.667 70.9519 254.333 70.9519 267 78.4334C279.667 85.9149 292.333 85.9149 305 78.4334C317.667 70.9519 330.333 70.9519 343 78.4334C355.667 85.9149 368.333 85.9149 381 78.4334" stroke="#3A3A3A" strokeOpacity="0.1" />
                                <path d="M1 96.3889C13.6667 88.9075 26.3333 88.9075 39 96.3889C51.6667 103.87 64.3333 103.87 77 96.3889C89.6667 88.9075 102.333 88.9075 115 96.3889C127.667 103.87 140.333 103.87 153 96.3889C165.667 88.9075 178.333 88.9075 191 96.3889C203.667 103.87 216.333 103.87 229 96.3889C241.667 88.9075 254.333 88.9075 267 96.3889C279.667 103.87 292.333 103.87 305 96.3889C317.667 88.9075 330.333 88.9075 343 96.3889C355.667 103.87 368.333 103.87 381 96.3889" stroke="#3A3A3A" strokeOpacity="0.1" />
                            </svg>
                        </div>
                    </div>

                    {/* Right Slider */}
                    <div
                        ref={sliderRef}
                        className="w-full lg:w-3/5 relative"
                    >
                        <div className="relative h-[700px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden">
                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                                aria-label="Previous testimonial"
                            >
                                <FaChevronLeft className="text-sm sm:text-base md:text-lg" />
                            </button>

                            {/* Testimonial Slides */}
                            <div className="h-full relative">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={testimonial.id}
                                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                                                ? 'opacity-100 translate-x-0'
                                                : 'opacity-0 translate-x-10 pointer-events-none'
                                            }`}
                                    >
                                        <div className="h-full flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
                                            {/* Image */}
                                            <div className="w-full lg:w-2/5 h-[500px] md:h-64 lg:h-full bg-gray-100 rounded-xl shadow-md">
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-full h-full"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80';
                                                    }}
                                                />
                                            </div>

                                            {/* Quote */}
                                            <div className="w-full lg:w-3/5 flex flex-col justify-center p-4 sm:p-6 md:p-8 bg-gray-50 rounded-xl shadow-md">
                                                <FaQuoteLeft className="text-amber-500 text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-6" />
                                                <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                                                    "{testimonial.quote}"
                                                </p>
                                                <div>
                                                    <h4 className="font-bold text-base sm:text-lg md:text-xl text-gray-900">{testimonial.name}</h4>
                                                    <p className="text-amber-500 text-xs sm:text-sm md:text-base">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                                aria-label="Next testimonial"
                            >
                                <FaChevronRight className="text-sm sm:text-base md:text-lg" />
                            </button>
                        </div>

                        {/* Navigation Dots */}
                        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? 'bg-amber-500 w-6 sm:w-8 scale-110'
                                            : 'bg-gray-300 hover:bg-amber-300'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;