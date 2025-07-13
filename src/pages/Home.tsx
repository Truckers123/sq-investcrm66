/**
 * Home page component - Dashboard overview with key metrics and navigation
 */

import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';
import LaunchTimeline from '../components/LaunchTimeline';
import PropertyTypes from '../components/PropertyTypes';
import RecentActivity from '../components/RecentActivity';
import UpcomingTasks from '../components/UpcomingTasks';
import InvestmentTypesSummary from '../components/InvestmentTypesSummary';
import QuickActions from '../components/QuickActions';
import SmartRecommendations from '../components/SmartRecommendations';
import GoalTracker from '../components/GoalTracker';
import PipelineChart from '../components/PipelineChart';
import InternalMessaging from '../components/InternalMessaging';
import { Users, TrendingUp, Target, DollarSign, Building, Calendar, MessageSquare, Phone } from 'lucide-react';

/**
 * Home dashboard component displaying key business metrics and navigation
 */
export default function Home() {
  const { user } = useAuth();
  const { contacts, systemUsers, activities, tasks, investmentTypes } = useUserData();

  // Calculate metrics
  const totalContacts = contacts?.length || 0;
  const activeLeads = contacts?.filter(c => c.status === 'new' || c.status === 'warm' || c.status === 'hot').length || 0;
  const clients = contacts?.filter(c => c.status === 'client').length || 0;
  const conversionRate = totalContacts > 0 ? Math.round((clients / totalContacts) * 100) : 0;
  const avgLeadScore = totalContacts > 0 ? Math.round(contacts?.reduce((sum, c) => sum + c.leadScore, 0) / totalContacts) : 0;

  // Get recent activities and upcoming tasks with fallback data
  const recentActivities = activities?.slice(0, 5) || [
    {
      id: '1',
      type: 'lead',
      title: 'New Lead Added',
      description: 'Emma Davies - Residential Property Investment',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      contactId: '1',
      userId: user?.id || '1'
    },
    {
      id: '2',
      type: 'meeting',
      title: 'Meeting Scheduled',
      description: 'Call with Michael Roberts about Property Bonds',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      contactId: '2',
      userId: user?.id || '1'
    },
    {
      id: '3',
      type: 'proposal',
      title: 'Proposal Sent',
      description: 'Investment proposal sent to James Anderson',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      contactId: '3',
      userId: user?.id || '1'
    }
  ];

  const upcomingTasks = tasks?.filter(t => t.status !== 'completed').slice(0, 5) || [
    {
      id: '1',
      title: 'Follow up with Emma Davies',
      description: 'Discuss residential property investment options',
      assignee: user?.name || 'You',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      priority: 'high' as const,
      status: 'pending' as const,
      contactId: '1',
      createdBy: user?.id || '1',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Prepare proposal for Michael Roberts',
      description: 'Create property bonds investment proposal',
      assignee: user?.name || 'You',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      priority: 'medium' as const,
      status: 'pending' as const,
      contactId: '2',
      createdBy: user?.id || '1',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Schedule meeting with James Anderson',
      description: 'Discuss off-plan investment opportunities',
      assignee: user?.name || 'You',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      priority: 'medium' as const,
      status: 'pending' as const,
      contactId: '3',
      createdBy: user?.id || '1',
      createdAt: new Date()
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Here's your business overview for today
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Contacts"
            value={totalContacts.toString()}
            icon={Users}
            trend="+12% from last month"
            color="blue"
          />
          <MetricCard
            title="Active Leads"
            value={activeLeads.toString()}
            icon={TrendingUp}
            trend="+8% from last week"
            color="green"
          />
          <MetricCard
            title="Clients"
            value={clients.toString()}
            icon={Target}
            trend="+15% from last month"
            color="purple"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={DollarSign}
            trend="+5% from last month"
            color="orange"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Pipeline Chart */}
            <PipelineChart />
            
            {/* Investment Types Summary */}
            <InvestmentTypesSummary investmentTypes={investmentTypes || []} />
            
            {/* Launch Timeline */}
            <LaunchTimeline />
            
            {/* Property Types */}
            <PropertyTypes />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Internal Messaging */}
            <InternalMessaging />
            
            {/* Smart Recommendations */}
            <SmartRecommendations />
            
            {/* Goal Tracker */}
            <GoalTracker />
            
            {/* Recent Activity */}
            <RecentActivity activities={recentActivities} />
            
            {/* Upcoming Tasks */}
            <UpcomingTasks tasks={upcomingTasks} />
          </div>
        </div>

        {/* Additional Status Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">CRM Status</h3>
                <p className="text-sm text-green-600">All systems operational</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Avg Lead Score</h3>
                <p className="text-2xl font-bold text-purple-600">{avgLeadScore}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
                <p className="text-2xl font-bold text-blue-600">{systemUsers?.length || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
