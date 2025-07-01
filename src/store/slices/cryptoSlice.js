import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apiClient";

// Async thunks
export const fetchCryptos = createAsyncThunk(
	"crypto/fetchCryptos",
	async (
		{ page = 1, limit = 50, reset = false },
		{ rejectWithValue, getState },
	) => {
		try {
			const { cache } = getState();
			const cacheKey = `cryptos_${page}_${limit}`;

			// Check cache first
			const cachedData = cache.data[cacheKey];
			if (
				cachedData &&
				Date.now() - cachedData.timestamp < 5 * 60 * 1000
			) {
				return { data: cachedData.data, page, reset, fromCache: true };
			}

			const data = await apiClient.getTopCryptos(limit, page);
			return { data, page, reset, fromCache: false };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const fetchConversionRate = createAsyncThunk(
	"crypto/fetchConversionRate",
	async ({ fromCoin, to }, { rejectWithValue, getState }) => {
		try {
			const { cache } = getState();
			const cacheKey = `conversion_${fromCoin}_${to}`;

			const cachedData = cache.data[cacheKey];
			if (
				cachedData &&
				Date.now() - cachedData.timestamp < 2 * 60 * 1000
			) {
				return { rate: cachedData.data, fromCache: true };
			}

			const data = await apiClient.getSimplePrice(fromCoin, to);

			const rate = data[fromCoin]?.[to] || 0;
			return { rate, fromCache: false };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const fetchCoinList = createAsyncThunk(
	"crypto/fetchCoinList",
	async (_, { getState, rejectWithValue }) => {
		try {
			const { crypto } = getState();

			// Already loaded? Don't fetch again
			if (crypto.coinList.length > 0) {
				return { data: crypto.coinList, fromCache: true };
			}

			const data = await apiClient.getSupportedCoins();
			return { data, fromCache: false };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

const cryptoSlice = createSlice({
	name: "crypto",
	initialState: {
		cryptos: [],
		loading: false,
		loadingMore: false, // Separate loading state for infinite scroll
		error: null,
		hasMore: true,
		page: 1,
		conversionRate: null,
		conversionLoading: false,
		conversionError: null,
		coinList: [],
		coinListLoading: false,
		coinListError: null,
	},
	reducers: {
		resetCryptos: (state) => {
			state.cryptos = [];
			state.page = 1;
			state.hasMore = true;
			state.error = null;
			state.loading = false;
			state.loadingMore = false;
		},
		clearError: (state) => {
			state.error = null;
			state.conversionError = null;
		},
		setConversionRate: (state, action) => {
			state.conversionRate = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch cryptos
			.addCase(fetchCryptos.pending, (state, action) => {
				const { reset } = action.meta.arg;
				if (reset) {
					state.loading = true;
					state.loadingMore = false;
				} else {
					state.loading = false;
					state.loadingMore = true;
				}
				state.error = null;
			})
			.addCase(fetchCryptos.fulfilled, (state, action) => {
				const { data, page, reset, fromCache } = action.payload;
				state.loading = false;
				state.loadingMore = false;
				state.error = null;

				if (reset || page === 1) {
					state.cryptos = data;
				} else {
					const existingIds = new Set(
						state.cryptos.map((crypto) => crypto.id),
					);
					const newCryptos = data.filter(
						(crypto) => !existingIds.has(crypto.id),
					);
					state.cryptos = [...state.cryptos, ...newCryptos];
				}

				state.page = page;
				state.hasMore = data.length === 50;
			})
			.addCase(fetchCryptos.rejected, (state, action) => {
				state.loading = false;
				state.loadingMore = false;
				state.error = action.payload;
			})
			// Fetch conversion rate
			.addCase(fetchConversionRate.pending, (state) => {
				state.conversionLoading = true;
				state.conversionError = null;
			})
			.addCase(fetchConversionRate.fulfilled, (state, action) => {
				state.conversionLoading = false;
				state.conversionRate = action.payload.rate;
			})
			.addCase(fetchConversionRate.rejected, (state, action) => {
				state.conversionLoading = false;
				state.conversionError = action.payload;
			})
			// Fetch Coins
			.addCase(fetchCoinList.pending, (state) => {
				state.coinListLoading = true;
				state.coinListError = null;
			})
			.addCase(fetchCoinList.fulfilled, (state, action) => {
				state.coinListLoading = false;
				state.coinList = action.payload.data;
			})
			.addCase(fetchCoinList.rejected, (state, action) => {
				state.coinListLoading = false;
				state.coinListError = action.payload;
			});
	},
});

export const { resetCryptos, clearError, setConversionRate } =
	cryptoSlice.actions;
export default cryptoSlice.reducer;
