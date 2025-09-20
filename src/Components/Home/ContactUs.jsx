import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { api } from '../../utils';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { fullname, email, phone, subject, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

    if (!fullname || !email || !phone || !subject || !message) {
      return 'All fields are required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post('/contact', formData);
      if (response.status === 200) {
        setSuccess('Your message has been sent successfully!');
        // Reset form
        setFormData({
          fullname: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full px-3 md:px-28 mx-auto flex flex-col py-16 bg-gray-50">
      <div className="w-full flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Get in <span className="text-amber-500">Touch</span>
          </h2>
          <p className="text-gray-600">
            Have questions or need assistance? We're here to help! Fill out the form and our team will get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-2 mt-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="px-4 py-3 rounded bg-red-50 text-red-700 border border-red-200 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="px-4 py-3 rounded bg-green-50 text-green-700 border border-green-200 text-sm">
              {success}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 transition-colors duration-200"
              required
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-6 pr-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-0 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-6 pr-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 transition-colors duration-200"
                  required
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
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 transition-colors duration-200"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent focus:border-amber-500 focus:outline-none focus:ring-0 resize-none transition-colors duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-4 w-full bg-amber-500 hover:bg-amber-600 shadow-md transition-all duration-300 transform hover:scale-105 sm:w-auto text-center ${submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            <span className="text-black text-xl md:text-2xl font-normal">
              {submitting ? 'Sending...' : 'Send Message'}
            </span>
          </button>
        </form>

        {/* Contact Information */}
        <div  className="space-y-8">
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