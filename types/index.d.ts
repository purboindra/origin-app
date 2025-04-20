import { DefaultSession } from "next-auth";

/// AUTH JS
declare module "next-auth" {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

export interface CategoryInterface {
  name: string;
}

export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnail_image: string;
  images: string[];
  colors: string[];
  category: CategoryInterface;
}
