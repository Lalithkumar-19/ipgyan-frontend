import React from 'react'
import { CheckCircle, Award, Users, Shield } from 'lucide-react';

const WhyChooseUs = () => {
    return (
        <section className="py-16 bg-gray-50 px-3 md:px-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">Why Choose IPGYAN</h2>
                    {/* <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div> */}
                    <p className="text-black font-ineria text-xl">
                        We are committed to providing exceptional legal services with integrity, professionalism, and dedication to our clients' success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Award className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Experienced Attorneys</h3>
                        <p className="text-gray-600">Our team of skilled lawyers brings years of experience and expertise to every case.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Client-Focused</h3>
                        <p className="text-gray-600">We prioritize your needs and work tirelessly to achieve the best possible outcome.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Proven Results</h3>
                        <p className="text-gray-600">Our track record of success speaks for itself in winning cases for our clients.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
