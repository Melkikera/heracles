import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { backlogService } from './backlogService';
import type { BacklogItem } from '../types/backlog';

export function useBacklog() {
  return useQuery({
    queryKey: ['backlog'],
    queryFn: backlogService.getAll,
  });
}

export function useBacklogById(id: number) {
  return useQuery({
    queryKey: ['backlog', id],
    queryFn: () => backlogService.getById(id),
  });
}

export function useCreateBacklog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: backlogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backlog'] });
    },
  });
}

export function useUpdateBacklog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, item }: { id: number; item: BacklogItem }) =>
      backlogService.update(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backlog'] });
      queryClient.invalidateQueries({ queryKey: ['backlog', 'update'] });
    },
  });
}

export function useDeleteBacklog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: backlogService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backlog'] });
    },
  });
}

export function useBacklogByType(type: string) {
  return useQuery({
    queryKey: ['backlog', 'type', type],
    queryFn: () => backlogService.getByType(type),
  });
}

export function useBacklogByStatus(status: string) {
  return useQuery({
    queryKey: ['backlog', 'status', status],
    queryFn: () => backlogService.getByStatus(status),
  });
}