import apiClient from '../api/apiClient';
import type { BacklogItem } from '../types/backlog';

export const backlogService = {
  getAll: async () => {
    const response = await apiClient.get<BacklogItem[]>('/backlog');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<BacklogItem>(`/backlog/${id}`);
    return response.data;
  },

  create: async (item: BacklogItem) => {
    console.log('Creating backlog item:', item);
    const response = await apiClient.post<BacklogItem>('/backlog', item);
    return response.data;
  },

  update: async (id: number, item: BacklogItem) => {
    const response = await apiClient.put<BacklogItem>(`/backlog/${id}`, item);
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/backlog/${id}`);
  },

  getByType: async (type: string) => {
    const response = await apiClient.get<BacklogItem[]>(`/backlog/type/${type}`);
    return response.data;
  },

  getByStatus: async (status: string) => {
    const response = await apiClient.get<BacklogItem[]>(`/backlog/status/${status}`);
    return response.data;
  },
};