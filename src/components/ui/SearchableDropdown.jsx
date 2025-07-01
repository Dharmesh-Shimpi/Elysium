import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import { ChevronDown, Search, X } from "lucide-react";

export const SearchableDropdown = React.memo(
	({
		options = [],
		value,
		onChange,
		placeholder = "Search...",
		displayKey = "name",
		valueKey = "id",
		className = "",
		maxDisplayItems = 5,
		searchKeys = ["name", "symbol"],
	}) => {
		const [isOpen, setIsOpen] = useState(false);
		const [searchTerm, setSearchTerm] = useState("");
		const dropdownRef = useRef(null);
		const searchInputRef = useRef(null);

		// Memoize filtered options for better performance
		const filteredOptions = useMemo(() => {
			if (!searchTerm.trim()) {
				return options.slice(0, maxDisplayItems);
			}

			const filtered = options
				.filter((option) =>
					searchKeys.some((key) =>
						option[key]
							?.toLowerCase()
							.includes(searchTerm.toLowerCase()),
					),
				)
				.slice(0, maxDisplayItems);

			return filtered;
		}, [searchTerm, options, maxDisplayItems, searchKeys]);

		// Memoize selected option
		const selectedOption = useMemo(
			() => options.find((option) => option[valueKey] === value),
			[options, value, valueKey],
		);

		// Memoized callbacks
		const handleSelect = useCallback(
			(option) => {
				onChange(option[valueKey]);
				setIsOpen(false);
				setSearchTerm("");
			},
			[onChange, valueKey],
		);

		const handleToggle = useCallback(() => {
			setIsOpen((prev) => !prev);
			if (!isOpen) {
				setSearchTerm("");
			}
		}, [isOpen]);

		const clearSearch = useCallback(() => {
			setSearchTerm("");
			searchInputRef.current?.focus();
		}, []);

		const handleSearchChange = useCallback((e) => {
			setSearchTerm(e.target.value);
		}, []);

		// Close dropdown when clicking outside
		useEffect(() => {
			const handleClickOutside = (event) => {
				if (
					dropdownRef.current &&
					!dropdownRef.current.contains(event.target)
				) {
					setIsOpen(false);
					setSearchTerm("");
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}, []);

		// Focus search input when dropdown opens
		useEffect(() => {
			if (isOpen && searchInputRef.current) {
				searchInputRef.current.focus();
			}
		}, [isOpen]);

		return (
			<div
				className={`relative ${className}`}
				ref={dropdownRef}
			>
				{/* Trigger Button */}
				<button
					type="button"
					onClick={handleToggle}
					className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left flex items-center justify-between text-sm sm:text-base"
				>
					<span className="truncate min-w-0 flex-1">
						{selectedOption ? (
							<span className="flex items-center space-x-1">
								<span className="font-semibold">
									{selectedOption.symbol?.toUpperCase()}
								</span>
								<span className="hidden sm:inline text-gray-500 dark:text-gray-400">
									-
								</span>
								<span className="hidden sm:inline truncate">
									{selectedOption.name}
								</span>
							</span>
						) : (
							<span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
								Select cryptocurrency...
							</span>
						)}
					</span>
					<ChevronDown
						className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
				</button>

				{/* Dropdown Menu */}
				<div
					className={`absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl shadow-lg transition-all duration-200 origin-top ${
						isOpen
							? "opacity-100 scale-100 translate-y-0"
							: "opacity-0 scale-95 -translate-y-2 pointer-events-none"
					}`}
				>
					{/* Search Input */}
					<div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-600">
						<div className="relative">
							<Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
							<input
								ref={searchInputRef}
								type="text"
								value={searchTerm}
								onChange={handleSearchChange}
								placeholder={placeholder}
								className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm"
							/>
							{searchTerm && (
								<button
									onClick={clearSearch}
									className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
								>
									<X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
								</button>
							)}
						</div>
					</div>

					{/* Options List */}
					<div className="max-h-48 sm:max-h-60 overflow-y-auto">
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option, index) => (
								<DropdownOption
									key={option[valueKey]}
									option={option}
									isSelected={option[valueKey] === value}
									isLast={
										index === filteredOptions.length - 1
									}
									onSelect={handleSelect}
									valueKey={valueKey}
								/>
							))
						) : (
							<div className="px-3 sm:px-4 py-4 sm:py-6 text-center text-gray-500 dark:text-gray-400">
								<Search className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 opacity-50" />
								<p className="text-xs sm:text-sm">
									No cryptocurrencies found
								</p>
								<p className="text-xs mt-0.5 sm:mt-1">
									Try adjusting your search terms
								</p>
							</div>
						)}
					</div>

					{/* Show more indicator */}
					{!searchTerm && options.length > maxDisplayItems && (
						<div className="px-3 sm:px-4 py-1.5 sm:py-2 border-t border-gray-200 dark:border-gray-600 text-center">
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Showing {maxDisplayItems} of {options.length}{" "}
								cryptocurrencies. Use search to find more.
							</p>
						</div>
					)}
				</div>
			</div>
		);
	},
);

// Separate memoized component for dropdown options
const DropdownOption = React.memo(
	({ option, isSelected, isLast, onSelect, valueKey }) => {
		const handleClick = useCallback(() => {
			onSelect(option);
		}, [onSelect, option]);

		return (
			<button
				onClick={handleClick}
				className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150 flex items-center space-x-2 sm:space-x-3 ${
					isSelected
						? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
						: "text-gray-900 dark:text-white"
				} ${
					isLast
						? ""
						: "border-b border-gray-100 dark:border-gray-600"
				}`}
			>
				<div className="flex-1 min-w-0">
					<div className="flex items-center space-x-1.5 sm:space-x-2">
						<span className="font-medium text-xs sm:text-sm">
							{option.symbol?.toUpperCase()}
						</span>
						<span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
							{option.name}
						</span>
					</div>
				</div>
				{isSelected && (
					<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0"></div>
				)}
			</button>
		);
	},
);

DropdownOption.displayName = "DropdownOption";
SearchableDropdown.displayName = "SearchableDropdown";
