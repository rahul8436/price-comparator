import { NextResponse } from 'next/server';
import { fetchFromMultipleCountries } from '@/utils/scraperFactory';
import { getCountriesForCategory } from '@/utils/scraperFactory';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, countries, categories, maxResults = 50, timeout = 10000 } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    let targetCountries = countries;
    
    // If categories are specified, filter countries that support those categories
    if (categories && categories.length > 0) {
      const categoryCountries = categories.map(category => 
        getCountriesForCategory(category)
      ).flat();
      
      if (targetCountries) {
        // Intersection of requested countries and category-supporting countries
        targetCountries = targetCountries.filter(country => 
          categoryCountries.includes(country)
        );
      } else {
        targetCountries = [...new Set(categoryCountries)]; // Remove duplicates
      }
    }

    // If no countries specified, use all available countries
    if (!targetCountries || targetCountries.length === 0) {
      return NextResponse.json(
        { error: 'No valid countries found for the specified criteria' },
        { status: 400 }
      );
    }

    console.log(`Multi-country search: "${query}" across ${targetCountries.length} countries`);

    const results = await fetchFromMultipleCountries(
      targetCountries,
      query,
      {
        maxResults,
        timeout,
        categories
      }
    );

    // Calculate total results across all countries
    const totalResults = Object.values(results).reduce(
      (sum, countryResults) => sum + countryResults.length, 
      0
    );

    const response = {
      query,
      countries: targetCountries,
      categories,
      results,
      totalResults,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in multi-country search:', error);
    return NextResponse.json(
      { error: 'Failed to perform multi-country search' },
      { status: 500 }
    );
  }
} 