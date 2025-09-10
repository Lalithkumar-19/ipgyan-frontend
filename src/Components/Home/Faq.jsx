import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Faq = () => {
  const [openItems, setOpenItems] = useState({});
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    // GSAP scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header first
            const header = entry.target.querySelector('.faq-header');
            if (header) {
              header.style.transform = 'translateY(0)';
              header.style.opacity = '1';
            }

            // Then animate FAQ items with stagger
            const items = entry.target.querySelectorAll('.faq-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const faqData = [
    {
      question: "What types of legal services do you provide?",
      answer: "We offer services in various legal areas, including family law, business law, property law, intellectual property, and litigation."
    },
    {
      question: "How can I schedule a consultation with your legal team?",
      answer: "You can schedule a consultation by calling our office, using our online booking system, or visiting us in person during business hours."
    },
    {
      question: "Do you offer free initial consultations?",
      answer: "Yes, we offer free 30-minute initial consultations for new clients to discuss your legal needs and how we can help."
    },
    {
      question: "What are your typical fees for legal services?",
      answer: "Our fees vary depending on the complexity and type of case. We offer both hourly rates and flat fee arrangements based on your specific needs."
    },
    {
      question: "Do you handle cases outside the city or internationally?",
      answer: "Yes, we handle cases both locally and internationally. Our team has experience with cross-border legal matters and can assist with various jurisdictions."
    }
  ];

  return (
    <section ref={sectionRef} className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-28 w-full mx-auto max-w-8xl">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left Column - FAQ Content */}
        <div className="space-y-6 md:space-y-8">
          {/* Header */}
          <div className="faq-header opacity-0 transform translate-y-8 transition-all duration-700">
            <h2 className="text-amber-500 text-center md:text-start text-3xl sm:text-3xl md:text-4xl font-bold font-inria mb-3 md:mb-4">
              FAQs
            </h2>
            <p className="text-gray-600 text-center md:text-start max-w-md text-xl sm:text-2xl md:text-4xl font-normal font-inria leading-tight">
              We've compiled responses to the questions we hear most 
              often to help you better understand our approach and 
              offerings.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 md:space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="faq-item opacity-0 transform translate-y-8 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-4 sm:px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs sm:text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-gray-900 font-semibold text-sm sm:text-base md:text-lg">
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-3 md:ml-4">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 bg-orange-400 rounded-full flex items-center justify-center">
                        {openItems[index] ? (
                          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        ) : (
                          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {/* Answer Content */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-4 sm:px-5 md:px-6 pb-4 md:pb-5">
                      <div className="pl-0 sm:pl-8 md:pl-12">
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="lg:pl-8 mt-8 lg:mt-0">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Legal consultation"
              className="w-full h-auto sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover rounded-xl md:rounded-2xl shadow-lg md:shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl md:rounded-2xl"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-header {
          transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), 
                      opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .faq-item {
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), 
                      opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        @media (max-width: 640px) {
          .faq-item:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Faq;