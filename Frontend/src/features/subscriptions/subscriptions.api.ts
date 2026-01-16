import axios from "@/lib/axios";
import type { IMySubscription } from "./subscriptions.types";

export const getNotificationByCategory = async (): Promise<IMySubscription> => {
  const res = await axios.get("/subscriptions/me");
  return res.data.data;
};

export const subscribeCategory = async (categoryId: string) => {
  await axios.post(`/subscriptions/subscribe/${categoryId}`);
};


export const unsubscribeCategory = async (categoryId: string) => {
  await axios.post(`/subscriptions/unsubscribe/${categoryId}`);
};
