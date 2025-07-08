import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class EbayScraper extends BaseScraper {
  constructor() {
    super({
      name: 'eBay',
      baseUrl: 'https://www.ebay.com',
      searchUrl: 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw={query}&_sacat=0&LH_TitleDesc=0&_odkw=&_osacat=0',
      selectors: {
        productContainer: '.s-item, .srp-results .s-item',
        productName: '.s-item__title, .s-item__link',
        price: '.s-item__price, .s-item__price .POSITIVE',
        link: '.s-item__link, .s-item__title a',
        image: '.s-item__image-img, .s-item__image img',
        rating: '.s-item__reviews, .s-item__feedback',
        availability: '.s-item__shipping, .s-item__free-returns',
      },
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.ebay.com/',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 