// src/services/productService.ts
import apiClient from '../api/apiClient';
import type { PaginatedProducts, Product, ProductCreateInput, ProductUpdateInput } from '../types/product';

export const productService = {
  getPaginated: async (params: {
    page: number;
    pageSize: number;
    search?: string;
    category?: string;
    isActive?: boolean;
  }) => {
    const response = await apiClient.get<PaginatedProducts>('/products/paginated', {
      params,
    });
    return response.data;
  },

  search: async (params: {
    term: string;
    page: number;
    pageSize: number;
    isActive?: boolean;
  }) => {
    const response = await apiClient.get<PaginatedProducts>('/products/search', {
      params,
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (input: ProductCreateInput) => {
    const response = await apiClient.post<Product>('/products', input);
    return response.data;
  },

  update: async (id: number, input: ProductUpdateInput) => {
    const response = await apiClient.put<Product>(`/products/${id}`, input);
    return response.data;
  },

  remove: async (id: number) => {
    await apiClient.delete(`/products/${id}`);
  },
};