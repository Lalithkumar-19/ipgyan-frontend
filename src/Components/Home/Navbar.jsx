import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const menuRef = useRef(null);
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    // Navigation links
    const navlinks = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "/aboutus"
        }, 
        {
            name: "Services",
            link: "/services"
        }, 
        {
            name: "Blog",
            link: "/blog"
        }, 
        {
            name: "Practice Areas",
            link: "/practiceareas"
        }, 
        // {
        //     name: "Testimonials",
        //     link: "/testimonials"
        // }
    ];

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

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
            // Prevent body scrolling when menu is open
            document.body.style.overflow = 'hidden';
            gsap.to(menuRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            // Re-enable scrolling when menu is closed
            document.body.style.overflow = 'unset';
            gsap.to(menuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Menu item animation on hover
    const handleHover = (e) => {
        if (window.innerWidth > 768) { // Only on desktop
            gsap.to(e.target, {
                y: -2,
                color: "#FCA311",
                duration: 0.2
            });
        }
    };

    const handleHoverExit = (e) => {
        if (window.innerWidth > 768) { // Only on desktop
            gsap.to(e.target, {
                y: 0,
                color: "#FFFFFF",
                duration: 0.2
            });
        }
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

    // Handle menu item click (for mobile)
    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div ref={ref} className="h-1 w-full absolute top-0"></div>
            <nav
                ref={navbarRef}
                className="fixed w-full z-50 py-3 px-4 md:px-6 lg:px-20 text-white bg-[#14213D]"
            >
                <div className="flex flex-row justify-between items-center max-w-7xl mx-auto">
                    <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-[#FCA311] transition-colors">
                        IPGYAN
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-row gap-4 lg:gap-5 items-center">
                        {navlinks.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className="cursor-pointer relative text-base lg:text-lg transition-colors duration-200 hover:text-[#FCA311]"
                                onMouseEnter={handleHover}
                                onMouseLeave={handleHoverExit}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link
                            to="/contact"
                            className="bg-[#FCA311] text-black font-bold text-base lg:text-lg cursor-pointer px-3 py-1.5 lg:px-4 lg:py-2 rounded transition-all hover:bg-[#e5a00d] active:scale-95"
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonExit}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col w-6 h-5 justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FCA311] rounded"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className={`w-full h-0.5 bg-white transition-transform ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-white transition-transform ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    ref={menuRef}
                    className="md:hidden h-0 overflow-hidden opacity-0 bg-[#14213D] absolute left-0 right-0 top-full shadow-lg"
                    style={{ maxHeight: 'calc(100vh - 100%)', overflowY: 'auto' }}
                >
                    <div className="flex flex-col gap-0 pt-2 pb-6 px-4">
                        {navlinks.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className="block cursor-pointer py-3 px-4 border-b border-gray-700 text-lg transition-colors duration-200 hover:text-[#FCA311] hover:bg-[#1a2d4f] active:bg-[#22345c] rounded-md"
                                onClick={handleMenuItemClick}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link
                            to="/contact"
                            className="block text-center bg-[#FCA311] text-black font-bold text-lg cursor-pointer px-4 py-3 rounded mt-4 hover:bg-[#e5a00d] active:scale-95 transition-all"
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonExit}
                            onClick={handleMenuItemClick}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
};

export default Navbar;