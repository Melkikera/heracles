import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedbackService } from './feedbackService';
import type { Feedback, FeedbackCreate } from '../types/feedback';

export function useFeedback() {
  return useQuery({
    queryKey: ['feedback'],
    queryFn: feedbackService.getAll,
  });
}

export function useFeedbackById(id: number) {
  return useQuery({
    queryKey: ['feedback', id],
    queryFn: () => feedbackService.getById(id),
  });
}

export function useCreateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedbackService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
  });
}

export function useUpdateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, item }: { id: number; item: FeedbackCreate }) =>
      feedbackService.update(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
  });
}

export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedbackService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
  });
}

export function useFeedbackBySource(source: string) {
  return useQuery({
    queryKey: ['feedback', 'source', source],
    queryFn: () => feedbackService.getBySource(source),
  });
}

export function useFeedbackByStatus(status: string) {
  return useQuery({
    queryKey: ['feedback', 'status', status],
    queryFn: () => feedbackService.getByStatus(status),
  });
}

export function useFeedbackByBacklogItem(backlogItemId: number) {
  return useQuery({
    queryKey: ['feedback', 'backlog', backlogItemId],
    queryFn: () => feedbackService.getByBacklogItem(backlogItemId),
  });
}