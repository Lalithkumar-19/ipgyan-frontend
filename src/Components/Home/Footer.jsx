import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Brand and Info */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-sm">⚖</span>
              </div> */}
              <span className="text-xl font-semibold">IPGYAN</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              We believe everyone deserves qualified legal assistance and unwavering support to protect their rights and navigate justice & beyond.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a target='_blank' href='https://www.facebook.com/ipgyan'  className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer">
                <Facebook size={16} className="text-slate-800" />
              </a>
              {/* <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer">
                <Twitter size={16} className="text-slate-800" />
              </div> */}
              <a href='https://in.linkedin.com/company/ipgyan' target='_blank' className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer">
                <Linkedin size={16} className="text-slate-800" />
              </a>
              <a href='https://www.instagram.com/ipgyan/' target='_blank' className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer">
                <Instagram size={16} className="text-slate-800" />
              </a>
            </div>
            
            {/* Open Hours */}
            <div>
              <h3 className="text-yellow-500 font-semibold mb-2">Open hour's</h3>
              <p className="text-gray-300 text-sm">Monday - Saturday: 10:00 AM - 8:00 PM</p>
            </div>
          </div>
          
          {/* Middle Column - Contact Us */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-slate-800 text-xs">📞</span>
                </div>
                <div className="text-sm">
                  <p className="text-white">+91 70610 34958</p>
                  {/* <p className="text-gray-300">+001(23)456</p> */}
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-slate-800 text-xs">✉</span>
                </div>
                <div className="text-sm">
                  <p className="text-white">contact@ipgyan.com</p>
                  <p className="text-gray-300">shail@ipgyan.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-slate-800 text-xs">📍</span>
                </div>
                <div className="text-sm">
                  <p className="text-white">C-22, Sammilani Park Rd, near Satyajit Ray Metro Station Road, near Hiland Park, Survey Park, Santoshpur, Kolkata</p>
                  <p className="text-gray-300">West Bengal 700075</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors text-sm flex items-center">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full mr-3"></span>
                  Intellectual Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors text-sm flex items-center">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full mr-3"></span>
                  Media and Entertainment
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors text-sm flex items-center">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full mr-3"></span>
                  Technology Law
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors text-sm flex items-center">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full mr-3"></span>
                  Business Audit & Corporate Advisory
                </a>
              </li>
             
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2025 IPGYAN , All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="https://www.onlyusmedia.in" target='_blank' className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Designed & developed by Onlyusmedia.in</a>
              {/* <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Terms of Use</a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;