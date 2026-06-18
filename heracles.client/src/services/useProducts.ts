// src/services/useProducts.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from './productService';
import type { ProductCreateInput, ProductUpdateInput } from '../types/product';

export function useProducts(params: { page: number; pageSize: number; search?: string; category?: string; isActive?: string }) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getPaginated(params),
    placeholderData: (previous) => previous,
  });
}

export function useProduct(id?: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id as number),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ProductCreateInput) => productService.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: ProductUpdateInput }) => productService.update(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}