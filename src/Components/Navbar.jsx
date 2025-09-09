import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const menuRef = useRef(null);
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    // Animation for navbar entry
    useEffect(() => {
        gsap.fromTo(navbarRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    // Sticky navbar effect
    useEffect(() => {
        if (!inView) {
            gsap.to(navbarRef.current, {
                backgroundColor: "rgba(20, 33, 61, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                duration: 0.3
            });
        } else {
            gsap.to(navbarRef.current, {
                backgroundColor: "#14213D",
                backdropFilter: "blur(0px)",
                boxShadow: "none",
                duration: 0.3
            });
        }
    }, [inView]);

    // Mobile menu animation
    useEffect(() => {
        if (isMenuOpen) {
            gsap.to(menuRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(menuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, [isMenuOpen]);

    // Menu item animation on hover
    const handleHover = (e) => {
        gsap.to(e.target, {
            y: -2,
            color: "#FCA311",
            duration: 0.2
        });
    };

    const handleHoverExit = (e) => {
        gsap.to(e.target, {
            y: 0,
            color: "#FFFFFF",
            duration: 0.2
        });
    };

    // Button animation
    const handleButtonHover = (e) => {
        gsap.to(e.target, {
            scale: 1.05,
            backgroundColor: "#e5a00d",
            duration: 0.2
        });
    };

    const handleButtonExit = (e) => {
        gsap.to(e.target, {
            scale: 1,
            backgroundColor: "#FCA311",
            duration: 0.2
        });
    };

    return (
        <>
            <div ref={ref} className="h-1 w-full absolute top-0"></div>
            <nav
                ref={navbarRef}
                className="fixed w-full z-50 py-3 px-4 md:px-20 text-white bg-[#14213D]"
            >
                <div className="flex flex-row justify-between items-center">
                    <h1
                        className="text-2xl font-bold cursor-pointer"
                        onMouseEnter={handleHover}
                        onMouseLeave={handleHoverExit}
                    >
                        IPGYAN
                    </h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-row gap-5 items-center">
                        {['Home', 'About', 'Services', 'Blog', 'FAQ', 'Testimonials'].map((item) => (
                            <span
                                key={item}
                                className="cursor-pointer relative text-lg"
                                onMouseEnter={handleHover}
                                onMouseLeave={handleHoverExit}
                            >
                                {item}
                            </span>
                        ))}

                    </div>
                    <button
                        className="hidden md:flex bg-[#FCA311] text-black font-bold text-lg cursor-pointer px-4 py-2 rounded transition-all"
                        onMouseEnter={handleButtonHover}
                        onMouseLeave={handleButtonExit}
                    >
                        Contact
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col w-6 h-5 justify-between items-center cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-full h-0.5 bg-white transition-transform ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-white transition-transform ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    ref={menuRef}
                    className="md:hidden h-0 overflow-hidden opacity-0"
                >
                    <div className="flex flex-col gap-4 mt-4 pb-4">
                        {['Home', 'About', 'Services', 'Blog', 'FAQ', 'Testimonials'].map((item) => (
                            <span
                                key={item}
                                onMouseEnter={handleHover}
                                onMouseLeave={handleHoverExit}
                                className="cursor-pointer py-2 border-b border-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </span>
                        ))}

                        <button
                            className="bg-[#FCA311] text-black font-bold text-lg cursor-pointer px-4 py-2 rounded mt-2 w-full"
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonExit}
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;