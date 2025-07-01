# Setup & Deployment Guide

This guide provides step-by-step instructions for setting up, running, and deploying the Cryptocurrency Tracking App.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- **Git** (for cloning the repository)

You can verify your installations by running:
```bash
node --version
npm --version
git --version
```

## 🚀 Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd crypto-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect your Git repository for automatic deployments

3. **Configuration**:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 2: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** to configure your deployment

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/crypto-tracker"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **Node modules issues**:
   ```bash
   # Clear npm cache and reinstall
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

3. **Build failures**:
   ```bash
   # Check for linting errors
   npm run lint
   
   # Clear Vite cache
   rm -rf node_modules/.vite
   ```

### API Rate Limiting

If you encounter rate limiting issues with the CoinGecko API:

1. **Implement caching**: Add localStorage caching for API responses
2. **Reduce request frequency**: Increase debounce time in converter
3. **Consider API alternatives**: Switch to a paid API service for production

### Performance Issues

1. **Large bundle size**:
   ```bash
   # Analyze bundle
   npm run build
   npx vite-bundle-analyzer dist
   ```

2. **Slow loading**:
   - Enable gzip compression on your server
   - Implement service worker for caching
   - Use CDN for static assets

## 📊 Monitoring & Analytics

### Adding Analytics

1. **Google Analytics 4**:
   ```bash
   npm install gtag
   ```

2. **Performance monitoring**:
   ```bash
   npm install web-vitals
   ```

For additional help, please create an issue in the project repository.