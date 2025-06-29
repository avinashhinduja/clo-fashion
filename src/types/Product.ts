// src/types/Product.ts
export interface Product {
    id: string;
    pricingOption: number;
    creator: string;
    title: string;
    imagePath: string;
    price: number;
    access: 'Free' | 'View Only' | 'Paid';
}
