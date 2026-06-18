import apiClient from '../api/apiClient';
import type { Feedback, FeedbackCreate } from '../types/feedback';

export const feedbackService = {
  getAll: async () => {
    const response = await apiClient.get<Feedback[]>('/feedback');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Feedback>(`/feedback/${id}`);
    return response.data;
  },

  create: async (item: FeedbackCreate) => {
    console.log('Creating feedback item:', item); // Debugging line to check the item being sent
    const response = await apiClient.post<Feedback>('/feedback', item);
    return response.data;
  },

  update: async (id: number, item: FeedbackCreate) => {
    const response = await apiClient.put<Feedback>(`/feedback/${id}`, item);
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/feedback/${id}`);
  },

  getByBacklogItem: async (backlogItemId: number) => {
    const response = await apiClient.get<Feedback[]>(`/feedback/backlog/${backlogItemId}`);
    return response.data;
  },

  getBySource: async (source: string) => {
    const response = await apiClient.get<Feedback[]>(`/feedback/source/${source}`);
    return response.data;
  },

  getByStatus: async (status: string) => {
    const response = await apiClient.get<Feedback[]>(`/feedback/status/${status}`);
    return response.data;
  },
};