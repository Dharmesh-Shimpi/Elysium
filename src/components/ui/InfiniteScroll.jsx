import React from 'react';
import { useInView } from 'react-intersection-observer';

export const InfiniteScroll = ({ 
  hasMore, 
  loading, 
  onLoadMore, 
  children,
  threshold = 0.1 
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);

  return (
    <>
      {children}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"></div>
              <span>Loading more...</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};