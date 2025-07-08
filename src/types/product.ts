export interface ProductResult {
  link: string;
  price: string;
  currency: string;
  productName: string;
  source: string;
  imageUrl?: string;
  rating?: string;
  availability?: string;
}

export interface ScraperConfig {
  name: string;
  baseUrl: string;
  searchUrl: string;
  selectors: {
    productContainer: string;
    productName: string;
    price: string;
    link: string;
    image?: string;
    rating?: string;
    availability?: string;
  };
  headers?: Record<string, string>;
  delay?: number;
} 