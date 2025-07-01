# Project Assumptions

This document outlines the key assumptions made during the development of the Cryptocurrency Tracking App. Understanding these assumptions is crucial for future development, maintenance, and potential modifications.

## 🌐 API & Data Source Assumptions

### Primary API Choice
**Assumption**: CoinGecko API was chosen over CoinMarketCap API  
- **Reason**: CoinMarketCap API was returning internal server errors during development  
- **Original Requirement**: The project specification mentioned using CoinMarketCap API (https://coinmarketcap.com/api/)  
- **Alternative Solution**: CoinGecko API provides similar functionality without authentication requirements  
- **Impact**: All API endpoints and data structures are based on CoinGecko's response format

### API Reliability
**Assumption**: CoinGecko API will remain free and accessible  
- **Risk**: API might introduce rate limiting or require authentication in the future  
- **Mitigation**: Code is structured to easily switch between API providers  
- **Fallback Plan**: Multiple API providers can be integrated if needed

### Currency Conversion Logic
**Assumption**: Conversion rates between cryptocurrencies are directly fetched from the API  
- **Reason**: Instead of calculating conversion by fetching each currency in USD and doing math on the frontend, we rely on CoinGecko’s direct support for currency pair conversions  
- **Justification**: This is a frontend project, and offloading logic to the API is simpler and more efficient  
- **Impact**: This avoids complexity and inconsistency in client-side math, and reduces frontend processing
- **Limitation**: Accuracy and availability of conversion pairs are fully dependent on API support

---

*These assumptions should be regularly reviewed and updated as the project evolves, user feedback is received, and market conditions change.*
