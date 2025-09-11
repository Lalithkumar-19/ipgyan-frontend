import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IndustriesSection = () => {
  const industries = [
    {
      title: "Technology Industry",
      description: "We provide specialized legal support to software companies, IT service providers, AI innovators, fintech platforms, and hardware businesses. Our expertise includes intellectual property protection, data privacy, licensing, and compliance with IT laws.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
    },
    {
      title: "Media and Entertainment Industry",
      description: "We provide comprehensive legal assistance to film, television, OTT platforms, advertising agencies, and digital media companies. Our services include contract drafting, licensing agreements, copyright enforcement, and dispute resolution.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
    },
    {
      title: "Startups Ecosystem",
      description: "We assist entrepreneurs across tech, green-tech, and software industries with services such as company incorporation, funding agreements, intellectual property registration, regulatory compliance, and investor relations.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
    },
    {
      title: "Commercial and Independent Music Industry",
      description: "We offer tailored legal solutions to independent artists, record labels, music producers, and streaming platforms. From contract negotiations to copyright protection, we ensure stakeholders receive fair compensation.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
    },
    {
      title: "Fashion, Lifestyle, and Influencing Industry",
      description: "We provide legal support to fashion houses, designers, influencers, and lifestyle brands for intellectual property protection, brand endorsements, advertising regulations, and licensing agreements.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
    },
    {
      title: "Media Negligence and Healthcare",
      description: "We provide legal services to hospitals, healthcare professionals, and media houses, focusing on medical negligence cases, healthcare compliance, media accountability, and patient rights.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
    },
    {
      title: "Sports and Gaming",
      description: "We support athletes, teams, sports organizations, e-sports platforms, and gaming startups with end-to-end legal assistance in contracts, sponsorships, broadcasting rights, and compliance.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
    },
    {
      title: "Artists and Celebrity Management",
      description: "We represent and protect the interests of actors, musicians, performers, influencers, and public figures, ensuring their professional engagements are legally secure and financially beneficial.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
    },
    {
      title: "Finance Industry",
      description: "We cater to banks, fintech companies, investment firms, and insurance providers by offering services in regulatory compliance, contract drafting, data security, and dispute resolution.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
    }
  ];

  return (
    <section id="industries" className="md:px-20 px-3 py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Industries <span className="text-amber-400">We Serve</span>
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            We provide specialized legal services across diverse industries, helping businesses navigate complex regulations and protect their interests in an ever-changing landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <div className="text-amber-600 group-hover:text-amber-700 transition-colors duration-300">
                    {industry.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  {industry.title}
                </h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed flex-grow">
                  {industry.description}
                </p>
                <div className="text-center mt-auto">
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-amber-600 font-medium hover:text-amber-800 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-900 mb-6">Looking for industry-specific legal support?</p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Get Industry-Specific Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;