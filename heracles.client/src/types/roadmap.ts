export interface RoadmapItem {
  id: number;
  uuid: string;
  backlogItemId: number;
  title: string;
  startDate: string;
  endDate: string;
  quarter: string | null;
  description: string | null;
  createdById: number;
  createdBy?: {
    email: string;
  };
  backlogItem?: {
    id: number;
    createdBy: {
      email: string;
    };
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RoadmapItemCreate {
  backlogItemId: number;
  title: string;
  startDate: string;
  endDate: string;
  quarter?: string;
  description?: string;
  createdBy: {
    email: string;
  };
  backlogItem: {
    id: number;
    createdBy: {
      email: string;
    };
  };
}

export interface RoadmapItemUpdate extends RoadmapItemCreate {
  id: number;
}

export type RoadmapTimelineItem = {
  id: number;
  title: string;
  quarter: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  backlogItemId: number | null;
  backlogItemTitle: string | null;
  backlogItemType: string | null;
};