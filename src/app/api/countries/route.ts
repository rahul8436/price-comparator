import { NextResponse } from 'next/server';
import {
  getSupportedCountries,
  getCountriesWithEnabledSites,
  countryConfigs,
  SiteConfig,
} from '@/utils/countrySites';
import { getScraperStats } from '@/utils/scraperFactory';

interface CountryResponse {
  countries: Array<{
    code: string;
    name: string;
    currency: string;
    sites: SiteConfig[];
  }>;
  total: number;
  stats?: ReturnType<typeof getScraperStats>;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDisabled = searchParams.get('includeDisabled') === 'true';
    const includeStats = searchParams.get('includeStats') === 'true';

    let countries;
    if (includeDisabled) {
      countries = getSupportedCountries();
    } else {
      countries = getCountriesWithEnabledSites();
    }

    const response: CountryResponse = {
      countries: countries.map((country) => {
        const config = countryConfigs.find((c) => c.code === country.code);
        return {
          ...country,
          sites: includeDisabled
            ? config?.sites || []
            : config?.sites.filter((site) => site.enabled) || [],
        };
      }),
      total: countries.length,
    };

    if (includeStats) {
      response.stats = getScraperStats();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: 500 }
    );
  }
}
