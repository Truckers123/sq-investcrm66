/**
 * MetricCard component for displaying key performance indicators
 */
import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    direction: 'up' | 'down';
    percentage: string;
    period: string;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon: Icon, trend }) => {
  const getCardColor = (title: string) => {
    switch (title) {
      case 'Active Leads':
        return 'border-l-4 border-blue-500 bg-blue-50/50';
      case 'Clients':
        return 'border-l-4 border-green-500 bg-green-50/50';
      case 'Pipeline Value':
        return 'border-l-4 border-purple-500 bg-purple-50/50';
      case 'Team Performance':
        return 'border-l-4 border-orange-500 bg-orange-50/50';
      case 'Conversion Rate':
        return 'border-l-4 border-teal-500 bg-teal-50/50';
      case 'Response Time':
        return 'border-l-4 border-indigo-500 bg-indigo-50/50';
      case 'Current Month Revenue':
        return 'border-l-4 border-emerald-500 bg-emerald-50/50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50/50';
    }
  };

  const getIconColor = (title: string) => {
    switch (title) {
      case 'Active Leads':
        return 'text-blue-600';
      case 'Clients':
        return 'text-green-600';
      case 'Pipeline Value':
        return 'text-purple-600';
      case 'Team Performance':
        return 'text-orange-600';
      case 'Conversion Rate':
        return 'text-teal-600';
      case 'Response Time':
        return 'text-indigo-600';
      case 'Current Month Revenue':
        return 'text-emerald-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${getCardColor(title)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${getIconColor(title)}`} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">{subtitle}</p>
        {trend && (
          <div className="flex items-center mt-2">
            {trend.direction === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`ml-1 text-sm font-medium ${
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.percentage}
            </span>
            <span className="ml-1 text-sm text-gray-500">{trend.period}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;