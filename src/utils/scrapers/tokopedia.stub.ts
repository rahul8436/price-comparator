import { ProductResult } from '@/types/product';
export class TokopediaScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.tokopedia.com',
      price: '0',
      currency: 'IDR',
      productName: `Stub: No real scraper for Tokopedia yet (${query})`,
      source: 'Tokopedia',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 