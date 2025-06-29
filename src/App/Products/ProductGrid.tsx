import React, { useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import "./ProductCard.css";
import { useProductStore } from "../../store/productStore";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductGrid: React.FC = () => {
  const searchQuery = useProductStore((state) => state.searchQuery);
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const hasMore = useProductStore((state) => state.hasMore);
  const setHasMore = useProductStore((state) => state.setHasMore);
  const pricingFilter = useProductStore((s) => s.pricingFilter);
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesPricing =
        pricingFilter.length === 0 ||
        pricingFilter.includes(item.pricingOption);

      return matchesSearch && matchesPricing;
    });
  }, [products, searchQuery, pricingFilter]);

  // Fetch products on first load (if not filtered and nothing loaded)
  useEffect(() => {
    if (!searchQuery && products.length === 0) {
      fetchProducts();
    }
  }, [searchQuery, products.length, fetchProducts]);

  useEffect(() => {
    if (!searchQuery) {
      setHasMore(true);
    }
  }, [searchQuery, setHasMore]);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={() => {
        if (!searchQuery) fetchProducts();
      }}
      hasMore={hasMore && !searchQuery}
      loader={<h4 style={{ textAlign: "center" }}>Loading more...</h4>}
    >
      {filteredProducts.length === 0 && searchQuery ? (
        <p style={{ padding: "1rem", textAlign: "center", color:"#ffffff" }}>
          No matching products found.
        </p>
      ) : (
        <div className="grid-wrapper">
          {filteredProducts.map((item) => (
            <ProductCard product={item} />
          ))}
        </div>
      )}
    </InfiniteScroll>
  );
};

export default ProductGrid;
