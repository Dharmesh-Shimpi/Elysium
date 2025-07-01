import React from "react";

export const CryptoCardSkeleton = React.memo(() => {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
					<div>
						<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
						<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
					</div>
				</div>
				<div className="text-right">
					<div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-2"></div>
					<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="space-y-2">
					<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
					<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
				</div>
				<div className="space-y-2">
					<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
					<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
				</div>
			</div>

			<div className="pt-4 border-t border-gray-200 dark:border-gray-600">
				<div className="flex justify-between">
					<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
					<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
				</div>
			</div>
		</div>
	);
});

CryptoCardSkeleton.displayName = "CryptoCardSkeleton";

export const ConverterSkeleton = React.memo(() => {
	return (
		<div className="max-w-2xl mx-auto px-3 sm:px-6">
			<div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 animate-pulse">
				<div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-6 sm:mb-8"></div>

				<div className="space-y-4 sm:space-y-6">
					<div className="space-y-2 sm:space-y-3">
						<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
							<div className="w-full sm:flex-1 h-10 sm:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg sm:rounded-xl"></div>
							<div className="w-full sm:w-1/2 h-10 sm:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg sm:rounded-xl"></div>
						</div>
					</div>

					<div className="flex justify-center py-2">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
					</div>

					<div className="space-y-2 sm:space-y-3">
						<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-8"></div>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
							<div className="w-full sm:flex-1 h-10 sm:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg sm:rounded-xl"></div>
							<div className="w-full sm:w-1/2 h-10 sm:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg sm:rounded-xl"></div>
						</div>
					</div>

					<div className="w-full h-10 sm:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg sm:rounded-xl"></div>
				</div>
			</div>
		</div>
	);
});

ConverterSkeleton.displayName = "ConverterSkeleton";
