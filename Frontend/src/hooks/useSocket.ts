import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { useMe } from "@/features/auth/useMe";

export const useSocket = () => {
  const { data: user } = useMe();

  useEffect(() => {
    if (user) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [user]);
};
