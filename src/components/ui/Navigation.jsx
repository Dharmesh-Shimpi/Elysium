import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/converter', icon: ArrowLeftRight, label: 'Converter' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <TrendingUp className="sm:w-8 sm:h-8 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h1 className="xs:text-sm text-xl  font-bold text-gray-900 dark:text-white">CryptoTracker</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center sm:space-x-2 sm:px-3 sm:py-2 py-1 px-2 space-x-1 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                );
              })}
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};