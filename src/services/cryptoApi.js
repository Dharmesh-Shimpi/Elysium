const BASE_URL = 'https://api.coingecko.com/api/v3';

export const cryptoApi = {
  // Get top cryptocurrencies with market data
  async getTopCryptos(limit = 50) {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h%2C7d`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch cryptocurrency data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw error;
    }
  },

  // Get simple price for conversion
  async getSimplePrice(fromCoin, toCoin) {
    try {
      const response = await fetch(
        `${BASE_URL}/simple/price?ids=${fromCoin}&vs_currencies=${toCoin}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch conversion rate');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
      throw error;
    }
  },

  // Get supported cryptocurrencies list
  async getSupportedCoins() {
    try {
      const response = await fetch(`${BASE_URL}/coins/list`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch supported coins');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching supported coins:', error);
      throw error;
    }
  }
};