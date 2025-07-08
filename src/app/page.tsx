'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import ProductCard from '../components/ProductCard';

interface ProductResult {
  link: string;
  price: string;
  currency: string;
  productName: string;
  source: string;
  imageUrl?: string;
  rating?: string;
  availability?: string;
}

interface Country {
  code: string;
  name: string;
  currency: string;
  sites?: Array<{ name: string; scraperClass: string; enabled: boolean }>;
}

function OfficialSiteCard({ url, title }: { url: string; title: string }) {
  return (
    <div className={styles.officialSiteCard}>
      <div className={styles.officialSiteInfo}>
        <span className={styles.officialSiteBadge}>Official Site</span>
        <h3 className={styles.officialSiteTitle}>{title}</h3>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.officialSiteButton}
      >
        Go to Official Site
      </a>
    </div>
  );
}

export default function Home() {
  const [country, setCountry] = useState('US');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryHasFetcher, setCountryHasFetcher] = useState(true);
  const [officialSite, setOfficialSite] = useState<{ url: string; title: string } | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  // Only show examples for countries with at least one enabled site
  const [exampleQueries, setExampleQueries] = useState([
    { query: 'iPhone 16 Pro, 128GB', country: 'US' },
    { query: 'boAt Airdopes 311 Pro', country: 'IN' },
    { query: 'Samsung Galaxy S24', country: 'UK' },
    { query: 'MacBook Pro M3', country: 'US' },
    { query: 'Sony WH-1000XM5', country: 'US' },
    { query: 'Nike Air Max', country: 'US' },
  ]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/countries?includeDisabled=false');
      const data = await response.json();
      if (data.countries) {
        setCountries(data.countries);
        // Filter example queries to only those with enabled fetchers
        setExampleQueries((prev) =>
          prev.filter((ex) =>
            data.countries.some((c: any) => c.code === ex.country)
          )
        );
      }
    } catch (error) {
      // fallback to hardcoded
      setCountries([
        { code: 'US', name: 'United States', currency: 'USD' },
        { code: 'IN', name: 'India', currency: 'INR' },
        { code: 'UK', name: 'United Kingdom', currency: 'GBP' },
        { code: 'DE', name: 'Germany', currency: 'EUR' },
        { code: 'SG', name: 'Singapore', currency: 'SGD' },
        { code: 'AE', name: 'UAE', currency: 'AED' },
        { code: 'BR', name: 'Brazil', currency: 'BRL' },
        { code: 'AU', name: 'Australia', currency: 'AUD' },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);
    setOfficialSite(null);
    setIsUsingMockData(false);
    setCountryHasFetcher(true);

    try {
      const response = await fetch('/api/fetch-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country,
          query,
          maxResults: 50,
          timeout: 10000,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error && data.error.includes('No scrapers available')) {
          setCountryHasFetcher(false);
        }
        throw new Error(data.error || 'Failed to fetch prices');
      }

      if (data.products && Array.isArray(data.products)) {
        setResults(data.products);
        setOfficialSite(data.officialSite || null);
        setIsUsingMockData(data.isUsingMockData || false);
      } else if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: { query: string; country: string }) => {
    setCountry(example.country);
    setQuery(example.query);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.showcaseTitle}>🛒 BharatX Price Fetcher</h1>
          <p className={styles.showcaseSubtitle}>
            Instantly compare product prices across <b>{countries.length}+</b>{' '}
            countries and <b>100+ </b> ecommerce sites worldwide.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor='country'>Country:</label>
            <select
              id='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={styles.select}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='query'>Product Query:</label>
            <input
              id='query'
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='e.g., iPhone 16 Pro, 128GB'
              className={styles.input}
              required
            />
          </div>

          <button type='submit' disabled={loading} className={styles.button}>
            {loading ? '🔍 Searching...' : '🔍 Search Prices'}
          </button>
        </form>

        <div className={styles.examples}>
          <h3>💡 Try these examples:</h3>
          <div className={styles.exampleButtons}>
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className={styles.exampleButton}
                disabled={loading}
              >
                {example.query} ({example.country})
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className={styles.error}>
            ❌ {error}
            {!countryHasFetcher && (
              <div style={{ color: '#b91c1c', marginTop: 8 }}>
                No real fetchers available for this country. Showing mock/demo
                data.
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Searching across multiple e-commerce sites...</p>
            <p
              style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}
            >
              Note: Some sites may block automated requests, so we'll show demo
              data for demonstration
            </p>
          </div>
        )}

        {officialSite && (
          <OfficialSiteCard url={officialSite.url} title={officialSite.title} />
        )}
        {isUsingMockData && (
          <div className={styles.demoNotice}>
            <span className={styles.demoBadge}>Demo Mode</span>
            <span className={styles.demoText}>Showing sample data for demonstration purposes</span>
          </div>
        )}
        {results.length > 0 && (
          <div className={styles.results}>
            <h2>Found {results.length} products</h2>
            <div className={styles.products}>
              {results.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p className={styles.credits}>Made by Rahul</p>
      </footer>
    </div>
  );
}
