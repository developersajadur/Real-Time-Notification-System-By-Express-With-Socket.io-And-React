export interface INotification {
  _id: string;
  title: string;
  message: string;
  categoryId: INotificationCategoryId;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationCategoryId{
  _id: string;
  name: string;
  description: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedNotifications {
  data: INotification[];
  meta: IPaginationMeta;
}


export interface IUserNotification {
  _id: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  notificationId: {
    _id: string;
    title: string;
    message: string;
    categoryId: string;
    createdAt: string;
  };
}
