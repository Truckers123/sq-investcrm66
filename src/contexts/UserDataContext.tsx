/**
 * User data context for managing application data and state
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'new' | 'warm' | 'hot' | 'client' | 'past';
  priority: 'low' | 'medium' | 'high';
  investmentType: string;
  budget: string;
  leadScore: number;
  lastContact: string;
  notes: string;
  avatar?: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
  read: boolean;
}

interface SystemUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  department: string;
  accessLevel: 'board' | 'management' | 'sales' | 'administration' | 'technical_operations';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  canDelete: boolean;
  requiresTwoFA: boolean;
  avatar?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  contactId?: string;
  createdBy: string;
  createdAt: Date;
}

interface Activity {
  id: string;
  type: 'lead' | 'meeting' | 'proposal' | 'call' | 'email';
  title: string;
  description: string;
  timestamp: Date;
  contactId?: string;
  userId: string;
}

interface InvestmentType {
  id: string;
  name: string;
  description: string;
  averageReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  minimumInvestment: number;
  category: string;
}

interface UserDataContextType {
  contacts: Contact[];
  messages: Message[];
  systemUsers: SystemUser[];
  tasks: Task[];
  activities: Activity[];
  investmentTypes: InvestmentType[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  markMessageAsRead: (messageId: string) => void;
  getConversation: (userId1: string, userId2: string) => Message[];
  updateSystemUser: (user: SystemUser) => void;
  deleteSystemUser: (userId: string) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    {
      id: '1',
      username: 'truckers',
      name: 'Alex "Big Truck" Foster',
      email: 'truckers@sqproperty.com',
      role: 'Managing Director',
      department: 'Management',
      accessLevel: 'board',
      status: 'active',
      lastLogin: '2025-07-13 03:45:00',
      createdAt: '2025-06-01 09:00:00',
      permissions: ['all_access', 'admin', 'reports', 'deals', 'contacts', 'analytics'],
      canDelete: true,
      requiresTwoFA: false
    },
    {
      id: '2',
      username: 'squire',
      name: 'Charles "Squire" Sinclair',
      email: 'charles@sqproperty.com',
      role: 'Senior Investment Director',
      department: 'Sales',
      accessLevel: 'management',
      status: 'active',
      lastLogin: '2025-07-12 18:20:00',
      createdAt: '2025-06-01 09:00:00',
      permissions: ['deals', 'contacts', 'reports'],
      canDelete: false,
      requiresTwoFA: true
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Emma Davies',
      email: 'emma.davies@email.com',
      phone: '+44 20 7123 4567',
      company: 'Davies Holdings',
      status: 'new',
      priority: 'medium',
      investmentType: 'Residential Property Investment',
      budget: '£150K - £300K',
      leadScore: 65,
      lastContact: '2025-01-10',
      notes: 'Interested in residential property investment in London area'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activities, setActivities] = useState<Activity[]>([]);

  const [investmentTypes, setInvestmentTypes] = useState<InvestmentType[]>([
    {
      id: '1',
      name: 'Residential Property Investment',
      description: 'Buy-to-let residential properties',
      averageReturn: 8.5,
      riskLevel: 'medium',
      minimumInvestment: 150000,
      category: 'Property'
    }
  ]);

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      id: Date.now().toString(),
      ...contact
    };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const sendMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...message
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const getConversation = (userId1: string, userId2: string) => {
    return messages.filter(msg => 
      (msg.senderId === userId1 && msg.receiverId === userId2) ||
      (msg.senderId === userId2 && msg.receiverId === userId1)
    );
  };

  const updateSystemUser = (user: SystemUser) => {
    setSystemUsers(prev => prev.map(u => u.id === user.id ? user : u));
  };

  const deleteSystemUser = (userId: string) => {
    setSystemUsers(prev => prev.filter(u => u.id !== userId));
  };

  const value = {
    contacts,
    messages,
    systemUsers,
    tasks,
    activities,
    investmentTypes,
    addContact,
    updateContact,
    deleteContact,
    sendMessage,
    markMessageAsRead,
    getConversation,
    updateSystemUser,
    deleteSystemUser
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
