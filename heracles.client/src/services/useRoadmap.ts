import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roadmapService } from './roadmapService';
import type { RoadmapItemCreate } from '../types/roadmap';

export function useRoadmap() {
  return useQuery({
    queryKey: ['roadmap'],
    queryFn: roadmapService.getAll,
  });
}

export function useRoadmapById(id: number) {
  return useQuery({
    queryKey: ['roadmap', id],
    queryFn: () => roadmapService.getById(id),
  });
}

export function useCreateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roadmapService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmap'] });
    },
  });
}

export function useUpdateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, item }: { id: number; item: RoadmapItemCreate }) =>
      roadmapService.update(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmap'] });
    },
  });
}

export function useDeleteRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roadmapService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmap'] });
    },
  });
}

export function useRoadmapByQuarter(quarter: string) {
  return useQuery({
    queryKey: ['roadmap', 'quarter', quarter],
    queryFn: () => roadmapService.getByQuarter(quarter),
  });
}

export function useRoadmapByBacklogItem(backlogItemId: number) {
  return useQuery({
    queryKey: ['roadmap', 'backlog', backlogItemId],
    queryFn: () => roadmapService.getByBacklogItem(backlogItemId),
  });
}

export function useRoadmapTimeline() {
  return useQuery({
    queryKey: ['roadmap', 'timeline'],
    queryFn: roadmapService.getTimeline,
  });
}