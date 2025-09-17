import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const underlineRef = useRef(null);
    const descRef = useRef(null);
    const buttonRef = useRef(null);
    const imageRef = useRef(null);

    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            const tl = gsap.timeline();

            tl.fromTo(textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
                .fromTo(underlineRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 1, ease: "power2.out" },
                    "-=0.3"
                )
                .fromTo(descRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                    "-=0.5"
                )
                .fromTo(buttonRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                )
                .fromTo(imageRef.current,
                    { x: 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.5"
                );
        }
    }, [inView]);

    return (
        <div
            ref={heroRef}
            className="-mt-16 relative w-full md:-mt-2 px-4 sm:px-6 md:px-12 lg:px-20 text-white bg-gradient-to-br from-[#1a2e4d] to-[#0d1a2d] min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background decorative elements */}
            <svg className='absolute top-0 left-0 -translate-x-1/4 sm:-translate-x-1/5 md:translate-x-0 w-48 sm:w-64 md:w-80 lg:w-auto' width="764" height="982" viewBox="0 0 764 982" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.54556 995.022C-49.705 825.463 11.7719 737.299 189.976 730.528C368.181 723.756 429.657 635.592 374.407 466.033C319.156 296.475 380.633 208.31 558.838 201.539C737.042 194.768 798.519 106.603 743.268 -62.9548" stroke="#8da3c7" strokeOpacity="0.15" />
            </svg>

            <svg className='absolute bottom-0 right-0 translate-x-1/4 sm:translate-x-1/3 md:right-[100px] w-48 sm:w-64 md:w-80 lg:w-auto transform rotate-180' width="764" height="982" viewBox="0 0 764 982" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.54556 995.022C-49.705 825.463 11.7719 737.299 189.976 730.528C368.181 723.756 429.657 635.592 374.407 466.033C319.156 296.475 380.633 208.31 558.838 201.539C737.042 194.768 798.519 106.603 743.268 -62.9548" stroke="#8da3c7" strokeOpacity="0.15" />
            </svg>

            <div
                ref={ref}
                className="flex flex-col lg:flex-row w-full max-w-7xl items-center justify-between gap-6 md:gap-8 lg:gap-10 z-10"
            >
                {/* Text Content */}
                <div className="flex flex-col w-full lg:w-1/2 gap-4 md:gap-5 lg:gap-6 order-2 lg:order-1">
                    <h1
                        ref={textRef}
                        className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-normal font-inria leading-tight"
                    >
                        Don't need to juggle multiple firms , we provide comprehensive, interconnected legal support that grows with your business.
                    </h1>

                    <div className="w-full max-w-md">
                        <svg
                            ref={underlineRef}
                            width="100%"
                            height="12"
                            viewBox="0 0 471 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transform origin-left"
                        >
                            <path
                                d="M3 29.5C34.861 20.7267 78.2477 12.7032 110.936 11.5928C184.652 9.08867 258.416 9.88739 332.159 9.72333C376.875 9.62385 424.215 12.1435 468.364 3.31366"
                                stroke="#8da3c7"
                                strokeWidth="5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <p
                        ref={descRef}
                        className="text-base sm:text-lg md:text-xl font-light font-inria leading-relaxed max-w-lg"
                    >
                        For over One decade, our firm has stood as a beacon of legal excellence, combining deep expertise with compassionate client service to deliver justice and protect rights.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <button
                            ref={buttonRef}
                            className="px-5 py-3 sm:px-6 sm:py-4 bg-[#FCA311] hover:bg-amber-500 shadow-md transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
                            onMouseEnter={(e) => {
                                gsap.to(e.target, { scale: 1.05, duration: 0.2 });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.target, { scale: 1, duration: 0.2 });
                            }}
                            onClick={() => {
                                document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <span className="text-white text-lg sm:text-xl font-normal font-inria cursor-pointer">
                                Meet Our Team
                            </span>
                        </button>

                        <button
                            className="px-5 py-3 sm:px-6 sm:py-4 bg-transparent border-2 border-[#8da3c7] hover:bg-[#8da3c7]/10 shadow-md transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
                            onMouseEnter={(e) => {
                                gsap.to(e.target, { scale: 1.05, duration: 0.2 });
                            }}
                            onClick={() => {
                                document.getElementById('vision').scrollIntoView({ behavior: 'smooth' });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.target, { scale: 1, duration: 0.2 });
                            }}
                        >
                            <span className="text-white text-lg sm:text-xl font-normal font-inria cursor-pointer">
                                Our Vision
                            </span>
                        </button>
                    </div>
                </div>

                {/* Image Content */}
                <div
                    ref={imageRef}
                    className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 mt-4 lg:mt-0"
                >
                    <div className="relative w-full max-w-md">
                        <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-gradient-to-br from-[#8da3c7] to-[#3a506b] rounded-lg flex items-center justify-center overflow-hidden shadow-2xl">
                            <img
                                src='https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
                                className="w-full h-full object-cover"
                                alt='Our legal team discussing a case'
                            />
                        </div>

                        {/* Decorative element */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#8da3c7] opacity-30 rounded-lg z-0"></div>
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#8da3c7] opacity-20 rounded-lg z-0"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;