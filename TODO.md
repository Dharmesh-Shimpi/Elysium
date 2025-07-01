# TODO - Future Enhancements

This document outlines planned features, improvements, and technical debt that should be addressed in future iterations of the Cryptocurrency Tracking App.

## 🚀 High Priority Features

### 1. Optimize Initial Coin Fetch Performance
- [ ] **Improve Light Performance**: Avoid using `coins/list` API directly
  - Current API returns over **17,300 coins** without pagination, causing performance bottlenecks
  - Solution: Switch to a more efficient endpoint like `coins/markets` which supports pagination and filtering
  - Goal: Reduce unnecessary rendering and improve load speed on initial fetch
  - https://docs.coingecko.com/reference/coins-list

### 2. Enhanced Data Visualization
- [ ] **Price Charts**: Integrate Chart.js or D3.js for interactive price charts
  - 24h, 7d, 30d, 1y time ranges
  - Candlestick and line chart options
  - Volume overlay charts
- [ ] **Market Trends**: Add trending coins section
- [ ] **Market Overview**: Global market cap, dominance charts
- [ ] **Sparkline Charts**: Mini charts in crypto cards

### 3. Advanced Filtering & Search
- [ ] **Search Functionality**: Real-time search with autocomplete
- [ ] **Advanced Filters**: 
  - Price range filters
  - Market cap categories
  - Percentage change filters
  - Volume filters
- [ ] **Sorting Options**: Multiple sorting criteria
- [ ] **Favorites System**: Save and track favorite cryptocurrencies

## 🌐 Internationalization

### 1. Multi-language Support
- [ ] **i18n Implementation**: React-i18next integration
- [ ] **Currency Localization**: Support for different fiat currencies
- [ ] **Number Formatting**: Locale-specific number formatting
- [ ] **RTL Support**: Right-to-left language support

### 2. Regional Features
- [ ] **Regional APIs**: Support for region-specific data sources
- [ ] **Local Regulations**: Compliance with regional requirements
- [ ] **Time Zone Support**: Proper time zone handling

## 📊 Analytics & Monitoring

### 1. User Analytics
- [ ] **Google Analytics**: User behavior tracking
- [ ] **Performance Monitoring**: Core Web Vitals tracking
- [ ] **Error Tracking**: Sentry or similar error monitoring
- [ ] **User Feedback**: In-app feedback collection

### 2. Business Intelligence
- [ ] **Usage Metrics**: Feature usage analytics
- [ ] **Performance Metrics**: API response time monitoring
- [ ] **Conversion Tracking**: User engagement metrics

## 🔍 SEO Improvements
- [ ] **Meta Tags**: Add dynamic meta titles and descriptions for all pages
- [ ] **Open Graph / Twitter Cards**: Enable social media link previews
- [ ] **Clean URLs**: Implement slug-based dynamic routes
- [ ] **Robots.txt & Sitemap.xml**: Generate and serve for better indexing

---

*This TODO list is a living document and should be updated regularly based on user feedback, technical requirements, and business priorities.*
