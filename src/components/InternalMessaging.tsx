/**
 * Internal messaging system component for team communication
 */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, Search, Phone, Video, MoreVertical, Plus, Users, Hash, Bell, Circle } from 'lucide-react';
import { useUserData } from '../contexts/UserDataContext';
import { useAuth } from '../contexts/AuthContext';

// Message interface definition
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  channel: string;
  type: 'text' | 'system';
}

// Channel interface definition
interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  participants: string[];
  unreadCount: number;
  lastMessage?: string;
  lastActivity: string;
}

/**
 * Internal messaging system with user integration
 */
export default function InternalMessaging() {
  const { users } = useUserData();
  const { user: currentUser } = useAuth();
  const [activeChannel, setActiveChannel] = useState('general');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Create channels from system users
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize channels and messages when users data is available
  useEffect(() => {
    if (users.length > 0) {
      // Create system channels
      const systemChannels: Channel[] = [
        {
          id: 'general',
          name: 'General',
          type: 'channel',
          participants: users.map(u => u.id),
          unreadCount: 2,
          lastMessage: 'Welcome to the team chat!',
          lastActivity: '2 min ago'
        },
        {
          id: 'sales-team',
          name: 'Sales Team',
          type: 'channel',
          participants: users.filter(u => u.department === 'Sales' || u.role.includes('Sales')).map(u => u.id),
          unreadCount: 5,
          lastMessage: 'Great month everyone! Lead quality is up 30%',
          lastActivity: '5 min ago'
        },
        {
          id: 'management',
          name: 'Management',
          type: 'channel',
          participants: users.filter(u => u.accessLevel === 'board' || u.role.includes('Director') || u.role.includes('Manager')).map(u => u.id),
          unreadCount: 1,
          lastMessage: 'Q4 planning meeting scheduled for Friday',
          lastActivity: '15 min ago'
        }
      ];

      // Create DM channels for all users
      const dmChannels: Channel[] = users
        .filter(u => u.id !== currentUser?.id)
        .map(user => ({
          id: `dm-${user.id}`,
          name: user.name,
          type: 'dm' as const,
          participants: [currentUser?.id || '', user.id],
          unreadCount: Math.floor(Math.random() * 3),
          lastMessage: generateLastMessage(user.name),
          lastActivity: generateLastActivity()
        }));

      setChannels([...systemChannels, ...dmChannels]);

      // Generate sample messages
      const sampleMessages: Message[] = [
        {
          id: '1',
          senderId: users[0]?.id || '',
          senderName: users[0]?.name || '',
          content: 'Welcome everyone to our new messaging system! 🎉',
          timestamp: '10:30 AM',
          channel: 'general',
          type: 'text'
        },
        {
          id: '2',
          senderId: users[1]?.id || '',
          senderName: users[1]?.name || '',
          content: 'Great to have this internal communication tool. Much more organized!',
          timestamp: '10:32 AM',
          channel: 'general',
          type: 'text'
        },
        {
          id: '3',
          senderId: users[2]?.id || '',
          senderName: users[2]?.name || '',
          content: 'Lead quality has been fantastic this month. Great work team! 📈',
          timestamp: '11:15 AM',
          channel: 'sales-team',
          type: 'text'
        },
        {
          id: '4',
          senderId: users[0]?.id || '',
          senderName: users[0]?.name || '',
          content: 'Q4 planning meeting scheduled for Friday at 2 PM. Please prepare your reports.',
          timestamp: '2:45 PM',
          channel: 'management',
          type: 'text'
        }
      ];

      setMessages(sampleMessages);
    }
  }, [users, currentUser]);

  /**
   * Generate realistic last message for DM channels
   */
  const generateLastMessage = (userName: string): string => {
    const messages = [
      'Thanks for the update!',
      'Can we schedule a quick call?',
      'Great work on the presentation',
      'See you in the meeting',
      'Perfect, thanks!',
      'Let me know when you\'re available',
      'The client loved the proposal'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  /**
   * Generate realistic last activity time
   */
  const generateLastActivity = (): string => {
    const times = ['1 min ago', '5 min ago', '15 min ago', '1 hour ago', '2 hours ago', '1 day ago'];
    return times[Math.floor(Math.random() * times.length)];
  };

  /**
   * Get user initials for avatar
   */
  const getUserInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  /**
   * Get user by ID
   */
  const getUserById = (id: string) => {
    return users.find(u => u.id === id);
  };

  /**
   * Get user online status
   */
  const getUserStatus = (userId: string): 'online' | 'away' | 'offline' => {
    const statuses = ['online', 'away', 'offline'] as const;
    // Generate consistent status based on user ID
    const hash = userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return statuses[hash % 3];
  };

  /**
   * Filter channels based on search
   */
  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Get messages for active channel
   */
  const activeChannelMessages = messages.filter(msg => msg.channel === activeChannel);

  /**
   * Get active channel info
   */
  const activeChannelInfo = channels.find(c => c.id === activeChannel);

  /**
   * Handle sending message
   */
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: activeChannel,
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    // Update channel last message
    setChannels(prev => prev.map(channel =>
      channel.id === activeChannel
        ? { ...channel, lastMessage: messageInput.trim(), lastActivity: 'now' }
        : channel
    ));
  };

  /**
   * Get status color
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {/* Channel Categories */}
            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">
                Channels
              </h3>
              {filteredChannels
                .filter(channel => channel.type === 'channel')
                .map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full text-left p-2 rounded-lg mb-1 transition-colors ${
                      activeChannel === channel.id
                        ? 'bg-blue-100 text-blue-900'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-2" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm truncate">{channel.name}</span>
                          {channel.unreadCount > 0 && (
                            <Badge variant="secondary" className="ml-2 bg-blue-600 text-white text-xs">
                              {channel.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{channel.lastMessage}</p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>

            {/* Direct Messages */}
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">
                Direct Messages
              </h3>
              {filteredChannels
                .filter(channel => channel.type === 'dm')
                .map((channel) => {
                  const userId = channel.participants.find(p => p !== currentUser?.id);
                  const user = getUserById(userId || '');
                  const status = getUserStatus(userId || '');
                  
                  if (!user) return null;

                  return (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full text-left p-2 rounded-lg mb-1 transition-colors ${
                        activeChannel === channel.id
                          ? 'bg-blue-100 text-blue-900'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm truncate">{user.name}</span>
                            {channel.unreadCount > 0 && (
                              <Badge variant="secondary" className="ml-2 bg-blue-600 text-white text-xs">
                                {channel.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="truncate">{user.role}</span>
                            <span className="mx-1">•</span>
                            <span>{channel.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {activeChannelInfo?.type === 'channel' ? (
                <Hash className="h-5 w-5 text-gray-500 mr-2" />
              ) : (
                <div className="relative mr-3">
                  {(() => {
                    const userId = activeChannelInfo?.participants.find(p => p !== currentUser?.id);
                    const user = getUserById(userId || '');
                    const status = getUserStatus(userId || '');
                    
                    return user ? (
                      <>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(status)}`} />
                      </>
                    ) : null;
                  })()}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900">{activeChannelInfo?.name}</h3>
                {activeChannelInfo?.type === 'channel' ? (
                  <p className="text-sm text-gray-500">{activeChannelInfo.participants.length} members</p>
                ) : (
                  (() => {
                    const userId = activeChannelInfo?.participants.find(p => p !== currentUser?.id);
                    const user = getUserById(userId || '');
                    const status = getUserStatus(userId || '');
                    
                    return user ? (
                      <div className="flex items-center text-sm text-gray-500">
                        <Circle className={`h-2 w-2 mr-1 ${getStatusColor(status)}`} />
                        <span className="capitalize">{status}</span>
                        <span className="mx-1">•</span>
                        <span>{user.role}</span>
                      </div>
                    ) : null;
                  })()
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Users className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {activeChannelMessages.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">No messages yet</div>
                <div className="text-sm text-gray-400">Start a conversation!</div>
              </div>
            ) : (
              activeChannelMessages.map((message) => {
                const sender = getUserById(message.senderId);
                return (
                  <div key={message.id} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                        {getUserInitials(message.senderName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">{message.senderName}</span>
                        {sender && (
                          <Badge variant="outline" className="text-xs">
                            {sender.role}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message ${activeChannelInfo?.name}...`}
              className="flex-1"
            />
            <Button type="submit" disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
