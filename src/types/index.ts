/**
 * Type definitions for the CRM application
 */

export interface ActivityItem {
  id: number;
  type: 'lead' | 'task' | 'meeting' | 'proposal';
  title: string;
  description: string;
  timestamp: Date;
}

export interface Task {
  id: number;
  title: string;
  assignee: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'in-progress';
}

export interface InvestmentType {
  id: number;
  name: string;
  totalDeals: number;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  status: 'lead' | 'client' | 'prospect';
  priority: 'high' | 'medium' | 'low';
  dealSize: string;
  leadScore: number;
  propertyType: string;
  source: string;
  notes: string;
  createdAt: Date;
  lastContact?: Date;
}

export interface Deal {
  id: number;
  clientName: string;
  propertyType: string;
  dealValue: number;
  status: 'active' | 'closed' | 'pending';
  expectedCloseDate: Date;
  probability: number;
}

export interface Team {
  id: number;
  name: string;
  position: string;
  deals: number;
  revenue: number;
  conversion: number;
  performance: number;
}