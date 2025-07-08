import { ProductResult } from '@/types/product';
export class NykaaScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.nykaa.com',
      price: '0',
      currency: 'INR',
      productName: `Stub: No real scraper for Nykaa yet (${query})`,
      source: 'Nykaa',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 