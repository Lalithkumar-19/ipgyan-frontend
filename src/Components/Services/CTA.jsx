import React from 'react'
import {Link} from 'react-router-dom';
import { Calendar, ArrowRight, Phone } from 'lucide-react';
import { Whatsappsender } from '../../utils';

const CTA = () => {
    return (
        <section className="py-16 px-3 md:px-20 md:py-24 bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                        Ready to Get <span className="text-amber-500">Started</span>?
                    </h2>
                    <p className="text-xl md:text-2xl mb-10 text-gray-700 leading-relaxed">
                        Schedule a free consultation with one of our experienced attorneys today and take the first step towards resolving your legal matters.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                        <div
                            onClick={Whatsappsender}
                            className="group cursor-pointer bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                        >
                            <Calendar className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            <span>Book a Free Consultation</span>
                            <ArrowRight className="w-5 h-5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300" />
                        </div>

                        <a
                            href="tel:+917061034958"
                            className="group bg-transparent border-2 border-amber-500 text-gray-900 hover:bg-amber-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg flex items-center justify-center gap-3 hover:text-white shadow-lg hover:shadow-2xl hover:-translate-y-1"
                        >
                            <Phone className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            <span>Call Us Now</span>
                        </a>
                    </div>

                    {/* Additional information */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-gray-600 mb-4">Prefer to email us first?</p>
                        <a
                            href="mailto:info@example.com"
                            className="text-amber-600 hover:text-amber-500 transition-colors duration-300 text-lg"
                        >
                            contact@ipgyan.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
