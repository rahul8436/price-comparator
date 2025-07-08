import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class BestBuyScraper extends BaseScraper {
  constructor() {
    super({
      name: 'BestBuy',
      baseUrl: 'https://www.bestbuy.com',
      searchUrl: 'https://www.bestbuy.com/site/searchpage.jsp?st={query}&_dyncharset=UTF-8&_dynSessConf=&id=pcat17071&type=page&sc=Global&cp=1&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All+Categories&ks=960&keys=keys',
      selectors: {
        productContainer: '.shop-sku-list-item, .sku-item, .list-item',
        productName: '.sku-title a, .sku-header h4 a, .product-title',
        price: '.priceView-customer-price span, .priceView-layout-large .priceView-customer-price span, .price-current',
        link: '.sku-title a, .sku-header h4 a, .product-title a',
        image: '.product-image img, .sku-image img, .product-thumbnail img',
        rating: '.c-ratings-reviews-v2, .ratings-reviews, .review-rating',
        availability: '.fulfillment-fulfillment-summary, .availability-message, .store-availability',
      },
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.bestbuy.com/',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 