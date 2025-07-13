/**
 * Contacts page component for managing customer relationships and deals
 */
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Plus, Search, Phone, Mail, MapPin, Calendar, TrendingUp, Users, Star, Filter, UserPlus, MessageCircle, FileText, DollarSign } from 'lucide-react';
import Header from '../components/Header';
import ContactModal from '../components/ContactModal';
import { useUserData } from '../contexts/UserDataContext';

// Contact interface definition
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'new_lead' | 'warm_lead' | 'hot_lead' | 'client' | 'past_client';
  priority: 'low' | 'medium' | 'high';
  investmentType: string;
  investmentRange: string;
  leadScore: number;
  lastContact: string;
  notes?: string;
  address?: string;
  source?: string;
  tags: string[];
}

// Deal creation form interface
interface DealForm {
  contactId: string;
  title: string;
  value: string;
  stage: string;
  probability: string;
  expectedCloseDate: string;
  description: string;
  investmentType: string;
  propertyDetails: string;
}

/**
 * Contacts page component with full CRM functionality
 */
export default function Contacts() {
  const { contacts, addContact, updateContact } = useUserData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [investmentTypeFilter, setInvestmentTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'cards' | 'pipeline'>('cards');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDealModal, setShowDealModal] = useState(false);
  const [dealContact, setDealContact] = useState<Contact | null>(null);
  const [dealForm, setDealForm] = useState<DealForm>({
    contactId: '',
    title: '',
    value: '',
    stage: 'prospect',
    probability: '25',
    expectedCloseDate: '',
    description: '',
    investmentType: '',
    propertyDetails: ''
  });
  const [dealSubmitted, setDealSubmitted] = useState(false);

  // Filter contacts based on search and filters
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || contact.priority === priorityFilter;
      const matchesInvestmentType = investmentTypeFilter === 'all' || 
                                   contact.investmentType.toLowerCase().includes(investmentTypeFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesPriority && matchesInvestmentType;
    });
  }, [contacts, searchTerm, statusFilter, priorityFilter, investmentTypeFilter]);

  // Group contacts by status for pipeline view
  const groupedContacts = useMemo(() => {
    const groups = {
      new_lead: filteredContacts.filter(c => c.status === 'new_lead'),
      warm_lead: filteredContacts.filter(c => c.status === 'warm_lead'),
      hot_lead: filteredContacts.filter(c => c.status === 'hot_lead'),
      client: filteredContacts.filter(c => c.status === 'client'),
      past_client: filteredContacts.filter(c => c.status === 'past_client')
    };
    return groups;
  }, [filteredContacts]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const total = contacts.length;
    const activeLeads = contacts.filter(c => ['new_lead', 'warm_lead', 'hot_lead'].includes(c.status)).length;
    const clients = contacts.filter(c => c.status === 'client').length;
    const avgScore = contacts.length > 0 ? Math.round(contacts.reduce((sum, c) => sum + c.leadScore, 0) / contacts.length) : 0;
    const conversion = total > 0 ? Math.round((clients / total) * 100) : 0;
    
    return { total, activeLeads, clients, avgScore, conversion };
  }, [contacts]);

  /**
   * Handle opening deal creation modal
   */
  const handleCreateDeal = (contact: Contact) => {
    setDealContact(contact);
    setDealForm({
      contactId: contact.id,
      title: `${contact.investmentType} Investment - ${contact.name}`,
      value: contact.investmentRange.split(' - ')[0].replace('£', '').replace('K', '000').replace('M', '000000'),
      stage: 'prospect',
      probability: contact.status === 'hot_lead' ? '75' : contact.status === 'warm_lead' ? '50' : '25',
      expectedCloseDate: '',
      description: `Investment opportunity for ${contact.name} in ${contact.investmentType}`,
      investmentType: contact.investmentType,
      propertyDetails: ''
    });
    setShowDealModal(true);
    setDealSubmitted(false);
  };

  /**
   * Handle deal form submission
   */
  const handleDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate deal creation
    console.log('Creating deal:', dealForm);
    
    // Show success state
    setDealSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowDealModal(false);
      setDealSubmitted(false);
      setDealContact(null);
    }, 3000);
  };

  /**
   * Get status badge color
   */
  const getStatusColor = (status: string) => {
    const colors = {
      new_lead: 'bg-blue-100 text-blue-800',
      warm_lead: 'bg-yellow-100 text-yellow-800',
      hot_lead: 'bg-red-100 text-red-800',
      client: 'bg-green-100 text-green-800',
      past_client: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  /**
   * Get priority badge color
   */
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  /**
   * Format status label for display
   */
  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
              <p className="text-gray-600 mt-1">Manage your customer relationships and deals</p>
            </div>
            <Button onClick={() => setShowContactModal(true)} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Active Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeLeads}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Clients</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.clients}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">%</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Conversion</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.conversion}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">⭐</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Avg Lead Score</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new_lead">New Leads</SelectItem>
                    <SelectItem value="warm_lead">Warm Leads</SelectItem>
                    <SelectItem value="hot_lead">Hot Leads</SelectItem>
                    <SelectItem value="client">Clients</SelectItem>
                    <SelectItem value="past_client">Past Clients</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={investmentTypeFilter} onValueChange={setInvestmentTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Investment Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Investment Types</SelectItem>
                    <SelectItem value="residential">Residential Property</SelectItem>
                    <SelectItem value="commercial">Commercial Property</SelectItem>
                    <SelectItem value="off-plan">Off-Plan Property</SelectItem>
                    <SelectItem value="bonds">Property Bonds</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'cards' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('cards')}
                  >
                    Cards
                  </Button>
                  <Button
                    variant={viewMode === 'pipeline' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('pipeline')}
                  >
                    Pipeline
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Display */}
        {viewMode === 'cards' ? (
          /* Cards View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <p className="text-sm text-gray-600">{contact.company}</p>
                    </div>
                    <div className="flex gap-1">
                      <Badge className={getPriorityColor(contact.priority)}>
                        {contact.priority}
                      </Badge>
                      <Badge className={getStatusColor(contact.status)}>
                        {formatStatus(contact.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {contact.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {contact.phone}
                    </div>
                    {contact.address && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {contact.address}
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Investment Type</span>
                        <span className="text-sm text-gray-600">{contact.investmentType}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Investment Range</span>
                        <span className="text-sm text-gray-600">{contact.investmentRange}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Lead Score</span>
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-blue-600">{contact.leadScore}</span>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${contact.leadScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Last Contact</span>
                        <span className="text-sm text-gray-600">{contact.lastContact}</span>
                      </div>
                    </div>

                    {contact.tags && contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {contact.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => handleCreateDeal(contact)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Deal
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedContact(contact);
                          setShowContactModal(true);
                        }}
                        className="flex-1"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Pipeline View */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {Object.entries(groupedContacts).map(([status, contacts]) => (
              <div key={status}>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      {formatStatus(status)}
                      <Badge variant="outline">{contacts.length} contacts</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="space-y-2">
                      {contacts.map((contact) => (
                        <Card key={contact.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{contact.name}</h4>
                              <Badge className={getPriorityColor(contact.priority)} variant="outline">
                                {contact.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">{contact.company}</p>
                            <p className="text-xs text-gray-600">{contact.investmentType}</p>
                            <p className="text-xs font-medium text-blue-600">{contact.investmentRange}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Score: {contact.leadScore}</span>
                              <Button
                                size="sm"
                                onClick={() => handleCreateDeal(contact)}
                                className="text-xs h-6 bg-green-600 hover:bg-green-700"
                              >
                                Deal
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredContacts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center">
                <Users className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button onClick={() => setShowContactModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setSelectedContact(null);
        }}
        contact={selectedContact}
        onSave={(contactData) => {
          if (selectedContact) {
            updateContact(selectedContact.id, contactData);
          } else {
            addContact(contactData);
          }
          setShowContactModal(false);
          setSelectedContact(null);
        }}
      />

      {/* Deal Creation Modal */}
      <Dialog open={showDealModal} onOpenChange={setShowDealModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {dealSubmitted ? 'Deal Created Successfully!' : `Create Deal - ${dealContact?.name}`}
            </DialogTitle>
          </DialogHeader>
          
          {dealSubmitted ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Deal Created Successfully!</h3>
              <p className="text-gray-600 mb-4">The deal has been added to your pipeline.</p>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4 className="font-medium mb-2">Deal Details:</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Title:</span> {dealForm.title}</p>
                  <p><span className="font-medium">Value:</span> £{dealForm.value}</p>
                  <p><span className="font-medium">Stage:</span> {dealForm.stage}</p>
                  <p><span className="font-medium">Probability:</span> {dealForm.probability}%</p>
                  <p><span className="font-medium">Investment Type:</span> {dealForm.investmentType}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDealSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deal-title">Deal Title</Label>
                  <Input
                    id="deal-title"
                    value={dealForm.title}
                    onChange={(e) => setDealForm({...dealForm, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deal-value">Deal Value (£)</Label>
                  <Input
                    id="deal-value"
                    type="number"
                    value={dealForm.value}
                    onChange={(e) => setDealForm({...dealForm, value: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deal-stage">Stage</Label>
                  <Select value={dealForm.stage} onValueChange={(value) => setDealForm({...dealForm, stage: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="qualification">Qualification</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="closing">Closing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deal-probability">Probability (%)</Label>
                  <Select value={dealForm.probability} onValueChange={(value) => setDealForm({...dealForm, probability: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="75">75%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deal-close-date">Expected Close Date</Label>
                  <Input
                    id="deal-close-date"
                    type="date"
                    value={dealForm.expectedCloseDate}
                    onChange={(e) => setDealForm({...dealForm, expectedCloseDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deal-investment-type">Investment Type</Label>
                  <Select value={dealForm.investmentType} onValueChange={(value) => setDealForm({...dealForm, investmentType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential Property Investment">Residential Property</SelectItem>
                      <SelectItem value="Commercial Property Investment">Commercial Property</SelectItem>
                      <SelectItem value="Off-Plan Property Investment">Off-Plan Property</SelectItem>
                      <SelectItem value="Property Bonds">Property Bonds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="deal-property-details">Property Details</Label>
                <Textarea
                  id="deal-property-details"
                  value={dealForm.propertyDetails}
                  onChange={(e) => setDealForm({...dealForm, propertyDetails: e.target.value})}
                  placeholder="Enter property location, specifications, and details..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="deal-description">Deal Description</Label>
                <Textarea
                  id="deal-description"
                  value={dealForm.description}
                  onChange={(e) => setDealForm({...dealForm, description: e.target.value})}
                  placeholder="Describe the investment opportunity..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  Create Deal
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowDealModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
