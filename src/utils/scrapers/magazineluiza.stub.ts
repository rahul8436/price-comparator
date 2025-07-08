import { ProductResult } from '@/types/product';
export class MagazineLuizaScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.magazineluiza.com.br',
      price: '0',
      currency: 'BRL',
      productName: `Stub: No real scraper for Magazine Luiza yet (${query})`,
      source: 'Magazine Luiza',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 