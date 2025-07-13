/**
 * Mock data for the Property Investment CRM system
 */

import { Contact, Deal, InvestmentType, SalesAgent, ActivityItem, Task, DashboardMetrics } from '../types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Davies',
    email: 'emma.davies@gmail.com',
    phone: '+44 7700 456789',
    company: '',
    status: 'new',
    priority: 'medium',
    leadScore: 65,
    source: 'Property Portal',
    preferredContact: 'phone',
    investmentType: 'Residential Property Investment',
    investmentRange: '£150K - £300K',
    notes: 'First-time property investor. Interested in residential buy-to-let. Needs guidance on the process. Very keen to learn.',
    createdAt: new Date('2025-07-08'),
    updatedAt: new Date('2025-07-10')
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Roberts',
    email: 'michael.roberts@email.com',
    phone: '+44 7700 567890',
    company: 'Roberts Holdings',
    status: 'warm',
    priority: 'medium',
    leadScore: 72,
    source: 'Referral',
    preferredContact: 'email',
    investmentType: 'Property Bonds',
    investmentRange: '£250K - £500K',
    notes: 'Experienced investor looking for bond opportunities.',
    createdAt: new Date('2025-07-07'),
    updatedAt: new Date('2025-07-09')
  },
  {
    id: '3',
    firstName: 'James',
    lastName: 'Anderson',
    email: 'james.anderson@email.com',
    phone: '+44 7700 678901',
    company: 'Anderson Investments',
    status: 'hot',
    priority: 'high',
    leadScore: 95,
    source: 'Website',
    preferredContact: 'phone',
    investmentType: 'Off-Plan Property Investment',
    investmentRange: '£1.5M - £2.5M',
    notes: 'High-value client interested in off-plan developments.',
    createdAt: new Date('2025-07-06'),
    updatedAt: new Date('2025-07-10')
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Thompson',
    email: 'sarah.thompson@email.com',
    phone: '+44 7700 789012',
    company: 'Thompson Capital',
    status: 'client',
    priority: 'high',
    leadScore: 88,
    source: 'LinkedIn',
    preferredContact: 'email',
    investmentType: 'Commercial Property Investment',
    investmentRange: '£500K - £1M',
    notes: 'Established client with multiple commercial properties.',
    createdAt: new Date('2025-06-15'),
    updatedAt: new Date('2025-07-08')
  }
];

export const mockInvestmentTypes: InvestmentType[] = [
  {
    id: '1',
    name: 'Off-Plan Property Investment',
    description: 'Invest early in developments still under construction or planning to maximize potential returns.',
    totalValue: 1200000,
    totalDeals: 8,
    roi: 23.5,
    leads: 18,
    deals: 3
  },
  {
    id: '2',
    name: 'Student Property Investment',
    description: 'Target high-demand rental markets in established university cities.',
    totalValue: 720000,
    totalDeals: 6,
    roi: 21.3,
    leads: 25,
    deals: 5
  },
  {
    id: '3',
    name: 'Assisted Living Property Investment',
    description: 'Investing in properties designed for elderly or disabled tenants.',
    totalValue: 640000,
    totalDeals: 4,
    roi: 19.7,
    leads: 28,
    deals: 6
  },
  {
    id: '4',
    name: 'Commercial Property Investment',
    description: 'Own income-generating office spaces, retail units, and industrial buildings with business tenants.',
    totalValue: 2400000,
    totalDeals: 12,
    roi: 18.2,
    leads: 22,
    deals: 4
  },
  {
    id: '5',
    name: 'Residential Property Investment',
    description: 'Invest in properties for long-term rental or sale, offering steady returns and potential for capital growth.',
    totalValue: 1800000,
    totalDeals: 15,
    roi: 15.8,
    leads: 19,
    deals: 2
  },
  {
    id: '6',
    name: 'Property Bonds',
    description: 'Secure investment products backed by property assets.',
    totalValue: 400000,
    totalDeals: 2,
    roi: 12.5,
    leads: 23,
    deals: 3
  }
];

export const mockSalesAgents: SalesAgent[] = [
  {
    id: '1',
    name: 'Truckers',
    avatar: '/api/placeholder/40/40',
    deals: 8,
    revenue: 1450000,
    conversion: 62,
    thisMonth: 2,
    rank: 1,
    isChampion: true
  },
  {
    id: '2',
    name: 'Squire',
    avatar: '/api/placeholder/40/40',
    deals: 6,
    revenue: 980000,
    conversion: 48,
    thisMonth: 1,
    rank: 2,
    isChampion: false
  },
  {
    id: '3',
    name: 'M1',
    avatar: '/api/placeholder/40/40',
    deals: 4,
    revenue: 750000,
    conversion: 35,
    thisMonth: 0,
    rank: 3,
    isChampion: false
  }
];

export const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'lead',
    title: 'New lead added',
    description: 'James Anderson',
    user: 'System',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    type: 'task',
    title: 'Task completed',
    description: 'CRM configuration',
    user: 'Admin',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Meeting scheduled',
    description: 'Sarah Thompson',
    user: 'Truckers',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: '4',
    type: 'proposal',
    title: 'Proposal sent',
    description: 'Michael Roberts',
    user: 'Squire',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete website design',
    assignee: 'Truckers',
    dueDate: new Date('2025-07-12'),
    priority: 'high',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Finalize bond brochures',
    assignee: 'Squire',
    dueDate: new Date('2025-07-11'),
    priority: 'high',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Setup Mailchimp campaigns',
    assignee: 'M1',
    dueDate: new Date('2025-07-13'),
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Open business bank accounts',
    assignee: 'Ed',
    dueDate: new Date('2025-07-11'),
    priority: 'high',
    status: 'pending'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalContacts: 47,
  activeLeads: 23,
  clients: 12,
  conversionRate: 51,
  pipelineValue: 1250000,
  teamPerformance: 94,
  responseTime: 2.3,
  avgLeadScore: 80,
  monthlyRevenue: 450000,
  dealsClosedThisMonth: 3
};
