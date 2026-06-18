// src/types/product.ts
export type ProductImage = {
  id: number;
  productId: number;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  order: number;
};

export type ProductTag = {
  id: number;
  productId: number;
  tagId?: number | null;
  tagName: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  category?: string | null;
  stockQuantity: number;
  isActive: boolean;
  sku?: string | null;
  discountPercentage?: number | null;
  createdAt: string;
  updatedAt?: string | null;
  createdById: number;
  createdByEmail?: string | null;
  images?: ProductImage[];
  tags?: ProductTag[];
};

export type ProductCreateInput = {
  name: string;
  price: number;
  description?: string | null;
  category?: string | null;
  stockQuantity: number;
  isActive: boolean;
  sku?: string | null;
  discountPercentage?: number | null;
};

export type ProductUpdateInput = ProductCreateInput;

export type PaginatedProducts = {
  items: Product[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type ProductFilters = {
  search: string;
  category: string;
  isActive: string;
  page: number;
  pageSize: number;
};