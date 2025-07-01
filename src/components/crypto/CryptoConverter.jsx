import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpDown, RefreshCw } from "lucide-react";
import {
	fetchConversionRate,
	setConversionRate,
} from "../../store/slices/cryptoSlice";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { SearchableDropdown } from "../ui/SearchableDropdown";
import { supportedCurrencies } from "../../constants/currencies";

export const CryptoConverter = () => {
	const dispatch = useDispatch();
	const {
		conversionRate,
		conversionLoading,
		conversionError,
		coinList,
		coinListLoading,
	} = useSelector((state) => state.crypto);

	const [fromCoin, setFromCoin] = useState("bitcoin");
	const [toCoin, setToCoin] = useState("ethereum");
	const [amount, setAmount] = useState(1);

	const convertCurrency = () => {
		if (!amount || isNaN(Number(amount))) return;
		const to = supportedCurrencies.find((c) => c.id === toCoin)?.symbol;
		if (to) {
			dispatch(fetchConversionRate({ fromCoin, to }));
		}
	};

	const swapCoins = () => {
		const tempFrom = fromCoin;
		setFromCoin(toCoin);
		setToCoin(tempFrom);
		dispatch(setConversionRate(null));
	};

	const handleAmountChange = (e) => {
		setAmount(Number(e.target.value));
		dispatch(setConversionRate(null));
	};

	const getSelectedCoin = (coinId) => {
		return (
			coinList.find((coin) => coin.id === coinId) ||
			supportedCurrencies.find((cur) => cur.id === coinId)
		);
	};

	// Auto-convert when dependencies change
	useEffect(() => {
		if (amount && fromCoin && toCoin) {
			const debounceTimer = setTimeout(() => {
				convertCurrency();
			}, 500);

			return () => clearTimeout(debounceTimer);
		}
	}, [amount, fromCoin, toCoin]);

	const result = conversionRate ? Number(amount) * conversionRate : null;

	if (coinListLoading) {
		return (
			<div className="max-w-2xl mx-auto p-6">
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 animate-pulse">
					<div className="text-center">
						<LoadingSpinner size="lg" />
						<p className="mt-4 text-gray-500 dark:text-gray-300">
							Loading available cryptocurrencies...
						</p>
						<p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
							This may take a moment
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 animate-fade-in transition-colors duration-200">
				<h2 className="text-3xl font-bold dark:text-white mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-800 bg-clip-text text-transparent h-10">
					Crypto Converter
				</h2>

				<div className="space-y-4">
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
								min="0"
								step="any"
								className="flex-1 px-4 py-3 h-12 border min-w-0 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:w-fit w-full"
							/>
							<SearchableDropdown
								options={coinList}
								value={fromCoin}
								onChange={setFromCoin}
								placeholder="Search cryptocurrencies..."
								className="sm:w-1/2 w-full"
								maxDisplayItems={8}
								searchKeys={["name", "symbol"]}
							/>
						</div>
					</div>

					{/* Swap Button */}
					<div className="flex justify-center">
						<button
							onClick={swapCoins}
							className="p-3 sm:mr-[2.2%] sm:mb-[-3%] sm:mt-[2%] bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
							aria-label="Swap currencies"
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
							<div className="flex-1 px-4 py-3 h-12 border min-w-0 overflow-hidden border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-lg font-medium flex items-center justify-between sm:w-fit w-full">
								{conversionLoading ? (
									<div className="flex items-center space-x-2">
										<LoadingSpinner size="sm" />
										<span className="text-gray-500 dark:text-gray-400 text-sm">
											Converting...
										</span>
									</div>
								) : (
									<span className="text-gray-900 dark:text-white">
										{result
											? result.toFixed(8)
											: "0.00000000"}
									</span>
								)}
							</div>
							<SearchableDropdown
								options={supportedCurrencies}
								value={toCoin}
								onChange={setToCoin}
								placeholder="Search currencies..."
								className="sm:w-1/2 w-full"
								maxDisplayItems={8}
								searchKeys={["name", "symbol"]}
							/>
						</div>
					</div>

					{/* Error Display */}
					{conversionError && (
						<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-slide-up">
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-red-500 rounded-full"></div>
								<p className="text-red-600 dark:text-red-400 text-sm font-medium">
									{conversionError}
								</p>
							</div>
						</div>
					)}

					{/* Result Display */}
					{result && !conversionLoading && !conversionError && (
						<div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800 animate-slide-up">
							<div className="text-center">
								<p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
									Conversion Result
								</p>
								<div className="space-y-2">
									<p className="text-2xl font-bold text-gray-900 dark:text-white">
										{amount}{" "}
										{getSelectedCoin(
											fromCoin,
										)?.symbol?.toUpperCase()}{" "}
										= {result.toFixed(8)}{" "}
										{getSelectedCoin(
											toCoin,
										)?.symbol?.toUpperCase()}
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{getSelectedCoin(fromCoin)?.name} to{" "}
										{getSelectedCoin(toCoin)?.name}
									</p>
								</div>
								<div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
									<p className="text-xs text-gray-500 dark:text-gray-400">
										Rate: 1{" "}
										{getSelectedCoin(
											fromCoin,
										)?.symbol?.toUpperCase()}{" "}
										= {conversionRate?.toFixed(8)}{" "}
										{getSelectedCoin(
											toCoin,
										)?.symbol?.toUpperCase()}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Convert Button */}
					<button
						onClick={convertCurrency}
						disabled={conversionLoading || !amount || amount <= 0}
						className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
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

					{/* Info Section */}
					<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
						<div className="flex items-start space-x-3">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
							<div>
								<h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
									Real-time Conversion
								</h4>
								<p className="text-xs text-blue-600 dark:text-blue-400">
									Rates are updated automatically as you type.
									Search through{" "}
									{coinList.length.toLocaleString()}{" "}
									cryptocurrencies and{" "}
									{supportedCurrencies.length} fiat
									currencies.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
