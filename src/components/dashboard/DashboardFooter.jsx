import React from 'react';

const DashboardFooter = () => {
  return (
    <footer className="px-6 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mt-auto bg-white/50 backdrop-blur-sm">
      <p>&copy; {new Date().getFullYear()} Feastly Platform. All rights reserved.</p>
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-orange-600 transition-colors">Support</a>
      </div>
    </footer>
  );
};

export default DashboardFooter;