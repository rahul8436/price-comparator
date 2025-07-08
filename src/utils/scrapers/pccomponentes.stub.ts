import { ProductResult } from '@/types/product';
export class PcComponentesScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.pccomponentes.com',
      price: '0',
      currency: 'EUR',
      productName: `Stub: No real scraper for PcComponentes yet (${query})`,
      source: 'PcComponentes',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 