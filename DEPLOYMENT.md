# 🚀 Deployment Guide - BharatX Price Fetcher

## Quick Deployment Options

### Option 1: Vercel (Recommended - 2 minutes)

1. **Fork/Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/price-comparator.git
   cd price-comparator
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add GROQ_API_KEY
   # Enter your Groq API key when prompted
   ```

4. **Your app will be live at**: `https://your-app.vercel.app`

### Option 2: Railway (1 minute)

1. **Connect GitHub Repository**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub account
   - Select this repository

2. **Add Environment Variable**
   - Go to Variables tab
   - Add: `GROQ_API_KEY=your_groq_api_key`

3. **Deploy**
   - Railway will automatically deploy
   - Get your live URL from the deployment

### Option 3: Docker (Local/Server)

1. **Build and Run**
   ```bash
   # Build image
   docker build -t price-fetcher .
   
   # Run container
   docker run -p 3000:3000 -e GROQ_API_KEY=your_key price-fetcher
   ```

2. **Or use Docker Compose**
   ```bash
   # Create .env.local file
   echo "GROQ_API_KEY=your_groq_api_key" > .env.local
   
   # Run
   docker-compose up -d
   ```

## Testing Your Deployment

### Test the Required Examples

#### 1. iPhone 16 Pro in US
```bash
curl -X POST https://your-app.vercel.app/api/fetch-prices \
  -H "Content-Type: application/json" \
  -d '{
    "country": "US",
    "query": "iPhone 16 Pro, 128GB"
  }'
```

#### 2. boAt Airdopes 311 Pro in India
```bash
curl -X POST https://your-app.vercel.app/api/fetch-prices \
  -H "Content-Type: application/json" \
  -d '{
    "country": "IN",
    "query": "boAt Airdopes 311 Pro"
  }'
```

### Expected Response
```json
{
  "products": [
    {
      "link": "https://amazon.com/...",
      "price": "999.00",
      "currency": "USD",
      "productName": "Apple iPhone 16 Pro, 128GB",
      "source": "Amazon US",
      "imageUrl": "https://...",
      "rating": "4.5/5",
      "availability": "In Stock"
    }
  ],
  "totalFound": 15,
  "totalFiltered": 8,
  "query": "iPhone 16 Pro, 128GB",
  "country": "US",
  "scrapersUsed": 4,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Environment Variables

### Required
- `GROQ_API_KEY`: Your Groq AI API key for smart filtering

### Optional
- `NODE_ENV`: Set to `production` for production builds

## Troubleshooting

### Common Issues

1. **API Key Missing**
   ```
   Error: GROQ_API_KEY is required
   ```
   **Solution**: Set the environment variable in your deployment platform

2. **Build Failures**
   ```
   Error: Module not found
   ```
   **Solution**: Ensure all dependencies are in package.json

3. **CORS Issues**
   ```
   Error: CORS policy blocked
   ```
   **Solution**: The app includes CORS headers, but you may need to configure your deployment platform

### Performance Tips

1. **Enable Caching**: Use Vercel's edge caching
2. **Monitor Usage**: Track API calls to avoid rate limits
3. **Scale Up**: Upgrade your plan if you need more resources

## Support

If you encounter issues:
1. Check the [README.md](README.md) for detailed documentation
2. Review the [API documentation](README.md#api-endpoints)
3. Test locally first: `npm run dev`

---

**Ready to deploy! 🚀** 