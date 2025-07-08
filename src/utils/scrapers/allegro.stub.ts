import { ProductResult } from '@/types/product';
export class AllegroScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://allegro.pl',
      price: '0',
      currency: 'PLN',
      productName: `Stub: No real scraper for Allegro yet (${query})`,
      source: 'Allegro',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 