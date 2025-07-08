import React from 'react';
import styles from './ProductCard.module.css';
import Image from 'next/image';

interface ProductCardProps {
  link: string;
  price: string;
  currency: string;
  productName: string;
  source: string;
  imageUrl?: string;
  rating?: string;
  availability?: string;
}

const getStars = (rating?: string) => {
  if (!rating) return null;
  const num = Math.round(parseFloat(rating));
  return (
    <span className={styles.stars}>
      {'★'.repeat(num)}
      {'☆'.repeat(5 - num)}
    </span>
  );
};

const getSourceIcon = (source: string) => {
  // Simple emoji for major sites, fallback to 🏪
  const icons: Record<string, string> = {
    Amazon: '🛒',
    Flipkart: '📦',
    eBay: '💸',
    Walmart: '🏬',
    BestBuy: '🔵',
    Argos: '🛍️',
    MediaMarkt: '🎵',
    Lazada: '🌏',
    Noon: '🌞',
    Americanas: '🇧🇷',
    'JB Hi-Fi': '🎶',
    NewEgg: '🥚',
    Currys: '💻',
    'Mercado Livre': '🤝',
    Target: '🎯',
    'Home Depot': '🏠',
  };
  return icons[source] || '🏪';
};

const allowedDomains = [
  'fls-na.amazon.com',
  'images-na.ssl-images-amazon.com',
  'm.media-amazon.com',
  'rukminim1.flixcart.com',
  'i5.walmartimages.com',
  // Add more as needed
];

function isAllowedDomain(url: string) {
  try {
    const { hostname } = new URL(url);
    return allowedDomains.includes(hostname);
  } catch {
    return false;
  }
}

const ProductCard: React.FC<ProductCardProps> = ({
  link,
  price,
  currency,
  productName,
  source,
  imageUrl,
  rating,
  availability,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          isAllowedDomain(imageUrl) ? (
            <Image
              src={imageUrl}
              alt={productName}
              width={200}
              height={200}
              className={styles.image}
            />
          ) : (
            <img
              src={imageUrl}
              alt={productName}
              width={200}
              height={200}
              className={styles.image}
              loading="lazy"
            />
          )
        ) : (
          <div className={styles.noImage}>🛒</div>
        )}
        <div className={styles.priceTag}>
          {currency} {price}
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{productName}</h3>
        <div className={styles.meta}>
          <span className={styles.source} title={source}>
            {getSourceIcon(source)} {source}
          </span>
          {rating && <span className={styles.rating}>{getStars(rating)}</span>}
          {availability && (
            <span className={styles.availability}>{availability}</span>
          )}
        </div>
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.button}
        >
          View Product
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
