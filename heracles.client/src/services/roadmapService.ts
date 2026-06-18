import apiClient from '../api/apiClient';
import type { RoadmapItem ,RoadmapItemCreate} from '../types/roadmap';

export const roadmapService = {
  getAll: async () => {
    const response = await apiClient.get<RoadmapItem[]>('/roadmap');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<RoadmapItem>(`/roadmap/${id}`);
    return response.data;
  },

  create: async (item: RoadmapItemCreate) => {
    console.log('Creating roadmap item:', item);
    const response = await apiClient.post<RoadmapItem>('/roadmap', item);
    console.log('Created roadmap item:', response.data);
    return response.data;
  },

  update: async (id: number, item: RoadmapItemCreate) => {
    const response = await apiClient.put<RoadmapItem>(`/roadmap/${id}`, item);
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/roadmap/${id}`);
  },

  getByBacklogItem: async (backlogItemId: number) => {
    const response = await apiClient.get<RoadmapItem[]>(`/roadmap/backlog/${backlogItemId}`);
    return response.data;
  },

  getByQuarter: async (quarter: string) => {
    const response = await apiClient.get<RoadmapItem[]>(`/roadmap/quarter/${quarter}`);
    return response.data;
  },

  getByDateRange: async (start: string, end: string) => {
    const response = await apiClient.get<RoadmapItem[]>(`/roadmap/dates?start=${start}&end=${end}`);
    return response.data;
  },
};