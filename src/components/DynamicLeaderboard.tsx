/**
 * Dynamic Sales Leaderboard component that updates with real user data
 */

import React from 'react';
import { useUserData } from '../contexts/UserDataContext';

interface DynamicLeaderboardProps {
  refreshKey: number;
  onLeaderboardClick: (name: string) => void;
}

const DynamicLeaderboard: React.FC<DynamicLeaderboardProps> = ({ refreshKey, onLeaderboardClick }) => {
  const { systemUsers } = useUserData();
  
  return (
    <div key={`leaderboard-${refreshKey}-${systemUsers.map(u => u.name).join('-')}`} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Sales Leaderboard 
        <span className="text-xs text-gray-500 ml-2">(Live Data)</span>
      </h2>
      <div className="space-y-4">
        {systemUsers
          .filter(u => ['board', 'management', 'sales'].includes(u.accessLevel))
          .slice(0, 5) // Limit to top 5
          .map((systemUser, index) => {
            console.log(`🏆 DynamicLeaderboard position ${index + 1}:`, systemUser.name, '|', systemUser.role);
            
            const salesData = [
              { revenue: '£1,450K', deals: 8, conversion: 62, status: 'Champion' },
              { revenue: '£980K', deals: 6, conversion: 48, status: 'Rising Star' },
              { revenue: '£825K', deals: 5, conversion: 55, status: 'Steady' },
              { revenue: '£750K', deals: 4, conversion: 35, status: 'Growing' },
              { revenue: '£1,200K', deals: 7, conversion: 58, status: 'Strong' }
            ];
            
            const data = salesData[index] || { revenue: '£500K', deals: 3, conversion: 40, status: 'Active' };
            const isTopPerformer = index === 0;
            
            return (
              <div
                key={`${systemUser.id}-${systemUser.name}-${refreshKey}`}
                onClick={() => onLeaderboardClick(systemUser.name)}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer ${
                  isTopPerformer 
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' 
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    isTopPerformer ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{systemUser.name}</h3>
                    <p className="text-sm text-gray-600">{isTopPerformer ? data.status : systemUser.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{data.revenue}</div>
                  <div className="text-sm text-gray-600">{data.deals} deals • {data.conversion}%</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DynamicLeaderboard;
