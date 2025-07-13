/**
 * PropertyTypes component displaying investment categories
 */
import React from 'react';
import { Building, GraduationCap, Heart, Briefcase, Home, TrendingUp } from 'lucide-react';

const PropertyTypes: React.FC = () => {
  const propertyTypes = [
    {
      id: 1,
      name: 'Off-Plan Property',
      count: 8,
      description: 'Invest early in developments still under construction',
      icon: Building,
      color: 'blue',
      roi: '23.5%'
    },
    {
      id: 2,
      name: 'Student Property',
      count: 6,
      description: 'Target high-demand rental markets in university cities',
      icon: GraduationCap,
      color: 'green',
      roi: '21.3%'
    },
    {
      id: 3,
      name: 'Commercial Property',
      count: 12,
      description: 'Own income-generating office spaces and retail units',
      icon: Briefcase,
      color: 'purple',
      roi: '18.2%'
    },
    {
      id: 4,
      name: 'Residential Property',
      count: 15,
      description: 'Invest in properties for long-term rental or sale',
      icon: Home,
      color: 'orange',
      roi: '15.8%'
    },
    {
      id: 5,
      name: 'Assisted Living',
      count: 4,
      description: 'Properties designed for elderly or disabled tenants',
      icon: Heart,
      color: 'teal',
      roi: '19.7%'
    },
    {
      id: 6,
      name: 'Property Bonds',
      count: 2,
      description: 'Fixed-term investment bonds backed by property',
      icon: TrendingUp,
      color: 'indigo',
      roi: '12.5%'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      green: 'bg-green-50 border-green-200 hover:bg-green-100',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      teal: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
      indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      teal: 'text-teal-600',
      indigo: 'text-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Investment Types</h2>
          <p className="text-sm text-gray-600">Property investment opportunities</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {propertyTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${getColorClasses(type.color)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${getIconColor(type.color)}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{type.name}</h3>
                    <p className="text-2xl font-bold text-gray-900">{type.count}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">ROI</p>
                  <p className="text-sm font-semibold text-green-600">{type.roi}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyTypes;