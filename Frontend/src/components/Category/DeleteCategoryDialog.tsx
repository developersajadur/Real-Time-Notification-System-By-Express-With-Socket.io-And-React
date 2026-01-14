import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCategory } from "@/features/categories/useDeleteCategory";

type DeleteCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
  categoryId: string | null;
};

const DeleteCategoryDialog = ({
  open,
  onClose,
  categoryId,
}: DeleteCategoryDialogProps) => {
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const handleDelete = () => {
    if (!categoryId) return;

    deleteCategory(categoryId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Category?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.  
            All subscriptions related to this category will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-white hover:text-white" disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryDialog;