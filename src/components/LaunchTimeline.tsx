/**
 * Launch Timeline component showing countdown to official launch
 */
import React from 'react';
import { Calendar, Clock, Rocket } from 'lucide-react';

const LaunchTimeline: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Launch Timeline</h2>
            <p className="text-blue-100">Jul 7 - Jul 13, 2025</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-200" />
            <span className="text-lg font-semibold">Official Launch</span>
          </div>
          <p className="text-2xl font-bold">Monday, July 14th</p>
          <p className="text-blue-200">Get ready to launch SQ Property Ventures!</p>
        </div>
      </div>
      
      <div className="mt-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-blue-200" />
          <span className="text-sm text-blue-100">Days until launch</span>
        </div>
        <div className="text-3xl font-bold">4 Days</div>
      </div>
    </div>
  );
};

export default LaunchTimeline;