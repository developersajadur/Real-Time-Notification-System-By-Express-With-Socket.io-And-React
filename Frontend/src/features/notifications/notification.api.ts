import axios from "@/lib/axios";
import type { PaginatedNotifications } from "./notification.types";

export const createNotification = (payload: {
  title: string;
  message: string;
  categoryId: string;
}) => {
  return axios.post("/notifications/create", payload).then(res => res.data.data);
};

export const getNotifications = async (
  page = 1,
  limit = 10
): Promise<PaginatedNotifications> => {
  const res = await axios.get(
    `/notifications/all?page=${page}&limit=${limit}`
  );

  return res.data;
};

export const getNotificationById = (id: string) => {
  return axios
    .get(`/notifications/all/${id}`)
    .then(res => res.data.data);
};

export const deleteNotification = (id: string) => {
  return axios.delete(`/notifications/${id}`);
};

export const updateNotification = ({
  id,
  payload,
}: {
  id: string;
  payload: {
    title: string;
    message: string;
    categoryId: string;
  };
}) => {
  return axios.patch(`/notifications/update/${id}`, payload);
};
