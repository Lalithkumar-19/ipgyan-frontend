import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import CTA from '../Components/Services/CTA';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const contentRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([titleRef.current, subtitleRef.current], {
                opacity: 0,
                y: 30
            });

            // Create timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top bottom",
                    toggleActions: "play none none none"
                }
            });

            // Animate elements in sequence
            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            })
                .to(subtitleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.5");

            // Animate form elements
            gsap.utils.toArray('.form-element').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: 0.1 * i,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Persist to localStorage for Admin -> Contacts
            const record = {
                id: Date.now(),
                fullName: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                status: 'New',
                date: new Date().toISOString()
            };
            const key = 'contact_submissions';
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            existing.push(record);
            localStorage.setItem(key, JSON.stringify(existing));

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Our Office",
            content: "1/4 Mukundapur, Kolkata 700099",
            subcontent: "Near Satyajit Ray Film and Television Institute (SRFTI)"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email Us",
            content: "contact@ipgyan.com",
            subcontent: "We'll respond within 24 hours"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Call Us",
            content: "+91 70610 34958",
            subcontent: "Mon - Sat 10:00 AM - 8:00 PM"
        }
    ];

    const socialLinks = [
        {
            name: 'Facebook',
            icon: (
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
            ),
            url: 'https://www.facebook.com/ipgyan'
        },

        {
            name: 'LinkedIn',
            icon: (
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            ),
            url: 'https://in.linkedin.com/company/ipgyan'
        },
        {
            name: 'Instagram',
            icon: (
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            ),
            url: 'https://in.linkedin.com/company/ipgyan'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 -mt-3">
            {/* Hero Section */}
            {/* <div className="w-full px-3 md:px-20 flex flex-col md:flex-row items-center justify-between py-12 md:py-20  bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
                </div>

           
                <div className="md:mb-12 relative z-10 max-w-2xl">
                 
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight max-w-2xl text-center md:text-start animate-fade-in-up">
                        We're always on the lookout to work with new clients. Please get in touch in one of the following ways.
                    </h1>

                  
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                            Schedule a Call
                        </button>
                        <button className="border border-amber-500 text-amber-500 hover:bg-amber-50 font-medium py-3 px-6 rounded-lg transition-all duration-300">
                            Send Message
                        </button>
                    </div>
                </div>

              
                <div className="relative mt-10 md:mt-0 md:ml-8 animate-float">
                    <svg
                        width="382"
                        height="200"
                        viewBox="0 0 382 103"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                    >
                        <path d="M1 6.61111C13.6667 -0.87037 26.3333 -0.87037 39 6.61111C51.6667 14.0926 64.3333 14.0926 77 6.61111C89.6667 -0.87037 102.333 -0.87037 115 6.61111C127.667 14.0926 140.333 14.0926 153 6.61111C165.667 -0.87037 178.333 -0.87037 191 6.61111C203.667 14.0926 216.333 14.0926 229 6.61111C241.667 -0.87037 254.333 -0.87037 267 6.61111C279.667 14.0926 292.333 14.0926 305 6.61111C317.667 -0.87037 330.333 -0.87037 343 6.61111C355.667 14.0926 368.333 14.0926 381 6.61111" stroke="#3A3A3A" strokeOpacity="0.1" className="animate-pulse" />
                        <path d="M1 24.5667C13.6667 17.0852 26.3333 17.0852 39 24.5667C51.6667 32.0482 64.3333 32.0482 77 24.5667C89.6667 17.0852 102.333 17.0852 115 24.5667C127.667 32.0482 140.333 32.0482 153 24.5667C165.667 17.0852 178.333 17.0852 191 24.5667C203.667 32.0482 216.333 32.0482 229 24.5667C241.667 17.0852 254.333 17.0852 267 24.5667C279.667 32.0482 292.333 32.0482 305 24.5667C317.667 17.0852 330.333 17.0852 343 24.5667C355.667 32.0482 368.333 32.0482 381 24.5667" stroke="#3A3A3A" strokeOpacity="0.1" className="animate-pulse delay-100" />
                        <path d="M1 42.5222C13.6667 35.0408 26.3333 35.0408 39 42.5222C51.6667 50.0037 64.3333 50.0037 77 42.5222C89.6667 35.0408 102.333 35.0408 115 42.5222C127.667 50.0037 140.333 50.0037 153 42.5222C165.667 35.0408 178.333 35.0408 191 42.5222C203.667 50.0037 216.333 50.0037 229 42.5222C241.667 35.0408 254.333 35.0408 267 42.5222C279.667 50.0037 292.333 50.0037 305 42.5222C317.667 35.0408 330.333 35.0408 343 42.5222C355.667 50.0037 368.333 50.0037 381 42.5222" stroke="#3A3A3A" strokeOpacity="0.1" className="animate-pulse delay-200" />
                        <path d="M1 60.4778C13.6667 52.9963 26.3333 52.9963 39 60.4778C51.6667 67.9593 64.3333 67.9593 77 60.4778C89.6667 52.9963 102.333 52.9963 115 60.4778C127.667 67.9593 140.333 67.9593 153 60.4778C165.667 52.9963 178.333 52.9963 191 60.4778C203.667 67.9593 216.333 67.9593 229 60.4778C241.667 52.9963 254.333 52.9963 267 60.4778C279.667 67.9593 292.333 67.9593 305 60.4778C317.667 52.9963 330.333 52.9963 343 60.4778C355.667 67.9593 368.333 67.9593 381 60.4778" stroke="#3A3A3A" strokeOpacity="0.1" className="animate-pulse delay-300" />
                        <path d="M1 78.4334C13.6667 70.9519 26.3333 70.9519 39 78.4334C51.6667 85.9149 64.3333 85.9149 77 78.4334C89.6667 70.9519 102.333 70.9519 115 78.4334C127.667 85.9149 140.333 85.9149 153 78.4334C165.667 70.9519 178.333 70.9519 191 78.4334C203.667 85.9149 216.333 85.9149 229 78.4334C241.667 70.9519 254.333 70.9519 267 78.4334C279.667 85.9149 292.333 85.9149 305 78.4334C317.667 70.9519 330.333 70.9519 343 78.4334C355.667 85.9149 368.333 85.9149 381 78.4334" stroke="#3A3A3A" strokeOpacity="0.1" className="animate-pulse delay-400" />
                        <path d="M1 96.3889C13.6667 88.9075 26.3333 88.9075 39 96.3889C51.6667 103.87 64.3333 103.87 77 96.3889C89.6667 88.9075 102.333 88.9075 115 96.3889C127.667 103.87 140.333 103.87 153 96.3889C165.667 88.9075 178.333 88.9075 191 96.3889C203.667 103.87 216.333 103.87 229 96.3889C241.667 88.9075 254.333 88.9075 267 96.3889C279.667 103.87 292.333 103.87 305 96.3889C317.667 88.9075 330.333 88.9075 343 96.3889C355.667 103.87 368.333 103.87 381 96.3889" stroke="#3A3A3A" strokeOpacity="0.1" className="animate-pulse delay-500" />
                    </svg>

            
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full opacity-20 animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-amber-500 rounded-full opacity-30 animate-bounce delay-300"></div>
                </div>

                <style jsx>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    .animate-fade-in-up {
      opacity: 0;
      animation: fadeIn 0.8s ease-out 0.2s forwards;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
  `}</style>
            </div> */}
            <section
                ref={heroRef}
                className="relative pt-28 pb-20 bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden"
            >

                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-400 rounded-full filter blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-400 rounded-full filter blur-3xl opacity-10"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            ref={titleRef}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Get in Touch
                            <span className="block text-amber-400 mt-2">With Our Team</span>
                        </motion.h1>

                        <motion.p
                            ref={subtitleRef}
                            className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            We're here to help and answer any questions you might have. Reach out to us and we'll respond as soon as possible.
                        </motion.p>
                    </div>
                </div>


                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <motion.div
                        ref={contentRef}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >

                        <div className="space-y-8">
                            <motion.h2
                                className="text-3xl font-bold text-slate-900"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Our Contact Information
                            </motion.h2>

                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                                    >
                                        <div className="bg-amber-100 p-3 rounded-lg mr-4 text-amber-600">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                                            <p className="text-slate-600 mt-1">{item.content}</p>
                                            {item.subcontent && (
                                                <p className="text-sm text-slate-500 mt-1">{item.subcontent}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>


                            <motion.div
                                className="pt-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Connect With Us</h3>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white p-3 rounded-full shadow-sm text-slate-700 hover:bg-amber-500 hover:text-white transition-colors duration-300"
                                            aria-label={social.name}
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                {social.icon}
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </motion.div>


                            <motion.div
                                className="mt-8 rounded-xl overflow-hidden shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.4301014896205!2d88.38794297475472!3d22.488040636065303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02714fec5edda3%3A0x7e2efdf9f9961677!2sipgyan!5e0!3m2!1sen!2sin!4v1758216356259!5m2!1sen!2sin"
                                    width="100%"
                                    height="300"
                                    style={{border:0}}
                                    allowfullscreen=""
                                    loading="lazy"
                                    title='Our Location'
                                    className='rounded-xl'
                                    referrerpolicy="no-referrer-when-downgrade">

                                </iframe>
                            </motion.div>
                        </div>

                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-6 md:p-8 form-element"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Send us a message</h2>
                            <p className="text-slate-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                            {submitStatus === 'success' && (
                                <motion.div
                                    className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-start"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                    </svg>
                                    <span>Your message has been sent successfully! We'll get back to you soon.</span>
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                                    </svg>
                                    <span>There was an error sending your message. Please try again later.</span>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-element">
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                                                placeholder="Your name"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-element">
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-element">
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                                                placeholder="+91 1234567890"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-element">
                                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors appearance-none bg-white"
                                                required
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Legal Consultation">Legal Consultation</option>
                                                <option value="Partnership">Partnership</option>
                                                <option value="Careers">Careers</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-element">
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Your Message <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows="5"
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                                            placeholder="How can we help you?"
                                            required
                                        ></textarea>
                                        <div className="absolute top-3 right-3">
                                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-element">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <CTA />
        </div>
    );
};

export default ContactUs;