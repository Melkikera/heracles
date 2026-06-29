// src/services/useProducts.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from './productService';
import type {
  ProductCreateInput,
  ProductUpdateInput,
  ProductFilters,
  PaginatedProducts,
  Product,
} from '../types/product';

export type ProductApiFilters = Omit<ProductFilters, 'isActive'> & {
  isActive?: boolean;
};

function normalizeProductFilters(filters: ProductFilters): ProductApiFilters {
  return {
    ...filters,
    isActive:
      filters.isActive === ''
        ? undefined
        : filters.isActive === 'true',
  };
}

export function useProducts(filters: ProductFilters) {
  const normalized = normalizeProductFilters(filters);

  return useQuery<PaginatedProducts>({
    queryKey: ['products', normalized],
    queryFn: () => productService.getPaginated(normalized),
    placeholderData: (previous) => previous,
  });
}

export function useProductSearch(term: string, page: number, pageSize: number, isActive?: boolean) {
  const enabled = term.trim().length > 0;

  return useQuery<PaginatedProducts>({
    queryKey: ['products', 'search', term, page, pageSize, isActive],
    queryFn: () =>
      productService.search({
        term: term.trim(),
        page,
        pageSize,
        isActive,
      }),
    enabled,
    placeholderData: (previous) => previous,
  });
}

export function useProduct(id?: number) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id as number),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProductCreateInput) => productService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: ProductUpdateInput }) =>
      productService.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}