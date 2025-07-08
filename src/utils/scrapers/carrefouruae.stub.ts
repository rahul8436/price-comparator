import { ProductResult } from '@/types/product';
export class CarrefourUAEScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.carrefouruae.com',
      price: '0',
      currency: 'AED',
      productName: `Stub: No real scraper for Carrefour UAE yet (${query})`,
      source: 'Carrefour UAE',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 