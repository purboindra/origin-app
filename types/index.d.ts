import { ObjectId } from "mongodb";

export interface CategoryInterface {
  name: string;
}

export interface ProductInterface {
  _id: ObjectId;
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnail_image: string;
  images: string[];
  category: CategoryInterface;
}

export interface FetchProductsParams {
  searchQuery: string;
}
