// src/store/productStore.ts
import { create } from "zustand";
import { Product } from "../types/Product";

interface ProductState {
    products: Product[];
    page: number;
    hasMore: boolean;
    setProducts: (items: Product[]) => void;
    appendProducts: (items: Product[]) => void;
    incrementPage: () => void;
    setHasMore: (value: boolean) => void;
    fetchProducts: () => Promise<void>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    getFilteredProducts: () => Product[];
    pricingFilter: number[];
    togglePricingFilter: (value: number) => void;
    clearPricingFilters: () => void;
    setPricingFilter: (vals: number[]) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    page: 1,
    hasMore: true,
    setProducts: (items) => set(() => ({ products: items })),
    appendProducts: (items) =>
        set((state) => ({ products: [...state.products, ...items] })),
    incrementPage: () => set((state) => ({ page: state.page + 1 })),
    setHasMore: (value) => set(() => ({ hasMore: value })),
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
    fetchProducts: async () => {
        try {
            const { page } = get();
            const res = await fetch(
                `https://closet-recruiting-api.azurewebsites.net/api/data?page=${page}`
            );
            const data: Product[] = await res.json();

            if (data.length === 0) {
                get().setHasMore(false);
                return;
            }

            get().appendProducts(data);
            get().incrementPage();
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    },
    getFilteredProducts: () => {
        const { products, searchQuery } = get();
        return products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    },
    pricingFilter: [],
    togglePricingFilter: (val) => {
        const current = get().pricingFilter;
        const updated = current.includes(val)
            ? current.filter((v) => v !== val)
            : [...current, val];
        set({ pricingFilter: updated });
        return updated; // this return is essential
    },
    clearPricingFilters: () => set({ pricingFilter: [] }),
    setPricingFilter: (vals) => set({ pricingFilter: vals }),
}));
