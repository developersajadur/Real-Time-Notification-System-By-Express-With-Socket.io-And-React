import CategoryForm from "@/components/Category/CategoryForm";
import { useCreateCategory } from "@/features/categories/useCreateCategory";
import { useNavigate } from "react-router";

const CreateCategory = () => {
  const { mutate, isPending } = useCreateCategory();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <CategoryForm
        title="Create Category"
        description="Create a new notification category"
        isLoading={isPending}
        onSubmit={(data) =>
          mutate(data, {
            onSuccess: () => navigate("/admin/categories"),
          })
        }
      />
    </div>
  );
};

export default CreateCategory;
