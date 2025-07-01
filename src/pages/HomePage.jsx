import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptos, resetCryptos } from "../store/slices/cryptoSlice";
import { CryptoCard } from "../components/crypto/CryptoCard";
import { CryptoCardSkeleton } from "../components/ui/SkeletonLoader";
import { InfiniteScroll } from "../components/ui/InfiniteScroll";
import { RefreshCw, AlertCircle } from "lucide-react";

// Memoized components for better performance
const MarketStats = React.memo(({ cryptos }) => (
	<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
		<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
			<p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
				Total Cryptocurrencies
			</p>
			<p className="text-2xl font-bold text-gray-900 dark:text-white">
				{cryptos.length}
			</p>
		</div>
		<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
			<p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
				Market Leaders
			</p>
			<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
				Top 50+
			</p>
		</div>
		<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
			<p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
				Live Updates
			</p>
			<p className="text-2xl font-bold text-green-600 dark:text-green-400">
				Real-time
			</p>
		</div>
	</div>
));

MarketStats.displayName = "MarketStats";

const CryptoGrid = React.memo(({ cryptos }) => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{cryptos.map((crypto, index) => (
			<CryptoCard
				key={crypto.id}
				crypto={crypto}
				index={index}
			/>
		))}
	</div>
));

CryptoGrid.displayName = "CryptoGrid";

const ErrorDisplay = React.memo(({ error, onRetry, loading }) => (
	<div className="text-center mt-8">
		<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 max-w-md mx-auto">
			<p className="text-red-600 dark:text-red-400 text-sm mb-2">
				{error}
			</p>
			<button
				onClick={onRetry}
				disabled={loading}
				className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm disabled:opacity-50"
			>
				{loading ? "Retrying..." : "Try loading more"}
			</button>
		</div>
	</div>
));

ErrorDisplay.displayName = "ErrorDisplay";

export const HomePage = () => {
	const dispatch = useDispatch();
	const { cryptos, loading, loadingMore, error, hasMore, page } = useSelector(
		(state) => state.crypto,
	);

	const handleRefresh = useCallback(() => {
		dispatch(resetCryptos());
		dispatch(fetchCryptos({ page: 1, limit: 50, reset: true }));
	}, [dispatch]);

	const handleLoadMore = useCallback(() => {
		if (!loading && !loadingMore && hasMore) {
			dispatch(fetchCryptos({ page: page + 1, limit: 50, reset: false }));
		}
	}, [dispatch, loading, loadingMore, hasMore, page]);

	useEffect(() => {
		if (cryptos.length === 0) {
			dispatch(fetchCryptos({ page: 1, limit: 50, reset: true }));
		}
	}, [dispatch, cryptos.length]);

	// Initial loading state
	if (loading && cryptos.length === 0) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center mb-12">
						<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Top Cryptocurrencies
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
							Real-time cryptocurrency prices and market data
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Array.from({ length: 12 }).map((_, index) => (
							<CryptoCardSkeleton key={index} />
						))}
					</div>
				</div>
			</div>
		);
	}

	// Error state when no data is loaded
	if (error && cryptos.length === 0) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 transition-colors duration-200">
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md">
					<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
						Oops! Something went wrong
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-6">
						{error}
					</p>
					<button
						onClick={handleRefresh}
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl sm:text-5xl font-bold dark:text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-800 bg-clip-text text-transparent h-16">
						Top Cryptocurrencies
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
						Real-time cryptocurrency prices and market data
					</p>
					<button
						onClick={handleRefresh}
						disabled={loading || loadingMore}
						className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
					>
						<RefreshCw
							className={`w-4 h-4 ${
								loading || loadingMore ? "animate-spin" : ""
							}`}
						/>
						<span>Refresh Data</span>
					</button>
				</div>

				{/* Market Stats */}
				<MarketStats cryptos={cryptos} />

				{/* Crypto Grid with Infinite Scroll */}
				<InfiniteScroll
					hasMore={hasMore}
					loading={loadingMore}
					onLoadMore={handleLoadMore}
				>
					<CryptoGrid cryptos={cryptos} />
				</InfiniteScroll>

				{/* Error Display for Load More */}
				{error && cryptos.length > 0 && (
					<ErrorDisplay
						error={error}
						onRetry={handleLoadMore}
						loading={loadingMore}
					/>
				)}

				{/* Footer */}
				<div className="text-center mt-12 py-8">
					<p className="text-gray-500 dark:text-gray-400">
						Data provided by CoinGecko API • Last updated:{" "}
						{new Date().toLocaleTimeString()}
					</p>
				</div>
			</div>
		</div>
	);
};
