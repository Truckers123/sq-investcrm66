/**
 * Internal Messaging Component - Team instant messaging system
 * Features real-time messaging, team channels, and direct messages
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Users, Hash, Phone, Video, Paperclip, Smile, MoreVertical, Circle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
  isRead: boolean;
  replyTo?: string;
  attachments?: Attachment[];
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'direct';
  members: string[];
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
}

interface InternalMessagingProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InternalMessaging({ isOpen, onClose }: InternalMessagingProps) {
  const { user } = useAuth();
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [channels] = useState<Channel[]>([
    {
      id: 'general',
      name: 'General',
      type: 'channel',
      members: ['Truckers', 'Squire', 'M1', 'Ed'],
      unreadCount: 0
    },
    {
      id: 'sales',
      name: 'Sales Team',
      type: 'channel',
      members: ['Truckers', 'Squire', 'M1'],
      unreadCount: 2
    },
    {
      id: 'deals',
      name: 'Deals & Closures',
      type: 'channel',
      members: ['Truckers', 'Squire', 'Ed'],
      unreadCount: 1
    },
    {
      id: 'truckers',
      name: 'Truckers',
      type: 'direct',
      members: ['Truckers'],
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 'squire',
      name: 'Squire',
      type: 'direct',
      members: ['Squire'],
      unreadCount: 3,
      isOnline: true
    },
    {
      id: 'm1',
      name: 'M1',
      type: 'direct',
      members: ['M1'],
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 'ed',
      name: 'Ed',
      type: 'direct',
      members: ['Ed'],
      unreadCount: 1,
      isOnline: true
    }
  ]);

  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    general: [
      {
        id: '1',
        senderId: 'truckers',
        senderName: 'Truckers',
        content: 'Good morning team! Ready for another productive day. James Anderson meeting at 10 AM.',
        timestamp: '2025-07-11T08:30:00Z',
        type: 'text',
        isRead: true
      },
      {
        id: '2',
        senderId: 'squire',
        senderName: 'Squire',
        content: 'Morning! I\'ve prepared the property bond presentations for Michael Roberts.',
        timestamp: '2025-07-11T08:45:00Z',
        type: 'text',
        isRead: true
      },
      {
        id: '3',
        senderId: 'system',
        senderName: 'System',
        content: 'New lead Emma Davies assigned to Truckers',
        timestamp: '2025-07-11T09:00:00Z',
        type: 'system',
        isRead: true
      }
    ],
    sales: [
      {
        id: '1',
        senderId: 'truckers',
        senderName: 'Truckers',
        content: 'Pipeline looking strong this month. James Anderson deal should close next week.',
        timestamp: '2025-07-11T09:15:00Z',
        type: 'text',
        isRead: false
      },
      {
        id: '2',
        senderId: 'm1',
        senderName: 'M1',
        content: 'Amanda Foster is looking for more opportunities. Should I prepare additional portfolios?',
        timestamp: '2025-07-11T09:30:00Z',
        type: 'text',
        isRead: false
      }
    ],
    deals: [
      {
        id: '1',
        senderId: 'ed',
        senderName: 'Ed',
        content: 'Robert Johnson deal documentation ready for signature. Legal review complete.',
        timestamp: '2025-07-11T10:00:00Z',
        type: 'text',
        isRead: false
      }
    ],
    truckers: [
      {
        id: '1',
        senderId: 'truckers',
        senderName: 'Truckers',
        content: 'Hey, can you handle the Sarah Thompson follow-up? I\'m tied up with the off-plan site visit.',
        timestamp: '2025-07-11T10:15:00Z',
        type: 'text',
        isRead: true
      }
    ],
    squire: [
      {
        id: '1',
        senderId: 'squire',
        senderName: 'Squire',
        content: 'The commercial property analysis is ready. Should I send it to Sarah Thompson?',
        timestamp: '2025-07-11T09:45:00Z',
        type: 'text',
        isRead: false
      },
      {
        id: '2',
        senderId: 'squire',
        senderName: 'Squire',
        content: 'Also, Michael Roberts wants to schedule a call for this afternoon.',
        timestamp: '2025-07-11T10:30:00Z',
        type: 'text',
        isRead: false
      },
      {
        id: '3',
        senderId: 'squire',
        senderName: 'Squire',
        content: 'Property bond yields are looking good - 12.5% on the latest offering.',
        timestamp: '2025-07-11T10:45:00Z',
        type: 'text',
        isRead: false
      }
    ],
    m1: [
      {
        id: '1',
        senderId: 'm1',
        senderName: 'M1',
        content: 'Working on the student property portfolio for David Wilson. Should be ready by lunch.',
        timestamp: '2025-07-11T11:00:00Z',
        type: 'text',
        isRead: true
      }
    ],
    ed: [
      {
        id: '1',
        senderId: 'ed',
        senderName: 'Ed',
        content: 'Monthly performance review scheduled for Friday. Please prepare your KPIs.',
        timestamp: '2025-07-11T08:00:00Z',
        type: 'text',
        isRead: false
      }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChannel]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user?.name?.toLowerCase().replace(' ', '') || 'user',
        senderName: user?.name || 'User',
        content: messageInput,
        timestamp: new Date().toISOString(),
        type: 'text',
        isRead: false
      };

      setMessages(prev => ({
        ...prev,
        [selectedChannel]: [...(prev[selectedChannel] || []), newMessage]
      }));

      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getChannelMessages = () => {
    return messages[selectedChannel] || [];
  };

  const getChannelInfo = () => {
    return channels.find(c => c.id === selectedChannel);
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="h-full w-full flex">
      <div className="bg-white w-full h-full flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900 text-white flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Team Messages</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Channels
                </h3>
                {filteredChannels.filter(c => c.type === 'channel').map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg mb-1 transition-colors ${
                      selectedChannel === channel.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Hash className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{channel.name}</span>
                    </div>
                    {channel.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {channel.unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Direct Messages
                </h3>
                {filteredChannels.filter(c => c.type === 'direct').map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg mb-1 transition-colors ${
                      selectedChannel === channel.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs font-semibold">
                            {channel.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {channel.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">{channel.name}</span>
                    </div>
                    {channel.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {channel.unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
              {getChannelInfo()?.type === 'channel' ? (
                <>
                  <Hash className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{getChannelInfo()?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {getChannelInfo()?.members.length} members
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-gray-700">
                        {getChannelInfo()?.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {getChannelInfo()?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{getChannelInfo()?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {getChannelInfo()?.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {getChannelMessages().map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === user?.name?.toLowerCase().replace(' ', '') 
                    ? 'justify-end' 
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === user?.name?.toLowerCase().replace(' ', '')
                      ? 'bg-blue-600 text-white'
                      : message.type === 'system'
                      ? 'bg-gray-100 text-gray-700 text-center'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type !== 'system' && 
                   message.senderId !== user?.name?.toLowerCase().replace(' ', '') && (
                    <div className="text-xs font-semibold mb-1 text-gray-600">
                      {message.senderName}
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.senderId === user?.name?.toLowerCase().replace(' ', '') 
                      ? 'text-blue-100' 
                      : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${getChannelInfo()?.name}...`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}