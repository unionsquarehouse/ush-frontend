"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheck, FaTimes } from "react-icons/fa";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [countryCode, setCountryCode] = useState("971");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone) => {
    if (!phone) return false;
    return phone.length >= 8;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
    setIsPhoneValid(validatePhone(value));
    setFormState(prev => ({ ...prev, phone: `+${countryCode}${value}` }));
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    setFormState(prev => ({ ...prev, phone: `+${e.target.value}${phoneNumber}` }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState({ name: "", email: "", phone: "", message: "" });
        setPhoneNumber("");
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-earth-50 to-earth-100 py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative mb-8">
            <span className="w-24 h-0.5 bg-earth-400 block mx-auto"></span>
            <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-earth-600 block"></span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-earth-800">Get in Touch</h1>
          <p className="text-earth-600 text-xl max-w-2xl mx-auto">
            Ready to find your dream property in Dubai? Contact our expert team today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-8 shadow-lg"
          >
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-green-600 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-earth-800 mb-2">Thank You!</h3>
                <p className="text-earth-600">Your message has been sent successfully. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-earth-800 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-earth-800 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-600 transition-all duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-earth-800 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-600 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-earth-800 text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="flex">
                      <select
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        className="px-3 py-3 bg-earth-100 border border-earth-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-earth-600"
                      >
                        <option value="971">🇦🇪 +971</option>
                        <option value="1">🇺🇸 +1</option>
                        <option value="44">🇬🇧 +44</option>
                        <option value="91">🇮🇳 +91</option>
                        <option value="966">🇸🇦 +966</option>
                      </select>
                      <div className="relative flex-1">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          className={`w-full px-4 py-3 border border-l-0 ${
                            phoneNumber && (isPhoneValid ? "border-green-500" : "border-red-500")
                          } rounded-r-lg focus:outline-none focus:ring-2 focus:ring-earth-600 transition-all duration-300`}
                          placeholder="50 123 4567"
                          required
                        />
                        {phoneNumber && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {isPhoneValid ? (
                              <FaCheck className="h-5 w-5 text-green-500" />
                            ) : (
                              <FaTimes className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-earth-800 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-600 transition-all duration-300"
                      placeholder="Tell us about your property requirements..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-earth-700 hover:bg-earth-800 text-white py-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="grid gap-6">
              {[
                {
                  icon: FaPhone,
                  title: "Call Us",
                  info: "+971 4 458 9090",
                  href: "tel:+97144589090",
                  description: "Available 24/7 for your inquiries"
                },
                {
                  icon: FaEnvelope,
                  title: "Email Us",
                  info: "luxury@ushre.com",
                  href: "mailto:luxury@ushre.com",
                  description: "We'll respond within 24 hours"
                },
                {
                  icon: FaMapMarkerAlt,
                  title: "Visit Us",
                  info: "Business Bay, Dubai",
                  href: "https://maps.google.com",
                  description: "Schedule an appointment"
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target={item.icon === FaMapMarkerAlt ? "_blank" : undefined}
                  className="flex items-start p-6 bg-white rounded-tl-[1.5rem] rounded-br-[1.5rem] shadow-md hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-earth-100 flex items-center justify-center mr-4 group-hover:bg-earth-200 transition-colors duration-300">
                    <item.icon className="text-earth-700 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-earth-800 mb-1">{item.title}</h3>
                    <p className="text-earth-700 font-medium">{item.info}</p>
                    <p className="text-earth-600 text-sm">{item.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Map */}
            <div className="bg-white rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14439.802950726855!2d55.2721253!3d25.1953053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682def25f457%3A0x3dd4c4097f991e80!2sDowntown%20Dubai!5e0!3m2!1sen!2sae!4v1656869056231!5m2!1sen!2sae"
                className="w-full h-80"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
