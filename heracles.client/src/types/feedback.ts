export interface Feedback {
  id: number;
  uuid: string;
  backlogItemId: number | null;
  title: string;
  description: string;
  source: 'direct' | 'support' | 'sale' | 'other';
  status: 'new' | 'linked' | 'ignored';
  createdById: number;
  createdBy?: {
    email: string;
  };
  backlogItem?: {
    title: string;
    type: string;
    status: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FeedbackCreate {
  backlogItemId?: number;
  title: string;
  description: string;
  source: 'direct' | 'support' | 'sale' | 'other';
  status?: 'new' | 'linked' | 'ignored';
  createdBy: {
    email: string;
  };
}

export interface FeedbackUpdate extends FeedbackCreate {
  id: number;
}