"use client";

import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-earth-800 to-earth-900 text-white">
      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Dubai Property Journey?</h2>
          <p className="text-xl text-earth-100 mb-12 max-w-3xl mx-auto">
            For more information about how we can help you with real estate, please contact one of our 
            advisers with your requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            <motion.a
              href="tel:+97144589090"
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <FaPhone className="text-3xl text-[#ac895e] mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-earth-100 text-lg">+971 4 458 9090</p>
              </div>
            </motion.a>

            <motion.a
              href="mailto:info@ushre.com"
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <FaEnvelope className="text-3xl text-[#ac895e] mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-earth-100 text-lg">info@ushre.com</p>
              </div>
            </motion.a>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-[#ac895e] to-[#876F4E] text-white px-8 py-4 rounded-tl-[2rem] rounded-br-[2rem] font-bold text-lg hover:shadow-lg transition-all duration-300 group"
            >
              Connect with Our Advisers
              <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}