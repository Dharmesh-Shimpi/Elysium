import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../services/apiClient';

// Async thunks
export const fetchCryptos = createAsyncThunk(
  'crypto/fetchCryptos',
  async ({ page = 1, limit = 50, reset = false }, { rejectWithValue, getState }) => {
    try {
      const { cache } = getState();
      const cacheKey = `cryptos_${page}_${limit}`;
      
      // Check cache first
      const cachedData = cache.data[cacheKey];
      if (cachedData && Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
        return { data: cachedData.data, page, reset, fromCache: true };
      }

      const data = await apiClient.getTopCryptos(limit, page);
      return { data, page, reset, fromCache: false };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchConversionRate = createAsyncThunk(
  'crypto/fetchConversionRate',
  async ({ fromCoin, toCoin }, { rejectWithValue, getState }) => {
    try {
      const { cache } = getState();
      const cacheKey = `conversion_${fromCoin}_${toCoin}`;
      
      const cachedData = cache.data[cacheKey];
      if (cachedData && Date.now() - cachedData.timestamp < 2 * 60 * 1000) {
        return { rate: cachedData.data, fromCache: true };
      }

      const data = await apiClient.getSimplePrice(fromCoin, toCoin);
      const rate = data[fromCoin]?.[toCoin] || 0;
      return { rate, fromCache: false };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    cryptos: [],
    loading: false,
    error: null,
    hasMore: true,
    page: 1,
    conversionRate: null,
    conversionLoading: false,
    conversionError: null,
  },
  reducers: {
    resetCryptos: (state) => {
      state.cryptos = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
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
        if (action.meta.arg.reset) {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        const { data, page, reset } = action.payload;
        state.loading = false;
        state.error = null;
        
        if (reset || page === 1) {
          state.cryptos = data;
        } else {
          state.cryptos = [...state.cryptos, ...data];
        }
        
        state.page = page;
        state.hasMore = data.length === 50;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = false;
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
      });
  },
});

export const { resetCryptos, clearError, setConversionRate } = cryptoSlice.actions;
export default cryptoSlice.reducer;