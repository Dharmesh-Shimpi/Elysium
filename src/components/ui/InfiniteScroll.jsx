import React from "react";
import { useInView } from "react-intersection-observer";
import { LoadingSpinner } from "./LoadingSpinner";

export const InfiniteScroll = React.memo(
	({ hasMore, loading, onLoadMore, children, threshold = 0.1 }) => {
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
					<div
						ref={ref}
						className="flex justify-center py-8"
					>
						{loading && (
							<div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
								<LoadingSpinner size="md" />
								<span className="text-sm sm:text-base">
									Loading more cryptocurrencies...
								</span>
							</div>
						)}
					</div>
				)}
			</>
		);
	},
);

InfiniteScroll.displayName = "InfiniteScroll";
