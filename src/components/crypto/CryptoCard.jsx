import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const CryptoCard = ({ crypto, index }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 6 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  const is24hPositive = crypto.price_change_percentage_24h >= 0;
  const is7dPositive = crypto.price_change_percentage_7d_in_currency >= 0;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transform hover:-translate-y-1 animate-slide-up"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-10 h-10 rounded-full"
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {crypto.market_cap_rank}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{crypto.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm uppercase font-medium">{crypto.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatPrice(crypto.current_price)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatMarketCap(crypto.market_cap)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">24h Change</span>
            <div className={`flex items-center space-x-1 ${
              is24hPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {is24hPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-semibold text-sm">
                {formatPercent(crypto.price_change_percentage_24h)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">7d Change</span>
            <div className={`flex items-center space-x-1 ${
              is7dPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {is7dPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-semibold text-sm">
                {formatPercent(crypto.price_change_percentage_7d_in_currency || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Volume (24h)</span>
          <span className="font-medium">
            {formatMarketCap(crypto.total_volume)}
          </span>
        </div>
      </div>
    </div>
  );
};