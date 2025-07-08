import { ProductResult } from '@/types/product';
export class TescoScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.tesco.com',
      price: '0',
      currency: 'GBP',
      productName: `Stub: No real scraper for Tesco yet (${query})`,
      source: 'Tesco',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 