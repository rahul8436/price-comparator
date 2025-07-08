import { ProductResult } from '@/types/product';
import { countryConfigs, getEnabledSites } from './countrySites';

// Import all available scrapers
import {
  AmazonScraper,
  FlipkartScraper,
  BestBuyScraper,
  EbayScraper,
  WalmartScraper,
  ArgosScraper,
  MediaMarktScraper,
  LazadaScraper,
  NoonScraper,
  AmericanasScraper,
  JBHiFiScraper,
  NeweggScraper,
  CurrysScraper,
  MercadoLivreScraper,
  // Stub scrapers
  Qoo10Scraper,
  ShopeeScraper,
  TokopediaScraper,
  YodobashiScraper,
  RakutenScraper,
  FnacScraper,
  DartyScraper,
  UnieuroScraper,
  PcComponentesScraper,
  CoolblueScraper,
  LiverpoolScraper,
  CarrefourUAEScraper,
  TakealotScraper,
  MakroScraper,
  JumiaScraper,
  KongaScraper,
  KilimallScraper,
  TrendyolScraper,
  HepsiburadaScraper,
  AllegroScraper,
  MediaExpertScraper,
  AlzaScraper,
  SouqScraper,
  MagazineLuizaScraper,
  SaturnScraper,
  OttoScraper,
  BestBuyCAScraper,
  WalmartCAScraper,
  CanadianTireScraper,
  MyntraScraper,
  NykaaScraper,
  CromaScraper,
  JohnLewisScraper,
  TescoScraper,
  MallScraper,
  GmarketScraper,
  CoupangScraper,
} from './scrapers';

export interface Scraper {
  fetchProducts(query: string): Promise<ProductResult[]>;
}

// Scraper class mapping
const scraperClasses: Record<string, any> = {
  AmazonScraper,
  FlipkartScraper,
  BestBuyScraper,
  EbayScraper,
  WalmartScraper,
  ArgosScraper,
  MediaMarktScraper,
  LazadaScraper,
  NoonScraper,
  AmericanasScraper,
  JBHiFiScraper,
  NeweggScraper,
  CurrysScraper,
  MercadoLivreScraper,
  // Stub scrapers
  Qoo10Scraper,
  ShopeeScraper,
  TokopediaScraper,
  YodobashiScraper,
  RakutenScraper,
  FnacScraper,
  DartyScraper,
  UnieuroScraper,
  PcComponentesScraper,
  CoolblueScraper,
  LiverpoolScraper,
  CarrefourUAEScraper,
  TakealotScraper,
  MakroScraper,
  JumiaScraper,
  KongaScraper,
  KilimallScraper,
  TrendyolScraper,
  HepsiburadaScraper,
  AllegroScraper,
  MediaExpertScraper,
  AlzaScraper,
  SouqScraper,
  MagazineLuizaScraper,
  SaturnScraper,
  OttoScraper,
  BestBuyCAScraper,
  WalmartCAScraper,
  CanadianTireScraper,
  MyntraScraper,
  NykaaScraper,
  CromaScraper,
  JohnLewisScraper,
  TescoScraper,
  MallScraper,
  GmarketScraper,
  CoupangScraper,
  // Add more scrapers here as they are implemented
  // TargetScraper,
  // HomeDepotScraper,
  // HarveyNormanScraper,
  // GoodGuysScraper,
  // EmagScraper,
  // ExtremeDigitalScraper,
  // AltexScraper,
  // LinksScraper,
  // BigBangScraper,
  // HinnavaatlusScraper,
  // TwoTwentyScraper,
  // PiguScraper,
  // ElgigantenScraper,
  // ElkjøpScraper,
  // GiganttiScraper,
  // DigitecScraper,
  // HarveyNormanIEScraper,
  // NoelLeemingScraper,
  // FalabellaScraper,
  // RipleyScraper,
};

// Factory function to create scrapers dynamically
function createScraper(
  scraperClassName: string,
  countryCode?: string
): Scraper | null {
  const ScraperClass = scraperClasses[scraperClassName];
  if (!ScraperClass) {
    console.warn(`Scraper class ${scraperClassName} not found`);
    return null;
  }

  try {
    // Some scrapers need country code, others don't
    if (countryCode) {
      return new ScraperClass(countryCode);
    } else {
      return new ScraperClass();
    }
  } catch (error) {
    console.error(`Error creating scraper ${scraperClassName}:`, error);
    return null;
  }
}

// Get scrapers for a specific country
export function getScrapersForCountry(countryCode: string): Scraper[] {
  const enabledSites = getEnabledSites(countryCode);
  const scrapers: Scraper[] = [];

  enabledSites.forEach((site) => {
    const scraper = createScraper(site.scraperClass, countryCode);
    if (scraper) {
      scrapers.push(scraper);
    }
  });

  return scrapers;
}

