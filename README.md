# Cryptocurrency Tracking App

A modern, responsive cryptocurrency tracking application built with React and Vite, featuring real-time price data, interactive charts, and currency conversion capabilities.

![image](https://github.com/user-attachments/assets/274f629b-01e7-470f-9263-15e9009af041)


## 🚀 Features

- **Real-time Cryptocurrency Data**: Live prices, market caps, and percentage changes
- **Interactive Converter**: Convert between different cryptocurrencies with real-time rates
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Beautiful Animations**: Smooth slide-in effects and hover interactions
- **Modern UI**: Clean, professional design with gradient backgrounds and card layouts
- **Error Handling**: Robust error states with retry functionality
- **Loading States**: Elegant loading spinners and skeleton screens

## 🏗️ Architecture & Design Decisions

### Frontend Framework Choice
**React with Vite** was chosen for this project due to:
- **Fast Development**: Vite provides lightning-fast hot module replacement (HMR)
- **Modern Tooling**: Built-in TypeScript support, optimized bundling, and tree-shaking
- **React Ecosystem**: Mature ecosystem with extensive library support
- **Performance**: Vite's ES modules approach results in faster build times and smaller bundles

### State Management
**React Hooks + Custom Hooks** approach was selected over external state management libraries:
- **Simplicity**: For this app's scope, React's built-in state management is sufficient
- **Custom Hooks**: `useCrypto` hook encapsulates API logic and provides reusable state
- **Performance**: Minimal overhead compared to Redux or Zustand for this use case
- **Maintainability**: Easier to understand and debug for smaller applications

### Styling Architecture
**Tailwind CSS** was chosen for styling:
- **Utility-First**: Rapid prototyping and consistent design system
- **Mobile-First**: Built-in responsive design utilities
- **Performance**: Purged CSS results in smaller bundle sizes
- **Maintainability**: No CSS file sprawl, styles co-located with components

### Component Architecture
**Atomic Design Principles**:
```
src/
├── components/
│   ├── ui/           # Reusable UI components (atoms)
│   └── crypto/       # Domain-specific components (molecules)
├── pages/            # Page-level components (templates)
├── hooks/            # Custom React hooks
└── services/         # API and external service integrations
```

### API Strategy
**CoinGecko API** was selected over CoinMarketCap due to:
- **No Authentication Required**: Eliminates API key management complexity
- **Rate Limiting**: Generous free tier suitable for demo applications
- **Comprehensive Data**: Provides all required market data and conversion rates
- **Reliability**: Stable API with good uptime and documentation

### Performance Optimizations
- **Lazy Loading**: Images loaded with `loading="lazy"` attribute
- **Debounced API Calls**: Converter uses 500ms debounce to prevent excessive requests
- **Memoization**: Strategic use of React hooks to prevent unnecessary re-renders
- **Optimized Bundle**: Vite's tree-shaking eliminates unused code

### Error Handling Strategy
**Graceful Degradation**:
- API failures show user-friendly error messages with retry options
- Loading states provide visual feedback during data fetching
- Fallback values prevent application crashes
- Network errors are caught and displayed appropriately

### Accessibility Considerations
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Focus Management**: Visible focus indicators for keyboard navigation
- **Color Contrast**: Sufficient contrast ratios for text readability
- **Screen Reader Support**: Meaningful alt texts and ARIA labels

### Mobile-First Approach
**Progressive Enhancement**:
- Base styles target mobile devices (320px+)
- Responsive breakpoints enhance experience on larger screens
- Touch-friendly interface elements (44px minimum touch targets)
- Optimized for thumb navigation patterns

## 🛠️ Technology Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **State Management**: Redux-toolkit
- **Styling**: Tailwind CSS v4.1
- **Icons**: Lucide React
- **API**: CoinGecko API v3
- **Development**: ESLint,

## 📱 Screenshots

### Homepage - Desktop
![Homepage](https://github.com/user-attachments/assets/6e92ef4f-ac61-4f74-bbf7-aba7e9ac6b61)


### Homepage - Mobile
![Homepage Mobile](https://github.com/user-attachments/assets/7f6d2aec-caad-4dc4-b461-971649e82b8f)


### Converter Page
![Converter Page](https://github.com/user-attachments/assets/818dd8ea-95a2-47e5-9240-6e63d556cfbd)


## 🎨 Design Philosophy

The application follows modern web design principles:

- **Minimalism**: Clean, uncluttered interface focusing on essential information
- **Consistency**: Unified color scheme, typography, and spacing throughout
- **Hierarchy**: Clear visual hierarchy using typography scales and color contrast
- **Feedback**: Immediate visual feedback for user interactions
- **Performance**: Optimized for fast loading and smooth animations

## 🔄 Data Flow

1. **Initial Load**: `useCrypto` hook fetches top 50 cryptocurrencies
2. **Real-time Updates**: Manual refresh button allows users to update data
3. **Conversion**: Debounced input triggers API calls for currency conversion
4. **Error Handling**: Failed requests show error states with retry options
5. **Loading States**: Spinners and skeleton screens during data fetching

## 🚀 Future Enhancements

See [TODO.md](./TODO.md) for planned features and improvements.

## 📋 Assumptions

See [ASSUMPTIONS.md](./ASSUMPTIONS.md) for project assumptions and constraints.

## 🛠️ Setup & Deployment

See [SETUP.md](./SETUP.md) for detailed installation and deployment instructions.
