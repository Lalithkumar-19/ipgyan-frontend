import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { api } from '../../utils';

const NewsletterSubscription = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const formRef = useRef(null);

    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (inView) {
            const tl = gsap.timeline();

            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
                .fromTo(descRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                    "-=0.4"
                )
                .fromTo(formRef.current,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power2.out"
                    },
                    "-=0.3"
                );
        }
    }, [inView]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = (email || '').trim().toLowerCase();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            // optionally set an error state if present
            console.error('Email is required');
            return;
        }
        if (!emailRegex.test(value)) {
            console.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post("/news-letter-req", { email: value });
            if (res.status === 200) {
                setSubscribed(true);
                setEmail('');
                // auto-hide success after a few seconds (optional)
                setTimeout(() => setSubscribed(false), 5000);
            } else {
                console.error(res?.data?.message || 'Subscription failed');
            }
        } catch (error) {
            console.error(error?.response?.data?.message || 'Subscription failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-20 text-black px-4  md:px-28 relative  flex flex-col md:flex-row justify-center items-center overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div
                ref={ref}
                className="max-w-4xl mx-auto relative z-10 "
            >
                {/* Section Header */}
                <h2
                    ref={titleRef}
                    className="text-3xl md:text-4xl text-center md:text-start mb-2 md:mb-0  text-shadow-stone-50 lg:text-5xl font-bold text-amber-500 font-inria"
                >
                    Stay Informed
                </h2>
                {/* <div className="w-24 h-1 bg-amber-400 mx-auto my-4"></div> */}
                <p
                    ref={descRef}
                    className="text-lg md:text-xl text-center text-black   md:text-start max-w-xl mx-auto md:mt-6 font-inria"
                >
                    Subscribe to our newsletter for legal insights, firm updates, and valuable resources delivered to your inbox.
                </p>
            </div>
            {/* Subscription Form */}
            <div className='flex w-full  flex-col justify-center items-center md:mt-10'>
                <div
                    ref={formRef}
                    className=""
                >
                    {subscribed ? (
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <div className="flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-2xl font-bold text-black mb-2 font-inria">Thank You for Subscribing!</h3>
                                <p className="text-amber-500 font-bold">You'll receive our next newsletter with the latest legal insights and updates.</p>
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
                        >
                            <div className="flex flex-col lg:flex-row gap-4 items-center ">
                                <div className="flex-grow mt-2">
                                    <label htmlFor="email" className="text-2xl font-light mt-20 text-black mb-10 font-inria ml-1 " >Email address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full px-5 py-3 rounded-lg border border-amber-300  focus:border-amber-400  text-gray-900 placeholder-gray-600"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="cursor-pointer h-[50px] w-full md:mt-10 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-600 transition-colors shadow-md flex items-center justify-center min-w-[160px] disabled:opacity-80 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        "Subscribe Now"
                                    )}
                                </button>
                            </div>

                            <p className="text-black text-sm mt-4">
                                We respect your privacy and will never share your information.
                            </p>
                        </form>
                    )}
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:mt-10">
                    {[
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            ),
                            text: "Legal Insights & Updates"
                        },
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            text: "Timely Notifications"
                        },
                        {
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            ),
                            text: "Exclusive Client Resources"
                        }
                    ].map((benefit, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                            <div className="text-black mb-2">
                                {benefit.icon}
                            </div>
                            <p className="text-amber-500 text-sm  font-bold">
                                {benefit.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </section >
    );
};

export default NewsletterSubscription;