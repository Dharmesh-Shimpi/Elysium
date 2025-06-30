import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowUpDown, RefreshCw } from 'lucide-react';
import { fetchConversionRate, setConversionRate } from '../../store/slices/cryptoSlice';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const CryptoConverter = () => {
  const dispatch = useDispatch();
  const { conversionRate, conversionLoading, conversionError } = useSelector(state => state.crypto);
  
  const [fromCoin, setFromCoin] = useState('bitcoin');
  const [toCoin, setToCoin] = useState('ethereum');
  const [amount, setAmount] = useState('1');
  const [coins] = useState([
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
    { id: 'binancecoin', symbol: 'bnb', name: 'BNB' },
    { id: 'cardano', symbol: 'ada', name: 'Cardano' },
    { id: 'solana', symbol: 'sol', name: 'Solana' },
    { id: 'polkadot', symbol: 'dot', name: 'Polkadot' },
    { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin' },
    { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche' },
    { id: 'polygon', symbol: 'matic', name: 'Polygon' },
    { id: 'chainlink', symbol: 'link', name: 'Chainlink' }
  ]);

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) return;
    dispatch(fetchConversionRate({ fromCoin, toCoin }));
  };

  const swapCoins = () => {
    const tempFrom = fromCoin;
    setFromCoin(toCoin);
    setToCoin(tempFrom);
    dispatch(setConversionRate(null));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    dispatch(setConversionRate(null));
  };

  useEffect(() => {
    if (amount && fromCoin && toCoin) {
      const debounceTimer = setTimeout(() => {
        convertCurrency();
      }, 500);

      return () => clearTimeout(debounceTimer);
    }
  }, [amount, fromCoin, toCoin]);

  const getSelectedCoin = (coinId) => {
    return coins.find(coin => coin.id === coinId);
  };

  const result = conversionRate ? Number(amount) * conversionRate : null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 animate-fade-in transition-colors duration-200">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Crypto Converter
        </h2>

        <div className="space-y-6">
          {/* From Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              From
            </label>
            <div className="flex space-x-4 sm:flex-row flex-col sm:space-y-0 space-y-3">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="flex-1 px-4 py-3 border min-w-0 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:w-fit w-full"
              />
              <select
                value={fromCoin}
                onChange={(e) => setFromCoin(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:w-1/2 w-full"
              >
                {coins.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.symbol.toUpperCase()} - {coin.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapCoins}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>

          {/* To Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              To
            </label>
            <div className="flex space-x-4 sm:flex-row flex-col sm:space-y-0 space-y-3">
              <div className="flex-1 px-4 py-3 border min-w-0 overflow-hidden border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-lg font-medium flex items-center justify-between sm:w-fit w-full">
                {conversionLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <span className="text-gray-900 dark:text-white">
                    {result ? result.toFixed(8) : '0.00000000'}
                  </span>
                )}
              </div>
              <select
                value={toCoin}
                onChange={(e) => setToCoin(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:w-1/2 w-full"
              >
                {coins.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.symbol.toUpperCase()} - {coin.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error Display */}
          {conversionError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-sm">{conversionError}</p>
            </div>
          )}

          {/* Result Display */}
          {result && !conversionLoading && !conversionError && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800 animate-slide-up">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Conversion Result</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {amount} {getSelectedCoin(fromCoin)?.symbol.toUpperCase()} = {result.toFixed(8)} {getSelectedCoin(toCoin)?.symbol.toUpperCase()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {getSelectedCoin(fromCoin)?.name} to {getSelectedCoin(toCoin)?.name}
                </p>
              </div>
            </div>
          )}

          {/* Convert Button */}
          <button
            onClick={convertCurrency}
            disabled={conversionLoading || !amount}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            {conversionLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" />
                <span>Converting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Convert Now</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};