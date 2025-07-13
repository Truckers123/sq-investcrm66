/**
 * Smart Recommendations panel with AI-like suggestions
 * Provides actionable insights and next best actions
 */

import React, { useState, useEffect } from 'react';
import { Brain, ArrowRight, Clock, TrendingUp, Users, Bell, Lightbulb, Target } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'urgent' | 'opportunity' | 'optimization' | 'insight';
  title: string;
  description: string;
  action: string;
  priority: number;
  impact: 'high' | 'medium' | 'low';
  timeToComplete: string;
  icon: React.ComponentType<any>;
}

/**
 * Smart Recommendations component displaying AI-powered insights
 */
const SmartRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'urgent' | 'opportunities'>('all');

  useEffect(() => {
    // Simulate smart recommendations based on current data
    const smartRecommendations: Recommendation[] = [
      {
        id: 'urgent-followup',
        type: 'urgent',
        title: 'High-Value Lead Needs Attention',
        description: 'Emma Davies (£300K deal) hasn\'t been contacted in 48 hours',
        action: 'Schedule call',
        priority: 10,
        impact: 'high',
        timeToComplete: '15 min',
        icon: Bell
      },
      {
        id: 'conversion-opportunity',
        type: 'opportunity',
        title: 'Warm Lead Ready for Proposal',
        description: 'Michael Roberts has viewed materials 5 times this week',
        action: 'Send proposal',
        priority: 8,
        impact: 'high',
        timeToComplete: '30 min',
        icon: TrendingUp
      },
      {
        id: 'team-optimization',
        type: 'optimization',
        title: 'Team Performance Opportunity',
        description: 'Commercial team conversion rate is 15% below target',
        action: 'Review training',
        priority: 6,
        impact: 'medium',
        timeToComplete: '45 min',
        icon: Users
      },
      {
        id: 'market-insight',
        type: 'insight',
        title: 'Market Trend Alert',
        description: 'Property bonds showing 23% increase in enquiries',
        action: 'Update marketing',
        priority: 5,
        impact: 'medium',
        timeToComplete: '20 min',
        icon: Lightbulb
      }
    ];
    
    setRecommendations(smartRecommendations);
  }, []);

  const filteredRecommendations = recommendations.filter(rec => {
    if (activeTab === 'urgent') return rec.type === 'urgent';
    if (activeTab === 'opportunities') return rec.type === 'opportunity';
    return true;
  }).sort((a, b) => b.priority - a.priority);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'opportunity':
        return 'bg-green-100 text-green-800';
      case 'optimization':
        return 'bg-blue-100 text-blue-800';
      case 'insight':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Smart Recommendations</h2>
            <p className="text-sm text-gray-600">AI-powered insights</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-purple-100 text-purple-800'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('urgent')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'urgent'
              ? 'bg-red-100 text-red-800'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Urgent
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'opportunities'
              ? 'bg-green-100 text-green-800'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Opportunities
        </button>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map((rec) => {
          const IconComponent = rec.icon;
          return (
            <div
              key={rec.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-gray-600 mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{rec.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(rec.type)}`}>
                        {rec.type}
                      </span>
                      <span className={`text-xs font-medium ${getImpactColor(rec.impact)}`}>
                        {rec.impact} impact
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{rec.timeToComplete}</span>
                    </div>
                    <button className="inline-flex items-center px-3 py-1 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
                      {rec.action}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No recommendations available</p>
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;
