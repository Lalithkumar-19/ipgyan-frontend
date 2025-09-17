import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const servicesRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const buttonRef = useRef(null);
    const cardsRef = useRef([]);
    const navigate=useNavigate();

    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            const tl = gsap.timeline();

            tl.fromTo(imageRef.current,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
                .fromTo(titleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                    "-=0.4"
                )
                .fromTo(descRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.3"
                )
                .fromTo(buttonRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
                    "-=0.2"
                );

            // Animate service cards with stagger
            gsap.fromTo(cardsRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.5
                }
            );
        }
    }, [inView]);

    const services = [
        {
          title: "Intellectual Property",
          items: [
            "Trademarks & Brand Identity",
            "Copyrights for Creative Works (Music, Film, Art, Software etc)",
            "Patent filing",
            "IP Portfolio Management",
            "IP enforcement",
            "IP litigation & dispute resolution"
          ],
          icon: (
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:[&>path]:fill-amber-500">
              <path d="M25 2C12.318 2 2 12.318 2 25s10.318 23 23 23 23-10.318 23-23S37.682 2 25 2zm0 6c9.389 0 17 7.611 17 17s-7.611 17-17 17S8 34.389 8 25 15.611 8 25 8z" fill="black" className="transition-colors duration-300"/>
            </svg>
          )
        },
        {
          title: "Media and Entertainment",
          items: [
            "Film & Music all end-to-end Agreements",
            "Creator & Talent management Agreements",
            "Content Licensing & Distribution",
            "Film & music business consulting",
            "Compliances & clearances"
          ],
          icon: (
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:[&>path]:fill-amber-500">
              <path d="M10 5v40l35-20L10 5z" fill="black" className="transition-colors duration-300"/>
            </svg>
          )
        },
        {
          title: "Technology Law",
          items: [
            "Data Privacy & Protection",
            "IT & E-commerce Compliance",
            "SaaS, Software & Technology Agreements"
          ],
          icon: (
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:[&>path]:fill-amber-500">
              <path d="M25 2l6 10h10l-8 8 3 12-11-6-11 6 3-12-8-8h10l6-10z" fill="black" className="transition-colors duration-300"/>
            </svg>
          )
        },
        {
          title: "Business Audit & Corporate Advisory",
          items: [
            "Startup/Company Formation & Legal Structuring",
            "Contract Drafting & Negotiation",
            "Employment & Labor Law compliances",
            "Tax compliances",
            "Mergers & Acquisitions, corporate structuring"
          ],
          icon: (
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:[&>path]:fill-amber-500">
              <path d="M5 40h40V10H5v30zm5-20h10v10H10V20zm15 0h10v10H25V20z" fill="black" className="transition-colors duration-300"/>
            </svg>
          ),
   
        }
      ];
      

    return (
        <div
            ref={servicesRef}
            className="w-full flex flex-col items-center justify-center mt-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20"
        >
            <div
                ref={ref}
                className="flex flex-col lg:flex-row w-full max-w-7xl items-center justify-center gap-8 md:gap-10 mb-12 md:mb-16"
            >
                {/* Image Section */}
                <div
                    ref={imageRef}
                    className="w-full lg:w-1/2 h-auto flex justify-center"
                >
                    <img src="/Teamwork.png" className="h-full w-full" alt='team' />

                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-5 lg:gap-6">
                    <h2
                        ref={titleRef}
                        className="text-amber-500 text-center md:text-start text-3xl md:text-xl lg:text-2xl font-bold font-inria"
                    >
                        What We Offer
                    </h2>

                    <p
                        ref={descRef}
                        className="text-black text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal font-inria leading-tight md:leading-[40px] lg:leading-[50px] xl:leading-[60px] max-w-lg"
                    >
                        We provide tailored legal solutions to meet your unique needs, ensuring your rights are protected and justice is served.
                    </p>

                    <div className='flex flex-row items-start justify-start gap-4 md:gap-6 mt-2 md:mt-0'>
                        <button
                            ref={buttonRef}
                            className="px-4 py-2.5 sm:px-5 sm:py-3.5 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 inline-flex justify-center items-center gap-2.5 overflow-hidden w-full sm:w-auto"
                            onMouseEnter={(e) => {
                                gsap.to(e.target, { scale: 1.05, duration: 0.2 });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.target, { scale: 1, duration: 0.2 });
                            }}
                            onClick={()=>{
                                navigate('/services')
                            }}
                        >
                            <span className="text-center cursor-pointer text-black text-base sm:text-lg font-normal font-inria">
                                See more
                            </span>
                        </button>

                        {/* Decorative SVG - Responsive sizing */}
                        <svg className="hidden sm:block w-32 md:w-40 lg:w-48 xl:w-56 h-auto" height="120" viewBox="0 0 444 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8.72222C15.7333 -1.57407 30.4667 -1.57407 45.2 8.72222C59.9333 19.0185 74.6667 19.0185 89.4 8.72222C104.133 -1.57407 118.867 -1.57407 133.6 8.72222C148.333 19.0185 163.067 19.0185 177.8 8.72222C192.533 -1.57407 207.267 -1.57407 222 8.72222C236.733 19.0185 251.467 19.0185 266.2 8.72222C280.933 -1.57407 295.667 -1.57407 310.4 8.72222C325.133 19.0185 339.867 19.0185 354.6 8.72222C369.333 -1.57407 384.067 -1.57407 398.8 8.72222C413.533 19.0185 428.267 19.0185 443 8.72222" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M1 29.1667C15.7333 18.8704 30.4667 18.8704 45.2 29.1667C59.9333 39.463 74.6667 39.463 89.4 29.1667C104.133 18.8704 118.867 18.8704 133.6 29.1667C148.333 39.463 163.067 39.463 177.8 29.1667C192.533 18.8704 207.267 18.8704 222 29.1667C236.733 39.463 251.467 39.463 266.2 29.1667C280.933 18.8704 295.667 18.8704 310.4 29.1667C325.133 39.463 339.867 39.463 354.6 29.1667C369.333 18.8704 384.067 18.8704 398.8 29.1667C413.533 39.463 428.267 39.463 443 29.1667" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M1 49.6111C15.7333 39.3148 30.4667 39.3148 45.2 49.6111C59.9333 59.9074 74.6667 59.9074 89.4 49.6111C104.133 39.3148 118.867 39.3148 133.6 49.6111C148.333 59.9074 163.067 59.9074 177.8 49.6111C192.533 39.3148 207.267 39.3148 222 49.6111C236.733 59.9074 251.467 59.9074 266.2 49.6111C280.933 39.3148 295.667 39.3148 310.4 49.6111C325.133 59.9074 339.867 59.9074 354.6 49.6111C369.333 39.3148 384.067 39.3148 398.8 49.6111C413.533 59.9074 428.267 59.9074 443 49.6111" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M1 70.0556C15.7333 59.7593 30.4667 59.7593 45.2 70.0556C59.9333 80.3519 74.6667 80.3519 89.4 70.0556C104.133 59.7593 118.867 59.7593 133.6 70.0556C148.333 80.3519 163.067 80.3519 177.8 70.0556C192.533 59.7593 207.267 59.7593 222 70.0556C236.733 80.3519 251.467 80.3519 266.2 70.0556C280.933 59.7593 295.667 59.7593 310.4 70.0556C325.133 80.3519 339.867 80.3519 354.6 70.0556C369.333 59.7593 384.067 59.7593 398.8 70.0556C413.533 80.3519 428.267 80.3519 443 70.0556" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M1 90.5001C15.7333 80.2038 30.4667 80.2038 45.2 90.5001C59.9333 100.796 74.6667 100.796 89.4 90.5001C104.133 80.2038 118.867 80.2038 133.6 90.5001C148.333 100.796 163.067 100.796 177.8 90.5001C192.533 80.2038 207.267 80.2038 222 90.5001C236.733 100.796 251.467 100.796 266.2 90.5001C280.933 80.2038 295.667 80.2038 310.4 90.5001C325.133 100.796 339.867 100.796 354.6 90.5001C369.333 80.2038 384.067 80.2038 398.8 90.5001C413.533 100.796 428.267 100.796 443 90.5001" stroke="#3A3A3A" strokeOpacity="0.1" />
                            <path d="M1 110.945C15.7333 100.648 30.4667 100.648 45.2 110.945C59.9333 121.241 74.6667 121.241 89.4 110.945C104.133 100.648 118.867 100.648 133.6 110.945C148.333 121.241 163.067 121.241 177.8 110.945C192.533 100.648 207.267 100.648 222 110.945C236.733 121.241 251.467 121.241 266.2 110.945C280.933 100.648 295.667 100.648 310.4 110.945C325.133 121.241 339.867 121.241 354.6 110.945C369.333 100.648 384.067 100.648 398.8 110.945C413.533 121.241 428.267 121.241 443 110.945" stroke="#3A3A3A" strokeOpacity="0.1" />
                        </svg>

                    </div >
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl">
                {services.map((service, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className={`relative group  bg-white shadow-md h-[260px] md:h-[300px] rounded-lg border-t-4 border-amber-500 overflow-hidden p-4 md:p-5 lg:p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-1 ${service.highlighted ? 'ring-2 ring-amber-300' : ''}`}
                    >
                        <div className="flex items-center mb-3 md:mb-4 gap-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 relative mr-3 md:mr-4 flex-shrink-0">
                                {service.icon}
                            </div>
                            <h3 className={`text-md md:text-base font-normal font-inria group-hover:text-amber-500 text-black}`}>
                                {service.title}
                            </h3>
                        </div>

                        <ul className="space-y-1 md:space-y-2 mb-3 mt-2">
                            {service.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
                                    <span className="text-md md:text-sm font-light font-inria leading-tight text-black">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;