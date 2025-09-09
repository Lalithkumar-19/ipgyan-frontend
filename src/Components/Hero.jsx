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
            className="relative w-full -mt-2 px-4 md:px-20 text-white bg-[#14213D] min-h-screen flex items-center justify-center"
        >
            <svg className='absolute top-0  -left-[20px]' width="764" height="982" viewBox="0 0 764 982" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.54556 995.022C-49.705 825.463 11.7719 737.299 189.976 730.528C368.181 723.756 429.657 635.592 374.407 466.033C319.156 296.475 380.633 208.31 558.838 201.539C737.042 194.768 798.519 106.603 743.268 -62.9548" stroke="#E5E5E5" stroke-opacity="0.11" />
            </svg>

            <svg className='absolute top-0 left-[400px]' width="764" height="982" viewBox="0 0 764 982" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.54556 995.022C-49.705 825.463 11.7719 737.299 189.976 730.528C368.181 723.756 429.657 635.592 374.407 466.033C319.156 296.475 380.633 208.31 558.838 201.539C737.042 194.768 798.519 106.603 743.268 -62.9548" stroke="#E5E5E5" stroke-opacity="0.11" />
            </svg>

            <div
                ref={ref}
                className="flex flex-col lg:flex-row w-full max-w-7xl items-center justify-between gap-10"
            >
                {/* Text Content */}
                <div className="flex flex-col w-full lg:w-1/2 gap-6 order-2 lg:order-1">
                    <h1
                        ref={textRef}
                        className="text-4xl sm:text-5xl md:text-6xl font-normal font-inria leading-tight"
                    >
                        Your Partner on the Path to Justice.
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
                                stroke="#FCA311"
                                strokeWidth="5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <p
                        ref={descRef}
                        className="text-lg md:text-xl font-light font-inria leading-relaxed max-w-lg"
                    >
                        We stand by your side, providing expert legal guidance and unwavering support to protect your rights and ensure justice is served.
                    </p>

                    <button
                        ref={buttonRef}
                        className="px-6 py-4 bg-amber-500 hover:bg-amber-600 shadow-md transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
                        onMouseEnter={(e) => {
                            gsap.to(e.target, { scale: 1.05, duration: 0.2 });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.target, { scale: 1, duration: 0.2 });
                        }}
                    >
                        <span className="text-black text-xl md:text-2xl font-normal font-inria cursor-pointer">
                            Schedule a Consultation
                        </span>
                    </button>
                </div>

                {/* Image Content */}
                <div
                    ref={imageRef}
                    className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2"
                >
                    <div className="relative w-full max-w-md">
                        {/* Placeholder for image - you would replace this with your actual image */}
                        <div className="w-full md:mt-10 h-64 md:h-[80%] bg-gradient-to-r from-[#FCA311] to-[#E5E5E5] rounded-lg flex items-center justify-center">
                            <img src='/hero-pic.png' className="w-full h-full object-cover" alt='hero image' />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;