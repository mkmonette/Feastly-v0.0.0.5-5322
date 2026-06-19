import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiCheckCircle } = FiIcons;

const benefits = [
  "Increase daily order volume by 40%",
  "Reduce operational costs with automation",
  "Access detailed analytics and insights",
  "Manage multiple locations from one dashboard"
];

const Benefits = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Grow Your Food Business Online with Powerful Tools
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Stop worrying about the technology and focus on what you do best—making great food. Our dashboard gives you full control over your business performance.
            </p>
            
            <ul className="space-y-4 mb-10">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <SafeIcon icon={FiCheckCircle} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="primary">Explore Dashboard</Button>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Restaurant Dashboard Analytics" 
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Stat */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur px-6 py-4 rounded-xl shadow-lg flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$124,500.00</p>
                </div>
                <div className="text-green-500 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                  +12.5%
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;