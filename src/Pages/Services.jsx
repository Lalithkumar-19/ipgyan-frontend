import React from 'react';
import { CheckCircle, Award, Users, Briefcase, Clock, Shield, Phone, Calendar, Gavel, Handshake, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../Components/PracticeArea/Hero';
import ServicesSection from '../Components/Services/ServicesSection';
import IndustriesSection from '../Components/Services/IndustriesSection';
import WhyChooseUs from '../Components/Services/WhyChooseUs';
import CTA from '../Components/Services/CTA';

const Services = () => {



    return (
        <div className="min-h-screen scroll-smooth -mt-10">

            {/* <Hero /> */}
            <Hero />
            <ServicesSection />
            <IndustriesSection />
            <WhyChooseUs />
            <CTA />

            {/* Practice Areas */}
            {/* <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Practice Areas</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                        <p className="text-gray-600">
                            We provide comprehensive legal services across a wide range of practice areas to meet all your legal needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {practiceAreas.map((area, index) => (
                            <div
                                key={index}
                                className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 flex items-start gap-4"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                        {area.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
                                    <p className="text-gray-600">{area.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            <div className='h-1 w-full bg-amber-400' />
        </div>
    );
};

export default Services;