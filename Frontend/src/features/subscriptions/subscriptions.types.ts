export interface ISubscribedCategory {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface IMySubscription {
  _id: string;
  userId: string;
  categoryIds: ISubscribedCategory[];
  createdAt: string;
  updatedAt: string;
}
