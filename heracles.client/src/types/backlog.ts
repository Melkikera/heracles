export interface BacklogItem {
  id: number;
  uuid: string;
  title: string;
  description: string | null;
  type: 'feature' | 'bug' | 'initiative';
  status: 'idea' | 'in_progress' | 'done';
  priority: number;
  createdById: number;
  createdBy?: {
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BacklogItemCreate {
  title: string;
  description?: string;
  type: 'feature' | 'bug' | 'initiative';
  status?: 'idea' | 'in_progress' | 'done';
  priority?: number;
  createdBy: { email: string };
}

export interface BacklogItemUpdate extends BacklogItemCreate {
  id: number;
}