// Get all available scrapers (for admin/debugging purposes)
export function getAllAvailableScrapers(): Record<string, Scraper[]> {
  const allScrapers: Record<string, Scraper[]> = {};

  countryConfigs.forEach((country) => {
    allScrapers[country.code] = getScrapersForCountry(country.code);
  });

  return allScrapers;
}

// Get statistics about available scrapers
export function getScraperStats(): {
  totalCountries: number;
  countriesWithScrapers: number;
  totalSites: number;
  enabledSites: number;
  scraperClasses: number;
} {
  const totalCountries = countryConfigs.length;
  const countriesWithScrapers = countryConfigs.filter(
    (country) => getScrapersForCountry(country.code).length > 0
  ).length;

  const totalSites = countryConfigs.reduce(
    (sum, country) => sum + country.sites.length,
    0
  );

  const enabledSites = countryConfigs.reduce(
    (sum, country) => sum + country.sites.filter((site) => site.enabled).length,
    0
  );

  const scraperClasses = Object.keys(scraperClasses).length;

  return {
    totalCountries,
    countriesWithScrapers,
    totalSites,
    enabledSites,
    scraperClasses,
  };
}

export async function fetchFromAllScrapers(
  country: string,
  query: string,
  options?: {
    maxResults?: number;
    timeout?: number;
    categories?: string[];
  }
): Promise<ProductResult[]> {
  const scrapers = getScrapersForCountry(country);
  const results: ProductResult[] = [];
  const timeout = options?.timeout || 15000; // Increased to 15 seconds
  const maxResults = options?.maxResults || 50; // Default 50 results

  console.log(
    `Fetching products for "${query}" from ${scrapers.length} scrapers in ${country}`
  );

  if (scrapers.length === 0) {
    console.warn(`No scrapers available for country: ${country}`);
    return [];
  }

  // Helper to add timeout to a promise
  function withTimeout<T>(
    promise: Promise<T>,
    ms: number,
    scraperName: string
  ): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => {
          console.warn(
            `Timeout: ${scraperName} took longer than ${ms}ms, skipping.`
          );
          reject(new Error(`Timeout after ${ms}ms`));
        }, ms)
      ),
    ]);
  }

  // Run all scrapers in parallel with individual error handling and timeout
  const promises = scrapers.map(async (scraper, index) => {
    const scraperName = scraper.constructor.name;
    try {
      console.log(
        `Starting scraper ${index + 1}/${scrapers.length}: ${scraperName}`
      );

      const products = await withTimeout(
        scraper.fetchProducts(query),
        timeout,
        scraperName
      );

      console.log(
        `Scraper ${scraperName} returned ${products.length} products`
      );
      return products;
    } catch (error) {
      console.error(`Error with scraper ${scraperName}:`, error);
      return [];
    }
  });

  const allResults = await Promise.all(promises);

  // Flatten results and limit to maxResults
  allResults.forEach((products) => {
    results.push(...products);
  });

  // Sort by price (ascending) and limit results
  const sortedResults = results
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
      return priceA - priceB;
    })
    .slice(0, maxResults);

  console.log(
    `Total products found: ${results.length}, returning top ${sortedResults.length}`
  );
  return sortedResults;
}

// Enhanced function to fetch from multiple countries
export async function fetchFromMultipleCountries(
  countries: string[],
  query: string,
  options?: {
    maxResults?: number;
    timeout?: number;
    categories?: string[];
  }
): Promise<Record<string, ProductResult[]>> {
  const results: Record<string, ProductResult[]> = {};

  // Fetch from all countries in parallel
  const promises = countries.map(async (country) => {
    try {
      const countryResults = await fetchFromAllScrapers(
        country,
        query,
        options
      );
      results[country] = countryResults;
    } catch (error) {
      console.error(`Error fetching from country ${country}:`, error);
      results[country] = [];
    }
  });

  await Promise.all(promises);
  return results;
}

// Function to get available countries for a specific category
export function getCountriesForCategory(category: string): string[] {
  return countryConfigs
    .filter((country) =>
      country.sites.some(
        (site) =>
          site.enabled &&
          (!site.categories || site.categories.includes(category))
      )
    )
    .map((country) => country.code);
}

// Function to enable/disable scrapers dynamically (for admin purposes)
export function updateScraperStatus(
  countryCode: string,
  siteName: string,
  enabled: boolean
): boolean {
  const country = countryConfigs.find((c) => c.code === countryCode);
  if (!country) return false;

  const site = country.sites.find((s) => s.name === siteName);
  if (!site) return false;

  site.enabled = enabled;
  return true;
}

// Legacy export for backward compatibility
export const countryScrapers: Record<string, Scraper[]> = {};
countryConfigs.forEach((country) => {
  countryScrapers[country.code] = getScrapersForCountry(country.code);
});
