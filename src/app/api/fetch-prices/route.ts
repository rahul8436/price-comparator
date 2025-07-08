import { NextRequest, NextResponse } from 'next/server';
import {
  fetchFromAllScrapers,
  getScrapersForCountry,
} from '@/utils/scraperFactory';
import { filterProductsWithLLM, localFilterProducts } from '@/utils/groq';
import { getMockProducts } from '@/utils/scrapers/mock-data';
import { getSupportedCountries } from '@/utils/countrySites';
import { getOfficialSiteUrl } from '@/utils/officialSiteFinder';

export async function POST(request: NextRequest) {
  try {
    const {
      query,
      country = 'US',
      maxResults = 50,
      timeout = 15000,
      useMockData = false,
      useLLM = false, // Disable LLM by default to avoid rate limits
      topN = 20,
    } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Validate country
    const supportedCountries = getSupportedCountries().map((c) => c.code);
    if (!supportedCountries.includes(country)) {
      return NextResponse.json(
        {
          error: 'Unsupported country',
          supportedCountries,
        },
        { status: 400 }
      );
    }

    console.log(`\n=== Starting price fetch for "${query}" in ${country} ===`);

    // Check if scrapers are available for this country
    const availableScrapers = getScrapersForCountry(country);
    if (availableScrapers.length === 0 && !useMockData) {
      return NextResponse.json(
        {
          error: 'No scrapers available for this country',
          country,
          supportedCountries: getSupportedCountries(),
        },
        { status: 400 }
      );
    }

    let products: any[] = [];
    let isUsingMockData = false;

    if (useMockData) {
      // Use mock data if requested
      console.log('Using mock data as requested');
      products = getMockProducts(query, country);
      isUsingMockData = true;
    } else {
      // Fetch products from all scrapers
      products = await fetchFromAllScrapers(country, query, {
        maxResults,
        timeout,
      });

      // If no products found from scrapers, use mock data as fallback
      if (products.length === 0) {
        console.log(
          'No products found from scrapers, using mock data as fallback'
        );
        products = getMockProducts(query, country);
        isUsingMockData = true;
      }
    }

    console.log(`Total products before filtering: ${products.length}`);

    // Hybrid: local filter, then LLM for top N, fallback to local if LLM fails
    let filteredProducts = await filterProductsWithLLM(products, query, {
      topN,
      useLLM,
    });
    // const filteredProducts = localFilterProducts(products, query, topN); // (for local-only filtering)

    // For India: sort Amazon first, then Flipkart, then others
    if (country === 'IN') {
      filteredProducts = [
        ...filteredProducts.filter(
          (p) => p.source && p.source.toLowerCase().includes('amazon')
        ),
        ...filteredProducts.filter(
          (p) => p.source && p.source.toLowerCase().includes('flipkart')
        ),
        ...filteredProducts.filter(
          (p) =>
            p.source &&
            !['amazon', 'flipkart'].some((s) =>
              p.source.toLowerCase().includes(s)
            )
        ),
      ];
      // Debug: log any Flipkart product with non-INR or missing/strange price
      filteredProducts.forEach((p) => {
        if (p.source && p.source.toLowerCase().includes('flipkart')) {
          if (p.currency !== 'INR' || !p.price || isNaN(Number(p.price))) {
            console.log('Flipkart price/currency issue:', p);
          }
        }
      });
    }

    // Find official site for the query
    const officialSite = await getOfficialSiteUrl(query, country);

    // Insert official site as the first product if found and not already present
    if (officialSite) {
      const alreadyPresent = filteredProducts.some(
        (p) => p.link && p.link.includes(officialSite.url)
      );
      if (!alreadyPresent) {
        filteredProducts.unshift({
          link: officialSite.url,
          price: '',
          currency: '',
          productName: officialSite.title || 'Official Site',
          source: 'Official Site',
          imageUrl: '',
          rating: '',
          availability: 'Available',
        });
      }
    }

    console.log(`Products after AI filtering: ${filteredProducts.length}`);
    console.log('=== Price fetch completed ===\n');

    return NextResponse.json({
      products: filteredProducts,
      totalFound: products.length,
      totalFiltered: filteredProducts.length,
      query,
      country,
      // officialSite, // removed as now included in products
      scrapersUsed: availableScrapers.length,
      isUsingMockData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in fetch-prices API:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch prices',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
