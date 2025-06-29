import React from "react";
import "./ProductCard.css";
import { Product } from "../../types/Product";

interface Props {
  product: Product;
}

const getAccessLabel = (pricingOption: number, price?: number): string => {
  switch (pricingOption) {
    case 0:
      return price ? `$${price.toFixed(2)}` : "Paid";
    case 1:
      return "FREE";
    case 2:
      return "View Only";
    default:
      return "Unknown";
  }
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { imagePath, title, creator, pricingOption, price } = product;

  return (
    <div className="product-card">
      <div className="product-inner-container">
        <img
          src={imagePath}
          alt={title}
          className="product-image"
          loading="lazy"
        />
        <div className="product-details">
          <div className="product-meta">
            <div className="product-creator">{creator}</div>
            <div className="product-title">{title}</div>
          </div>
          <p className="pricing">{getAccessLabel(pricingOption, price)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
