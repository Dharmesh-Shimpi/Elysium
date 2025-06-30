import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { Navigation } from './components/ui/Navigation';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy load pages for code splitting
const HomePage = React.lazy(() => 
  import('./pages/HomePage').then(module => ({ default: module.HomePage }))
);
const ConverterPage = React.lazy(() => 
  import('./pages/ConverterPage').then(module => ({ default: module.ConverterPage }))
);

const AppContent = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      <ErrorBoundary>
        <Suspense 
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/converter" element={<ConverterPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <LoadingSpinner size="lg" />
          </div>
        } 
        persistor={persistor}
      >
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;