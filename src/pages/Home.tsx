/**
 * Home page component - Executive dashboard with key business metrics
 * Features comprehensive CRM overview, metrics, and business intelligence
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Bell, Users, BarChart3, TrendingUp, CheckCircle, Clock, Plus, Calendar, FileText, ArrowRight, Activity, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState({
    activeLeads: 23,
    clients: 24,
    pipelineValue: 450,
    teamPerformance: 94,
    conversionRate: 51,
    responseTime: 2.3
  });

  // Real-time updates for metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time metric updates
      setMetrics(prev => ({
        ...prev,
        activeLeads: prev.activeLeads + Math.floor(Math.random() * 3) - 1,
        responseTime: Math.round((prev.responseTime + (Math.random() - 0.5) * 0.1) * 10) / 10
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate days until launch
  const launchDate = new Date('2025-07-14');
  const today = new Date();
  const daysUntilLaunch = Math.ceil((launchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Quick action handlers
  const handleAddNewLead = () => {
    navigate('/contacts');
  };

  const handleCreateTask = () => {
    alert('Task creation feature coming soon!');
  };

  const handleScheduleMeeting = () => {
    alert('Meeting scheduler opening...');
  };

  const handleViewReports = () => {
    alert('Reports dashboard loading...');
  };

  // Navigation handlers for dashboard items
  const handleActivityClick = (activityType: string, contactName?: string) => {
    switch (activityType) {
      case 'lead':
      case 'meeting':
      case 'document':
      case 'email':
        navigate('/contacts');
        break;
      case 'deal':
        navigate('/contacts');
        break;
      default:
        navigate('/contacts');
    }
  };

  const handleTaskClick = (taskType: string, contactName?: string) => {
    if (contactName) {
      navigate('/contacts');
    } else {
      alert(`Opening task: ${taskType}`);
    }
  };

  const handleMetricClick = (metricType: string) => {
    switch (metricType) {
      case 'leads':
      case 'clients':
      case 'pipeline':
      case 'performance':
        navigate('/contacts');
        break;
      default:
        navigate('/contacts');
    }
  };

  const handlePriorityClick = (priorityType: string) => {
    switch (priorityType) {
      case 'follow-ups':
      case 'meetings':
      case 'deals':
        navigate('/contacts');
        break;
      default:
        alert(`Opening ${priorityType} details...`);
    }
  };

  const handleLeaderboardClick = (agentName: string) => {
    navigate('/contacts');
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Here's your real-time dashboard overview
          </p>
        </div>

        {/* Launch Timeline */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Launch Timeline</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Official Launch</h3>
                <p className="text-blue-700">Monday, July 14th</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{daysUntilLaunch} Days</div>
                <p className="text-sm text-blue-600">Until Launch</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            onClick={() => handleMetricClick('leads')}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Active Leads</h3>
                <div className="text-2xl font-bold text-gray-900">{metrics.activeLeads}</div>
                <p className="text-sm text-gray-600">Total leads and clients</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
          </div>
          
          <div 
            onClick={() => handleMetricClick('clients')}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Clients</h3>
                <div className="text-2xl font-bold text-gray-900">{metrics.clients}</div>
                <p className="text-sm text-gray-600">Confirmed clients</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+5%</span>
              </div>
            </div>
          </div>
          
          <div 
            onClick={() => handleMetricClick('pipeline')}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pipeline Value</h3>
                <div className="text-2xl font-bold text-gray-900">£{metrics.pipelineValue}K</div>
                <p className="text-sm text-gray-600">Total pipeline value</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+15%</span>
              </div>
            </div>
          </div>
          
          <div 
            onClick={() => handleMetricClick('performance')}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Team Performance</h3>
                <div className="text-2xl font-bold text-gray-900">{metrics.teamPerformance}%</div>
                <p className="text-sm text-gray-600">Overall team performance</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity Feed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div 
                onClick={() => handleActivityClick('lead', 'Emma Davies')}
                className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">New lead added</p>
                  <p className="text-sm text-gray-600">Emma Davies from Property Portal</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-500" />
              </div>
              <div 
                onClick={() => handleActivityClick('deal', 'James Anderson')}
                className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Deal completed</p>
                  <p className="text-sm text-gray-600">James Anderson - £1.8M off-plan investment</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div 
                onClick={() => handleActivityClick('meeting', 'Sarah Thompson')}
                className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Meeting scheduled</p>
                  <p className="text-sm text-gray-600">Sarah Thompson - Commercial property review</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div 
                onClick={() => handleActivityClick('document', 'Michael Roberts')}
                className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Document uploaded</p>
                  <p className="text-sm text-gray-600">Michael Roberts - Financial statements</p>
                  <p className="text-xs text-gray-500">8 hours ago</p>
                </div>
                <FileText className="w-4 h-4 text-orange-500" />
              </div>
              <div 
                onClick={() => handleActivityClick('email')}
                className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors"
              >
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Email campaign sent</p>
                  <p className="text-sm text-gray-600">Property Bond Newsletter - 124 contacts</p>
                  <p className="text-xs text-gray-500">10 hours ago</p>
                </div>
                <Mail className="w-4 h-4 text-indigo-500" />
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Upcoming Tasks
            </h2>
            <div className="space-y-4">
              <div 
                onClick={() => handleTaskClick('Follow up with Emma Davies', 'Emma Davies')}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200 cursor-pointer hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Follow up with Emma Davies</p>
                    <p className="text-sm text-gray-600">Initial consultation scheduled</p>
                    <p className="text-xs text-gray-500">Due: Today, 2:00 PM</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  urgent
                </span>
              </div>
              <div 
                onClick={() => handleTaskClick('Prepare presentation for James', 'James Anderson')}
                className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Prepare presentation for James</p>
                    <p className="text-sm text-gray-600">Off-plan development portfolio</p>
                    <p className="text-xs text-gray-500">Due: Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  high
                </span>
              </div>
              <div 
                onClick={() => handleTaskClick('Review legal contracts', 'David Wilson')}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Review legal contracts</p>
                    <p className="text-sm text-gray-600">David Wilson - Student property deal</p>
                    <p className="text-xs text-gray-500">Due: Tomorrow, 3:00 PM</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  medium
                </span>
              </div>
              <div 
                onClick={() => handleTaskClick('Weekly team meeting')}
                className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Weekly team meeting</p>
                    <p className="text-sm text-gray-600">Sales performance review</p>
                    <p className="text-xs text-gray-500">Due: Friday, 9:00 AM</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  medium
                </span>
              </div>
              <div 
                onClick={() => handleTaskClick('Update CRM system')}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Update CRM system</p>
                    <p className="text-sm text-gray-600">Import new property listings</p>
                    <p className="text-xs text-gray-500">Due: Next Monday</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  low
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conversion Rate</h3>
            <div className="text-3xl font-bold text-blue-600 mb-1">{metrics.conversionRate}%</div>
            <p className="text-sm text-gray-600">Lead to client conversion</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <div className="text-3xl font-bold text-green-600 mb-1">{metrics.responseTime}h</div>
            <p className="text-sm text-gray-600">Average response time</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CRM Status</h3>
            <div className="text-lg font-bold text-green-600 mb-1">Active</div>
            <p className="text-sm text-gray-600">All systems operational</p>
          </div>
        </div>

        {/* Sales Leaderboard & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Leaderboard</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Truckers</h3>
                    <p className="text-sm text-gray-600">Champion</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">£1,450K</div>
                  <div className="text-sm text-gray-600">8 deals • 62%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Squire</h3>
                    <p className="text-sm text-gray-600">Runner-up</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">£850K</div>
                  <div className="text-sm text-gray-600">6 deals • 48%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">M1</h3>
                    <p className="text-sm text-gray-600">Third Place</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">£620K</div>
                  <div className="text-sm text-gray-600">4 deals • 35%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleAddNewLead}
                className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group"
              >
                <Plus className="w-5 h-5 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-blue-900">Add New Lead</span>
              </button>
              <button 
                onClick={handleCreateTask}
                className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-green-900">Create Task</span>
              </button>
              <button 
                onClick={handleScheduleMeeting}
                className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors group"
              >
                <Calendar className="w-5 h-5 text-purple-600 mr-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-purple-900">Schedule Meeting</span>
              </button>
              <button 
                onClick={handleViewReports}
                className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors group"
              >
                <FileText className="w-5 h-5 text-orange-600 mr-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-orange-900">View Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Today's Priority Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-500" />
            Today's Priority Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => handlePriorityClick('follow-ups')}
              className="bg-red-50 p-4 rounded-lg border border-red-200 cursor-pointer hover:bg-red-100 transition-colors"
            >
              <h3 className="font-medium text-red-900 mb-2">Urgent Follow-ups</h3>
              <p className="text-sm text-red-700">3 leads need immediate attention</p>
              <div className="mt-3">
                <button className="text-xs bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700">
                  View Details
                </button>
              </div>
            </div>
            <div 
              onClick={() => handlePriorityClick('meetings')}
              className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors"
            >
              <h3 className="font-medium text-yellow-900 mb-2">Meetings Today</h3>
              <p className="text-sm text-yellow-700">2 client meetings scheduled</p>
              <div className="mt-3">
                <button className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-full hover:bg-yellow-700">
                  View Calendar
                </button>
              </div>
            </div>
            <div 
              onClick={() => handlePriorityClick('deals')}
              className="bg-green-50 p-4 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
            >
              <h3 className="font-medium text-green-900 mb-2">Deals Closing</h3>
              <p className="text-sm text-green-700">1 deal ready for completion</p>
              <div className="mt-3">
                <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700">
                  Review Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
