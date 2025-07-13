/**
 * Goal Tracker component with animated progress bars
 * Shows progress towards monthly and quarterly targets
 */

import React from 'react';
import { Target, TrendingUp, Users, DollarSign } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
  deadline: string;
}

const GoalTracker: React.FC = () => {
  const goals: Goal[] = [
    {
      id: 'fresh-leads',
      title: 'Fresh Leads In',
      current: 187,
      target: 300,
      unit: 'leads',
      icon: Users,
      color: 'blue',
      deadline: 'This week'
    },
    {
      id: 'fronts-out',
      title: 'Fronts Out',
      current: 22,
      target: 30,
      unit: 'fronts',
      icon: TrendingUp,
      color: 'purple',
      deadline: 'This week'
    },
    {
      id: 'deals-to-close',
      title: 'Deals to Close',
      current: 18,
      target: 30,
      unit: 'deals',
      icon: Target,
      color: 'orange',
      deadline: 'This week'
    },
    {
      id: 'banked-business',
      title: 'Banked Business',
      current: 720000,
      target: 1000000,
      unit: '£',
      icon: DollarSign,
      color: 'green',
      deadline: 'This month'
    }
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '£') {
      return `£${(value / 1000).toFixed(0)}K`;
    }
    return `${value}${unit === 'leads' || unit === 'deals' || unit === 'fronts' ? '' : unit}`;
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Target className="w-6 h-6 mr-2 text-indigo-600" />
          Goal Tracker
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Live Updates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const percentage = getProgressPercentage(goal.current, goal.target);
          const colors = getColorClasses(goal.color);
          const isOnTrack = percentage >= 75;

          return (
            <div key={goal.id} className="relative">
              <div className={`p-4 rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-all ${colors.light}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                    <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  </div>
                  <span className="text-xs text-gray-500">{goal.deadline}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatValue(goal.current, goal.unit)}
                    </span>
                    <span className="text-sm text-gray-600">
                      / {formatValue(goal.target, goal.unit)}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.bg}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${percentage >= 100 ? 'text-green-600' : colors.text}`}>
                      {percentage.toFixed(1)}% Complete
                    </span>
                    {isOnTrack && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        On Track ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {percentage >= 100 && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalTracker;
