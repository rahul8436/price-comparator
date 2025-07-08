import { ProductResult } from '@/types/product';
export class MediaExpertScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.mediaexpert.pl',
      price: '0',
      currency: 'PLN',
      productName: `Stub: No real scraper for Media Expert yet (${query})`,
      source: 'Media Expert',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 