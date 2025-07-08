import { BaseScraper } from '@/utils/scraper';
import { ProductResult, ScraperConfig } from '@/types/product';

const amazonConfigs: Record<string, ScraperConfig> = {
  US: {
    name: 'Amazon US',
    baseUrl: 'https://www.amazon.com',
    searchUrl: 'https://www.amazon.com/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  IN: {
    name: 'Amazon IN',
    baseUrl: 'https://www.amazon.in',
    searchUrl: 'https://www.amazon.in/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-IN,en;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  UK: {
    name: 'Amazon UK',
    baseUrl: 'https://www.amazon.co.uk',
    searchUrl: 'https://www.amazon.co.uk/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-GB,en;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  DE: {
    name: 'Amazon DE',
    baseUrl: 'https://www.amazon.de',
    searchUrl: 'https://www.amazon.de/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'de-DE,de;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  CA: {
    name: 'Amazon CA',
    baseUrl: 'https://www.amazon.ca',
    searchUrl: 'https://www.amazon.ca/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-CA,en;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  AU: {
    name: 'Amazon AU',
    baseUrl: 'https://www.amazon.com.au',
    searchUrl: 'https://www.amazon.com.au/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-AU,en;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  BR: {
    name: 'Amazon BR',
    baseUrl: 'https://www.amazon.com.br',
    searchUrl: 'https://www.amazon.com.br/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'pt-BR,pt;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  MX: {
    name: 'Amazon MX',
    baseUrl: 'https://www.amazon.com.mx',
    searchUrl: 'https://www.amazon.com.mx/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'es-MX,es;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  FR: {
    name: 'Amazon FR',
    baseUrl: 'https://www.amazon.fr',
    searchUrl: 'https://www.amazon.fr/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'fr-FR,fr;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  IT: {
    name: 'Amazon IT',
    baseUrl: 'https://www.amazon.it',
    searchUrl: 'https://www.amazon.it/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'it-IT,it;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  ES: {
    name: 'Amazon ES',
    baseUrl: 'https://www.amazon.es',
    searchUrl: 'https://www.amazon.es/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'es-ES,es;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  NL: {
    name: 'Amazon NL',
    baseUrl: 'https://www.amazon.nl',
    searchUrl: 'https://www.amazon.nl/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'nl-NL,nl;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  JP: {
    name: 'Amazon JP',
    baseUrl: 'https://www.amazon.co.jp',
    searchUrl: 'https://www.amazon.co.jp/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ja-JP,ja;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  AE: {
    name: 'Amazon UAE',
    baseUrl: 'https://www.amazon.ae',
    searchUrl: 'https://www.amazon.ae/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-AE,en;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  SA: {
    name: 'Amazon Saudi Arabia',
    baseUrl: 'https://www.amazon.sa',
    searchUrl: 'https://www.amazon.sa/s?k={query}&ref=sr_pg_1',
    selectors: {
      productContainer:
        '[data-component-type="s-search-result"], .s-result-item',
      productName: 'h2 a span, .a-size-medium.a-color-base.a-text-normal',
      price: '.a-price-whole, .a-price .a-offscreen',
      link: 'h2 a, .a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal',
      image: 'img.s-image, .s-image',
      rating: '.a-icon-alt, .a-icon-star-small .a-icon-alt',
      availability: '.a-color-success, .a-color-price',
    },
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-SA,en;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  },
  // Add more regions as needed
};

export class AmazonScraper extends BaseScraper {
  constructor(country: string) {
    if (!amazonConfigs[country]) {
      throw new Error(`AmazonScraper: Unsupported country code: ${country}`);
    }
    super(amazonConfigs[country]);
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
}
