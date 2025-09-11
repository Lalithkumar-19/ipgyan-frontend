import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>,
      title: "IP Services",
      description: "Our Intellectual Property (IP) services are designed to help individuals, businesses, and innovators protect their creative and innovative assets. We provide comprehensive solutions for patents, trademarks, copyrights, designs, and trade secrets, ensuring that your intellectual property is legally safeguarded against misuse or infringement."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>,
      title: "Media and Entertainment Services",
      description: "The media and entertainment industry requires specialized legal support to navigate contracts, licensing, production rights, and dispute resolution. Our firm assists artists, producers, broadcasters, and digital platforms in managing legal complexities within film, television, music, gaming, and online content."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>,
      title: "Analytical Services",
      description: "We provide in-depth analytical services to support informed decision-making for individuals and businesses. Our approach involves legal research, case analysis, compliance assessments, due diligence, and risk evaluation, enabling clients to better understand the implications of their actions and strategies."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>,
      title: "Legal Services",
      description: "We offer a wide range of legal services covering litigation, corporate law, regulatory compliance, dispute resolution, and advisory support. Our experienced team represents clients across courts, tribunals, and arbitration forums, ensuring strong advocacy and effective results."
    }
  ];

  return (
    <section id="services" className="md:px-20 px-3 py-16 md:py-10 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-amber-400">Services</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We offer a comprehensive range of legal and professional services to meet all your needs. 
            Our experienced team is dedicated to providing exceptional representation across various practice areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <div className="text-amber-600 group-hover:text-amber-700 transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed flex-grow">
                  {service.description}
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
          <p className="text-gray-900 mb-6">Not sure which service you need?</p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Get a Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;