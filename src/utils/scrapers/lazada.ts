import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class LazadaScraper extends BaseScraper {
  constructor() {
    super({
      name: 'Lazada',
      baseUrl: 'https://www.lazada.sg',
      searchUrl: 'https://www.lazada.sg/catalog/?q={query}&_keyori=ss&from=input&spm=a2o42.searchlist.search.go',
      selectors: {
        productContainer: '[data-tracking="product-card"], .product-card, .search-result-item',
        productName: '.product-name, .product-title, .product-link',
        price: '.product-price, .price-current, .price',
        link: '.product-link, .product-name a, .product-title a',
        image: '.product-image img, .product-thumbnail img, .product-picture',
        rating: '.product-rating, .rating, .star-rating',
        availability: '.product-availability, .availability, .stock-status',
      },
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-SG,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.lazada.sg/',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 