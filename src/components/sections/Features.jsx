import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiGrid, FiMapPin, FiGift } = FiIcons;

const features = [
  {
    icon: FiGrid,
    title: 'Multi-Tenant Support',
    description: 'Empower multiple restaurants to manage their menus, orders, and profiles under one unified platform effortlessly.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FiMapPin,
    title: 'Real-Time Tracking',
    description: 'Keep customers informed with live GPS tracking of their orders from the kitchen to their doorstep.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: FiGift,
    title: 'Loyalty & Rewards',
    description: 'Boost customer retention with built-in loyalty programs, points, and automated reward systems.',
    color: 'bg-green-100 text-green-600',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-2">Why Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Run Your Delivery Business</h3>
          <p className="text-lg text-gray-600">
            Our platform provides a comprehensive suite of tools designed to streamline operations and enhance the customer experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                <SafeIcon icon={feature.icon} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;