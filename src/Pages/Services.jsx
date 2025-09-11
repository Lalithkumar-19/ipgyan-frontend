import React from 'react';
import { CheckCircle, Award, Users, Briefcase, Clock, Shield, Phone, Calendar, Gavel, Handshake, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../Components/Services/Hero';
import ServicesSection from '../Components/Services/ServicesSection';
import IndustriesSection from '../Components/Services/IndustriesSection';
import WhyChooseUs from '../Components/Services/WhyChooseUs';

const Services = () => {
    const services = [
        {
            icon: <Briefcase className="w-8 h-8 text-blue-600" />,
            title: "Corporate Law",
            description: "Expert legal advice for businesses of all sizes, from startups to established corporations.",
            features: ["Business Formation", "Contracts", "Mergers & Acquisitions", "Compliance"]
        },
        {
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            title: "Intellectual Property",
            description: "Protect your innovations, trademarks, and creative works with our IP legal services.",
            features: ["Trademark Registration", "Patent Filing", "Copyright Protection", "IP Litigation"]
        },
        {
            icon: <Users className="w-8 h-8 text-blue-600" />,
            title: "Family Law",
            description: "Compassionate legal support for family matters, from divorce to child custody.",
            features: ["Divorce", "Child Custody", "Adoption", "Prenuptial Agreements"]
        },
        {
            icon: <Scale className="w-8 h-8 text-blue-600" />,
            title: "Real Estate Law",
            description: "Comprehensive legal services for all your real estate transactions and disputes.",
            features: ["Property Transactions", "Lease Agreements", "Title Disputes", "Zoning Issues"]
        },
        {
            icon: <Gavel className="w-8 h-8 text-blue-600" />,
            title: "Criminal Defense",
            description: "Aggressive defense strategies for individuals facing criminal charges.",
            features: ["DUI Defense", "Drug Charges", "White Collar Crimes", "Appeals"]
        },
        {
            icon: <Handshake className="w-8 h-8 text-blue-600" />,
            title: "Employment Law",
            description: "Protecting the rights of both employers and employees in the workplace.",
            features: ["Discrimination Claims", "Wrongful Termination", "Contract Review", "Workplace Policies"]
        }
    ];

    const stats = [
        { value: "95%", label: "Client Satisfaction" },
        { value: "500+", label: "Cases Handled" },
        { value: "25+", label: "Years Experience" },
        { value: "99%", label: "Success Rate" }
    ];

    const practiceAreas = [
        {
            icon: <Briefcase className="w-6 h-6 text-blue-600" />,
            title: "Business Law",
            description: "Comprehensive legal solutions for businesses of all sizes."
        },
        {
            icon: <Scale className="w-6 h-6 text-blue-600" />,
            title: "Real Estate",
            description: "Expert guidance for all your property transactions."
        },
        {
            icon: <Gavel className="w-6 h-6 text-blue-600" />,
            title: "Criminal Defense",
            description: "Strong defense strategies for criminal cases."
        },
        {
            icon: <Users className="w-6 h-6 text-blue-600" />,
            title: "Family Law",
            description: "Compassionate support for family legal matters."
        },
        {
            icon: <Shield className="w-6 h-6 text-blue-600" />,
            title: "Intellectual Property",
            description: "Protection for your creative and innovative works."
        },
        {
            icon: <Handshake className="w-6 h-6 text-blue-600" />,
            title: "Employment Law",
            description: "Legal solutions for workplace issues."
        }
    ];

    return (
        <div className="min-h-screen scroll-smooth">
            {/* Hero Section */}
            <Hero />
            <ServicesSection />




            {/* Why Choose Us */}
           
            <IndustriesSection />
            <WhyChooseUs />

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

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-[#1D293D] relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                            Ready to Get <span className="text-amber-400">Started</span>?
                        </h2>
                        <p className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed">
                            Schedule a free consultation with one of our experienced attorneys today and take the first step towards resolving your legal matters.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                            <Link
                                to="/contact"
                                className="group bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                            >
                                <Calendar className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                <span>Book a Free Consultation</span>
                                <ArrowRight className="w-5 h-5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300" />
                            </Link>

                            <a
                                href="tel:+1234567890"
                                className="group bg-transparent border-2 border-amber-400 text-white hover:bg-amber-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg flex items-center justify-center gap-3 hover:text-white shadow-lg hover:shadow-2xl hover:-translate-y-1"
                            >
                                <Phone className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                <span>Call Us Now</span>
                            </a>
                        </div>

                        {/* Additional information */}
                        <div className="mt-12 pt-8 border-t border-gray-700">
                            <p className="text-gray-400 mb-4">Prefer to email us first?</p>
                            <a
                                href="mailto:info@example.com"
                                className="text-amber-400 hover:text-amber-300 transition-colors duration-300 text-lg"
                            >
                                info@ipgyan.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <div className='h-1 w-full bg-amber-400'/>
        </div>
    );
};

export default Services;