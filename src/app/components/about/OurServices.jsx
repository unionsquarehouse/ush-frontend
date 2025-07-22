"use client";

import { motion } from "framer-motion";
import { FaHome, FaCogs, FaChartLine, FaBullhorn } from "react-icons/fa";

export default function OurServices() {
  const services = [
    {
      icon: FaHome,
      title: "Property Search Support",
      description: "Comprehensive assistance in buying and selling properties",
      color: "from-earth-600 to-earth-700"
    },
    {
      icon: FaCogs,
      title: "Property Management",
      description: "Professional property management through our trusted partners",
      color: "from-earth-700 to-earth-800"
    },
    {
      icon: FaChartLine,
      title: "Investment Advisory",
      description: "Expert real estate investment guidance and market insights",
      color: "from-earth-500 to-earth-600"
    },
    {
      icon: FaBullhorn,
      title: "Property Marketing",
      description: "Strategic property selling and marketing solutions",
      color: "from-earth-800 to-earth-900"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-earth-800 mb-6">Our Services</h2>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            At USHRE, we cater to a wide range of real estate needs. Whether you're looking to invest 
            in a home that suits your tastes and financial goals or a discerned homeowner looking to sell, 
            we have the framework required to bring your dreams to reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-tl-[2rem] rounded-br-[2rem] p-8 shadow-lg border border-earth-200 hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-earth-800 mb-4">{service.title}</h3>
                <p className="text-earth-600 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}