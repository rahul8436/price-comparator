import { ProductResult } from '@/types/product';
export class MallScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.11st.co.kr',
      price: '0',
      currency: 'KRW',
      productName: `Stub: No real scraper for 11st Mall yet (${query})`,
      source: '11st Mall',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 