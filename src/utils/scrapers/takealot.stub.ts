import { ProductResult } from '@/types/product';
export class TakealotScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.takealot.com',
      price: '0',
      currency: 'ZAR',
      productName: `Stub: No real scraper for Takealot yet (${query})`,
      source: 'Takealot',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 