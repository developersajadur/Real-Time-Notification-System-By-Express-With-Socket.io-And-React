
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useNotifications } from "@/features/notifications/useNotifications";
import { useDeleteNotification } from "@/features/notifications/useDeleteNotification";
import Pagination from "@/components/common/Pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import NotificationViewModal from "./NotificationViewModal";

const PAGE_LIMIT = 10;

const NotificationList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [viewId, setViewId] = useState<string | null>(null);

  const { data, isLoading } = useNotifications(page, PAGE_LIMIT);
  const { mutate: deleteNotification, isPending } =
    useDeleteNotification();

  const notifications = data?.data ?? [];
  const meta = data?.meta;

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }
  
  if (notifications.length === 0) {
    return <p className="text-sm text-muted-foreground">No notifications found.</p>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right w-36">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {notifications.map(n => (
              <TableRow key={n._id}>
                <TableCell className="font-medium">
                  {n.title}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {typeof n.categoryId === "string"
                    ? "—"
                    : n.categoryId.name}
                </TableCell>

                <TableCell className="text-right space-x-2">
  
                  <Button
                  className="text-white hover:text-white"
                    size="icon"
                    variant="ghost"
                    onClick={() => setViewId(n._id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

        
                  <Button
                  className="text-white hover:text-white"
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      navigate(
                        `/admin/notifications/edit/${n._id}`
                      )
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete notification?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-white hover:text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isPending}
                          onClick={() =>
                            deleteNotification(n._id)
                          }
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {meta && meta.totalPages > 1 && (
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      <NotificationViewModal
        id={viewId}
        open={!!viewId}
        onClose={() => setViewId(null)}
      />
    </>
  );
};

export default NotificationList;
