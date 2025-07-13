/**
 * InvestmentTypesSummary component showing deal counts by investment type
 */

import React from 'react';
import { InvestmentType } from '../types';

interface InvestmentTypesSummaryProps {
  investmentTypes: InvestmentType[];
}

/**
 * Component to display investment types summary
 */
const InvestmentTypesSummary: React.FC<InvestmentTypesSummaryProps> = ({ investmentTypes }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        {investmentTypes.map((type) => (
          <div key={type.id} className="flex flex-col items-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{type.totalDeals}</div>
            <div className="text-sm text-gray-600">{type.name.replace(' Investment', '').replace(' Property', '')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentTypesSummary;