import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const WhatToExpect = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const stepsRef = useRef([]);
    
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    // Add steps to ref array
    const addToStepsRef = (el) => {
        if (el && !stepsRef.current.includes(el)) {
            stepsRef.current.push(el);
        }
    };

    useEffect(() => {
        if (inView) {
            const tl = gsap.timeline();
            
            tl.fromTo(imageRef.current,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                "-=0.4"
            )
            .fromTo(stepsRef.current,
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6, 
                    stagger: 0.15,
                    ease: "power2.out" 
                },
                "-=0.3"
            );
        }
    }, [inView]);

    const steps = [
        {
            title: "Step 1: Initial Phone Call or Email",
            description: "Our lovely receptionist will greet you, ask about your matter, check for conflicts of interest, advise on consultation fees, and book your appointment."
        },
        {
            title: "Step 2: Your Initial Consultation",
            description: "Meet in person, via phone, or Zoom. Your lawyer will listen to your situation, provide legal advice, and outline a roadmap for your case."
        },
        {
            title: "Step 3: Your Representation",
            description: "Your lawyer will conduct an in-depth review, communicate with the other side, and keep you informed at every step of the process."
        },
        {
            title: "Step 4: Conclusion of Your File",
            description: "Your case concludes through settlement or trial. We'll close your file, return documents, refund any remaining retainer, and keep records for 10 years."
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8"
        >
            <div 
                ref={ref}
                className="max-w-7xl mx-auto"
            >
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    {/* Image Section */}
                    <div 
                        ref={imageRef}
                        className="w-full lg:w-2/5 flex justify-center lg:justify-start"
                    >
                        <div className="relative w-full max-w-md">
                            <div className="w-full h-72 sm:h-80 md:h-96 bg-gradient-to-br from-blue-100 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
                                <img 
                                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                                    className="w-full h-full object-cover" 
                                    alt="Friendly legal team at IPGYAN" 
                                />
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-500 opacity-20 rounded-xl z-0"></div>
                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 opacity-20 rounded-xl z-0"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div 
                        ref={contentRef}
                        className="w-full lg:w-3/5"
                    >
                        <h2 
                            ref={titleRef}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500 font-inria mb-6"
                        >
                            What To Expect When Working With Us
                        </h2>
                        
                        {/* <div className="w-24 h-1 bg-amber-500 mb-8"></div> */}
                        
                        <p className="text-lg text-gray-700 mb-10 font-inria">
                            Many of our clients have never dealt with family law or other legal issues. 
                            Understandably, they can be confused and lost when they first contact us. 
                            Here are the steps we generally follow from the moment you call until the 
                            end of your legal representation:
                        </p>

                        {/* Steps */}
                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <div 
                                    key={index}
                                    ref={addToStepsRef}
                                    className="bg-gray-50 p-6 rounded-xl border-l-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-inria">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info */}
                        <div 
                            ref={addToStepsRef}
                            className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100"
                        >
                            <p className="text-gray-700 mb-4">
                                Please note: in some situations, you may wish to switch lawyers, not have 
                                lawyers represent you or self-represent. If that is the case, you will 
                                inform us of your decision and we will close your file and return your 
                                file contents/retainer as long as you do not have any outstanding 
                                accounts with us.
                            </p>
                            <p className="text-gray-700">
                                We hope the above provides some clarity on the ever confusing legal world we live in.
                            </p>
                        </div>

                        {/* CTA */}
                        {/* <div 
                            ref={addToStepsRef}
                            className="mt-10 text-center lg:text-left"
                        >
                            <p className="text-lg font-medium text-gray-900 mb-6 font-inria">
                                To contact our award winning lawyers, please call us at <span className="text-amber-600">604-974-9529</span> or get in touch.
                            </p>
                            <button className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors shadow-md">
                                Schedule Your Consultation
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatToExpect;