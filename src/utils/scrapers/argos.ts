import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class ArgosScraper extends BaseScraper {
  constructor() {
    super({
      name: 'Argos',
      baseUrl: 'https://www.argos.co.uk',
      searchUrl: 'https://www.argos.co.uk/search/{query}/',
      selectors: {
        productContainer: '.ac-product-card, .product-card, .search-result-item',
        productName: '.ac-product-card__name, .product-name, .product-title',
        price: '.ac-product-price__amount, .price, .product-price',
        link: '.ac-product-card__link, .product-link, .product-title a',
        image: '.ac-product-card__image img, .product-image img, .product-thumbnail',
        rating: '.ac-product-card__rating, .product-rating, .star-rating',
        availability: '.ac-product-card__availability, .product-availability, .stock-status',
      },
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.argos.co.uk/',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 