"use client"
import React, { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('app/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json(); // Parse the JSON response
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        console.error('Server error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-gray-900 to-black rounded-2xl text-white p-8 shadow-xl border border-purple-900/30"
      >
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
          Get In Touch
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-purple-400 font-medium mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="p-3 rounded-xl border-2 border-purple-500/50 bg-gray-900 text-white placeholder-purple-300/50 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-all duration-200"
              type="text"
              placeholder="Enter your first name"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-purple-400 font-medium mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="p-3 rounded-xl border-2 border-purple-500/50 bg-gray-900 text-white placeholder-purple-300/50 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-all duration-200"
              type="text"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-6">
          <div>
            <label className="text-purple-400 font-medium mb-2 block" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2 border-purple-500/50 bg-gray-900 text-white placeholder-purple-300/50 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-all duration-200"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-purple-400 font-medium mb-2 block" htmlFor="phone">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2 border-purple-500/50 bg-gray-900 text-white placeholder-purple-300/50 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-all duration-200"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="text-purple-400 font-medium mb-2 block" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border-2 border-purple-500/50 bg-gray-900 text-white placeholder-purple-300/50 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-all duration-200 min-h-32"
              placeholder="Enter your message"
              rows="4"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3 px-8 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-full shadow-lg hover:from-violet-600 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 font-medium flex items-center gap-2"
          >
            {isSubmitting ? (
              <>Sending...<span className="animate-spin ml-1">⟳</span></>
            ) : (
              <>Send Message <Send size={18} /></>
            )}
          </button>
        </div>

        {submitStatus === "success" && (
          <div className="mt-6 p-3 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-400">
            <Check size={20} />
            <p>Your message has been sent successfully!</p>
          </div>
        )}
        
        {submitStatus === "error" && (
          <div className="mt-6 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400">
            <AlertCircle size={20} />
            <p>Failed to send message. Please try again later.</p>
          </div>
        )}
      </form>
    </div>
  );
}
