import { Category } from "./category.model";

export interface Product {
    productId: number;
    name: string;
    description: string;
    image: string;
    categories: Category[];
}