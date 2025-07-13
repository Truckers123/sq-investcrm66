/**
 * Interactive Pipeline Chart showing deal progression and revenue trends
 */

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';

const PipelineChart: React.FC = () => {
  const pipelineData = [
    { month: 'Jan', value: 180, deals: 3, leads: 15 },
    { month: 'Feb', value: 220, deals: 4, leads: 18 },
    { month: 'Mar', value: 350, deals: 6, leads: 22 },
    { month: 'Apr', value: 400, deals: 7, leads: 25 },
    { month: 'May', value: 380, deals: 6, leads: 20 },
    { month: 'Jun', value: 450, deals: 8, leads: 28 },
    { month: 'Jul', value: 520, deals: 9, leads: 32 }
  ];

  const dealStages = [
    { name: 'Initial Contact', value: 45, color: '#3B82F6' },
    { name: 'Qualification', value: 25, color: '#10B981' },
    { name: 'Proposal', value: 15, color: '#F59E0B' },
    { name: 'Negotiation', value: 10, color: '#EF4444' },
    { name: 'Closed Won', value: 5, color: '#8B5CF6' }
  ];

  const conversionData = [
    { stage: 'Leads', count: 150, percentage: 100 },
    { stage: 'Qualified', count: 75, percentage: 50 },
    { stage: 'Proposals', count: 30, percentage: 20 },
    { stage: 'Negotiations', count: 15, percentage: 10 },
    { stage: 'Closed', count: 8, percentage: 5.3 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
          Pipeline Analytics
        </h2>
        <div className="flex space-x-2">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            +15% vs last month
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-500" />
            Revenue Trend (£K)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: any) => [`£${value}K`, 'Pipeline Value']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 6 }}
                  activeDot={{ r: 8, fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deal Stages Distribution */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-500" />
            Deal Stages
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dealStages}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  labelLine={false}
                >
                  {dealStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-500" />
          Conversion Funnel
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {conversionData.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className={`bg-gradient-to-t from-blue-500 to-blue-400 text-white p-4 rounded-lg text-center transform transition-transform hover:scale-105`}>
                <div className="text-2xl font-bold">{stage.count}</div>
                <div className="text-xs opacity-90">{stage.stage}</div>
                <div className="text-xs mt-1 bg-white/20 rounded px-2 py-1">
                  {stage.percentage}%
                </div>
              </div>
              {index < conversionData.length - 1 && (
                <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 text-gray-400">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineChart;
