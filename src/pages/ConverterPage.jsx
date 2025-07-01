import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ConverterSkeleton } from '../components/ui/SkeletonLoader';
import { fetchCoinList } from '../store/slices/cryptoSlice';
// Lazy load the converter component
const CryptoConverter = React.lazy(() => 
  import('../components/crypto/CryptoConverter').then(module => ({
    default: module.CryptoConverter
  }))
);

export const ConverterPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchCoinList());
  }, [ dispatch ]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="sm:text-4xl text-3xl font-bold dark:text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-800 bg-clip-text text-transparent h-12">
            Cryptocurrency Converter
          </h1>
          <p className="sm:text-lg text-base text-gray-600 dark:text-gray-300">
            Convert between different cryptocurrencies with real-time exchange rates
          </p>
        </div>
        
        <Suspense fallback={<ConverterSkeleton />}>
          <CryptoConverter />
        </Suspense>
        
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How it works</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our converter uses real-time market data to provide accurate exchange rates between cryptocurrencies. 
              Simply select the currencies you want to convert, enter the amount, and get instant results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};