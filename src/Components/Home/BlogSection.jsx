import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate=useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current;
   

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtitle animation
    gsap.fromTo(subtitle, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards animation
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.4 + (index * 0.1),
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p ref={titleRef} className="text-orange-400 text-3xl font-bold  mb-2">Latest Blog</p>
          <h2 ref={subtitleRef} className="text-3xl md:text-4xl font-normal font-inria leading-tight mxw-w-[400px]">
            Stay informed with our expert insights, legal updates, and practical tips to navigate the complexities of the law.
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Blog Card 1 */}
          <div ref={addToRefs} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Cpath d='M100 150 Q150 100 200 150 T300 150' stroke='%236b7280' stroke-width='2' fill='none'/%3E%3Ccircle cx='120' cy='130' r='8' fill='%239ca3af'/%3E%3Ccircle cx='280' cy='170' r='8' fill='%239ca3af'/%3E%3C/svg%3E" 
                alt="Business meeting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-orange-400 mb-2">
                <span>05 Oct 2023</span>
                <span className="mx-2">•</span>
                <span>Business Law</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                5 Legal Tips Every Small Business Owner Should Know
              </h3>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div ref={addToRefs} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f9fafb'/%3E%3Crect x='50' y='50' width='300' height='200' fill='white' stroke='%23d1d5db' stroke-width='2'/%3E%3Cpath d='M70 80h260M70 110h180M70 140h220M70 170h160' stroke='%236b7280' stroke-width='2'/%3E%3C/svg%3E" 
                alt="Employment law document"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-orange-400 mb-2">
                <span>28 Sep 2023</span>
                <span className="mx-2">•</span>
                <span>Employment Law</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Understanding Your Rights: A Guide to Employment Law
              </h3>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div ref={addToRefs} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f9ff'/%3E%3Crect x='150' y='80' width='100' height='120' fill='%23dbeafe' stroke='%2360a5fa' stroke-width='2'/%3E%3Crect x='160' y='90' width='80' height='8' fill='%2393c5fd'/%3E%3Crect x='160' y='110' width='80' height='8' fill='%2393c5fd'/%3E%3Ccircle cx='170' cy='70' r='6' fill='%23ef4444'/%3E%3Cpath d='M120 220h160' stroke='%236b7280' stroke-width='2'/%3E%3C/svg%3E" 
                alt="Property dispute house"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-orange-400 mb-2">
                <span>20 Sep 2023</span>
                <span className="mx-2">•</span>
                <span>Property Law</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                What to Do If You're Facing a Property Dispute
              </h3>
            </div>
          </div>

          {/* Blog Card 4 */}
          <div ref={addToRefs} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23fef3c7'/%3E%3Ccircle cx='200' cy='100' r='40' fill='%23d97706'/%3E%3Crect x='160' y='140' width='80' height='10' fill='%23b45309'/%3E%3Cpath d='M120 200 L200 180 L280 200' stroke='%236b7280' stroke-width='3' fill='none'/%3E%3C/svg%3E" 
                alt="Divorce legal advice"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-orange-400 mb-2">
                <span>15 Sep 2023</span>
                <span className="mx-2">•</span>
                <span>Divorce Law</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Navigating Divorce: Legal Advice for a Smooth Process
              </h3>
            </div>
          </div>

          {/* Blog Card 5 */}
          <div ref={addToRefs} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ccircle cx='150' cy='120' r='30' fill='%236b7280'/%3E%3Ccircle cx='250' cy='120' r='30' fill='%236b7280'/%3E%3Cpath d='M170 140 Q200 160 230 140' stroke='%23374151' stroke-width='3' fill='none'/%3E%3Crect x='180' y='180' width='40' height='60' fill='%239ca3af'/%3E%3C/svg%3E" 
                alt="Contract agreements handshake"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-orange-400 mb-2">
                <span>12 Sep 2023</span>
                <span className="mx-2">•</span>
                <span>Contract Law</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Top 3 Mistakes to Avoid in Contract Agreements
              </h3>
            </div>
          </div>

          {/* Blog Card 6 */}
          <div ref={addToRefs} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f8fafc'/%3E%3Cpath d='M200 50 L220 120 L180 120 Z' fill='%23374151'/%3E%3Crect x='190' y='120' width='20' height='100' fill='%234b5563'/%3E%3Ccircle cx='200' cy='240' r='20' fill='%236b7280'/%3E%3Cpath d='M150 260h100' stroke='%239ca3af' stroke-width='4'/%3E%3C/svg%3E" 
                alt="Intellectual property law scales of justice"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-orange-400 mb-2">
                <span>08 Sep 2023</span>
                <span className="mx-2">•</span>
                <span>Property Law</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Recent Changes in Intellectual Property Law: What You Need to Know
              </h3>
            </div>
          </div>
        </div>

        {/* See More Button */}
        <div className="text-center" onClick={()=>{navigate('/blog')}}>
          <button className="bg-orange-400 cursor-pointer hover:bg-orange-500 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;