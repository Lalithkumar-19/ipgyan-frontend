import React from 'react'
import { Scale, Gavel, Globe, Users, FileText, Landmark,CheckCircle,ArrowRight } from "lucide-react";
import {Link } from "react-router-dom"
const Practices = () => {


    const practiceAreas = [
        {
            title: "Family Law",
            description:
                "Our family and divorce lawyers focus on all issues relating to family law including divorce, common law spouses, support, asset division, debt division and child custody or parenting time.",
            icon: <Users className="w-8 h-8" />,
            features: [
                "Divorce and separation cases",
                "Child custody & parenting time",
                "Asset & debt division",
                "Spousal & child support"
            ],
        },
        {
            title: "Estate Litigation",
            description:
                "Our estate litigators assist with estate litigation and have numerous court successes in addition to settlements dealing with unfair wills, will disputes, trust disputes and more.",
            icon: <FileText className="w-8 h-8" />,
            features: [
                "Will disputes & challenges",
                "Trust disputes",
                "Unfair wills litigation",
                "Estate settlement guidance"
            ],
        },
        {
            title: "Immigration Law",
            description:
                "Our immigration lawyers have extensive experience with all aspects of immigration law, helping individuals and businesses navigate complex immigration processes with confidence.",
            icon: <Globe className="w-8 h-8" />,
            features: [
                "Visa & work permit applications",
                "Permanent residency support",
                "Business immigration solutions",
                "Appeals & legal representation"
            ],
        },
        {
            title: "Strata Law",
            description:
                "Our strata lawyers deal with both strata owners and corporations, providing expert guidance on all matters related to strata properties and governance.",
            icon: <Landmark className="w-8 h-8" />,
            features: [
                "Strata governance disputes",
                "Bylaw creation & enforcement",
                "Owner & corporation representation",
                "Property management legal advice"
            ],
        },
        {
            title: "Corporate & Commercial Law",
            description:
                "We provide legal expertise for businesses across industries, covering contracts, compliance, intellectual property, and dispute resolution.",
            icon: <Scale className="w-8 h-8" />,
            features: [
                "Business incorporation & structuring",
                "Contract drafting & review",
                "Intellectual property protection",
                "Commercial dispute resolution"
            ],
        },
        {
            title: "Civil & Criminal Litigation",
            description:
                "Our lawyers represent clients in a wide range of civil and criminal disputes, ensuring fair representation and justice in every case.",
            icon: <Gavel className="w-8 h-8" />,
            features: [
                "Civil rights cases",
                "Fraud & white-collar defense",
                "Personal injury litigation",
                "General dispute resolution"
            ],
        },
    ];




    return (
        <section id="PracticeAreas" className="md:px-20 px-3 py-16 md:py-10 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-amber-400">Practice Areas</span>
                    </h2>
                    {/* <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div> */}
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We offer a comprehensive range of legal services to meet all your needs. Our experienced attorneys are dedicated to providing exceptional representation in various areas of law.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {practiceAreas.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
                        >
                            <div className="p-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                                    <div className="text-amber-600 group-hover:text-amber-700 transition-colors duration-300">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                {/* <div className="text-center mt-8">
                            <Link
                                to="/contact"
                                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors group-hover:translate-x-1 duration-300"
                            >
                                Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </div> */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-10 pt-8 border-t border-gray-200">
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


    )
}

export default Practices
