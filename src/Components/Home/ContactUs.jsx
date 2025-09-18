import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactUs = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    // GSAP scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate form from left
            const formElements = formRef.current?.children;
            if (formElements) {
              Array.from(formElements).forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateX(-50px)';
                element.style.transition = `all 0.6s ease ${index * 0.1}s`;

                setTimeout(() => {
                  element.style.opacity = '1';
                  element.style.transform = 'translateX(0)';
                }, 100);
              });
            }

            // Animate contact info from right
            const contactElements = contactInfoRef.current?.children;
            if (contactElements) {
              Array.from(contactElements).forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateX(50px)';
                element.style.transition = `all 0.6s ease ${index * 0.15 + 0.2}s`;

                setTimeout(() => {
                  element.style.opacity = '1';
                  element.style.transform = 'translateX(0)';
                }, 100);
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full px-3 md:px-28 mx-auto flex flex-col py-16 bg-gray-50">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row  items-center">

        <div className="md:mb-12">
          <p className="text-amber-500 text-3xl md:text-4xl font-bold font-inria mb-4 text-center md:text-start w-full">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight max-w-2xl text-center md:text-start">
            We're always on the lookout to work with new clients. Please get in touch in one of the following ways.
          </h1>
        </div>
        <svg width="382" height="200" viewBox="0 0 382 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 6.61111C13.6667 -0.87037 26.3333 -0.87037 39 6.61111C51.6667 14.0926 64.3333 14.0926 77 6.61111C89.6667 -0.87037 102.333 -0.87037 115 6.61111C127.667 14.0926 140.333 14.0926 153 6.61111C165.667 -0.87037 178.333 -0.87037 191 6.61111C203.667 14.0926 216.333 14.0926 229 6.61111C241.667 -0.87037 254.333 -0.87037 267 6.61111C279.667 14.0926 292.333 14.0926 305 6.61111C317.667 -0.87037 330.333 -0.87037 343 6.61111C355.667 14.0926 368.333 14.0926 381 6.61111" stroke="#3A3A3A" stroke-opacity="0.1" />
          <path d="M1 24.5667C13.6667 17.0852 26.3333 17.0852 39 24.5667C51.6667 32.0482 64.3333 32.0482 77 24.5667C89.6667 17.0852 102.333 17.0852 115 24.5667C127.667 32.0482 140.333 32.0482 153 24.5667C165.667 17.0852 178.333 17.0852 191 24.5667C203.667 32.0482 216.333 32.0482 229 24.5667C241.667 17.0852 254.333 17.0852 267 24.5667C279.667 32.0482 292.333 32.0482 305 24.5667C317.667 17.0852 330.333 17.0852 343 24.5667C355.667 32.0482 368.333 32.0482 381 24.5667" stroke="#3A3A3A" stroke-opacity="0.1" />
          <path d="M1 42.5222C13.6667 35.0408 26.3333 35.0408 39 42.5222C51.6667 50.0037 64.3333 50.0037 77 42.5222C89.6667 35.0408 102.333 35.0408 115 42.5222C127.667 50.0037 140.333 50.0037 153 42.5222C165.667 35.0408 178.333 35.0408 191 42.5222C203.667 50.0037 216.333 50.0037 229 42.5222C241.667 35.0408 254.333 35.0408 267 42.5222C279.667 50.0037 292.333 50.0037 305 42.5222C317.667 35.0408 330.333 35.0408 343 42.5222C355.667 50.0037 368.333 50.0037 381 42.5222" stroke="#3A3A3A" stroke-opacity="0.1" />
          <path d="M1 60.4778C13.6667 52.9963 26.3333 52.9963 39 60.4778C51.6667 67.9593 64.3333 67.9593 77 60.4778C89.6667 52.9963 102.333 52.9963 115 60.4778C127.667 67.9593 140.333 67.9593 153 60.4778C165.667 52.9963 178.333 52.9963 191 60.4778C203.667 67.9593 216.333 67.9593 229 60.4778C241.667 52.9963 254.333 52.9963 267 60.4778C279.667 67.9593 292.333 67.9593 305 60.4778C317.667 52.9963 330.333 52.9963 343 60.4778C355.667 67.9593 368.333 67.9593 381 60.4778" stroke="#3A3A3A" stroke-opacity="0.1" />
          <path d="M1 78.4334C13.6667 70.9519 26.3333 70.9519 39 78.4334C51.6667 85.9149 64.3333 85.9149 77 78.4334C89.6667 70.9519 102.333 70.9519 115 78.4334C127.667 85.9149 140.333 85.9149 153 78.4334C165.667 70.9519 178.333 70.9519 191 78.4334C203.667 85.9149 216.333 85.9149 229 78.4334C241.667 70.9519 254.333 70.9519 267 78.4334C279.667 85.9149 292.333 85.9149 305 78.4334C317.667 70.9519 330.333 70.9519 343 78.4334C355.667 85.9149 368.333 85.9149 381 78.4334" stroke="#3A3A3A" stroke-opacity="0.1" />
          <path d="M1 96.3889C13.6667 88.9075 26.3333 88.9075 39 96.3889C51.6667 103.87 64.3333 103.87 77 96.3889C89.6667 88.9075 102.333 88.9075 115 96.3889C127.667 103.87 140.333 103.87 153 96.3889C165.667 88.9075 178.333 88.9075 191 96.3889C203.667 103.87 216.333 103.87 229 96.3889C241.667 88.9075 254.333 88.9075 267 96.3889C279.667 103.87 292.333 103.87 305 96.3889C317.667 88.9075 330.333 88.9075 343 96.3889C355.667 103.87 368.333 103.87 381 96.3889" stroke="#3A3A3A" stroke-opacity="0.1" />
        </svg>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-2">
        {/* Contact Form */}
        <div ref={formRef} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 transition-colors duration-200"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-0 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-6 pr-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inria">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-0 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  className="w-full pl-6 pr-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 transition-colors duration-200"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 resize-none transition-colors duration-200"
            />
          </div>

          <button
            // ref={buttonRef}
            className="px-6 cursor-pointer py-4 w-full bg-amber-500 hover:bg-amber-600 shadow-md transition-all duration-300 transform hover:scale-105  sm:w-auto text-center"
          >
            <span className="text-black w-full text-xl md:text-2xl font-normal font-inria cursor-pointer">
              Send Message
            </span>
          </button>
        </div>

        {/* Contact Information */}
        <div ref={contactInfoRef} className="space-y-8">
          {/* Office */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Office</h3>
            </div>
            <p className="text-gray-600 ml-11">Please visit us to have a discussion.</p>
            <p className="text-gray-500 ml-11 text-sm">
            C-22, Sammilani Park Rd, near Satyajit Ray Metro Station Road, near Hiland Park, Survey Park, Santoshpur, Kolkata, West Bengal 700075
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
            </div>
            <p className="text-gray-600 ml-11">Please speak with us directly.</p>
            <p className="text-gray-900 ml-11 font-medium">91 70610 34958</p>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
            </div>
            <p className="text-gray-600 ml-11">Please write to us directly.</p>
            <p className="text-gray-900 ml-11 font-medium">contact@ipgyan.com</p>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Opening Hours</h3>
            </div>
            <p className="text-gray-600 ml-11">Explore our business opening hours.</p>
            <div className="ml-11 space-y-1">
              <div className="flex gap-5 text-sm">
                <span className="text-gray-600">Mon - Sat</span>
                <span className="text-gray-900">10am - 8pm</span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sat - Sun</span>
                <span className="text-gray-900">9am - 2pm</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;