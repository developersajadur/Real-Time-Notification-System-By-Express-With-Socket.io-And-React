"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNotification } from "@/features/notifications/useNotification";

type Props = {
  id: string | null;
  open: boolean;
  onClose: () => void;
};

const NotificationViewModal = ({ id, open, onClose }: Props) => {
  const { data, isLoading } = useNotification(id ?? undefined);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Notification Details</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Loading notification...
          </p>
        )}

        {data && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {data.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(data.createdAt).toLocaleString()}
              </p>
            </div>

            <Separator />

            <p className="text-sm leading-relaxed">
              {data.message}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <Badge variant="outline">
                {data.categoryId.name}
              </Badge>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationViewModal;
