import { ProductResult } from '@/types/product';
export class ShopeeScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://shopee.sg',
      price: '0',
      currency: 'SGD',
      productName: `Stub: No real scraper for Shopee yet (${query})`,
      source: 'Shopee',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 