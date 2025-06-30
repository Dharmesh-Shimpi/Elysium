import { createSlice } from '@reduxjs/toolkit';
import { fetchCryptos, fetchConversionRate } from './cryptoSlice';

const cacheSlice = createSlice({
  name: 'cache',
  initialState: {
    data: {},
    lastUpdated: null,
  },
  reducers: {
    clearCache: (state) => {
      state.data = {};
      state.lastUpdated = null;
    },
    setCacheData: (state, action) => {
      const { key, data } = action.payload;
      state.data[key] = {
        data,
        timestamp: Date.now(),
      };
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        if (!action.payload.fromCache) {
          const { page, data } = action.payload;
          const cacheKey = `cryptos_${page}_50`;
          state.data[cacheKey] = {
            data,
            timestamp: Date.now(),
          };
          state.lastUpdated = Date.now();
        }
      })
      .addCase(fetchConversionRate.fulfilled, (state, action) => {
        if (!action.payload.fromCache) {
          const { fromCoin, toCoin } = action.meta.arg;
          const cacheKey = `conversion_${fromCoin}_${toCoin}`;
          state.data[cacheKey] = {
            data: action.payload.rate,
            timestamp: Date.now(),
          };
          state.lastUpdated = Date.now();
        }
      });
  },
});

export const { clearCache, setCacheData } = cacheSlice.actions;
export default cacheSlice.reducer;