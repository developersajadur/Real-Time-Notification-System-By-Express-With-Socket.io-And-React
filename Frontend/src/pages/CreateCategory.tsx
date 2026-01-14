import CategoryForm from "@/components/Category/CategoryForm";
import { useCreateCategory } from "@/features/categories/useCreateCategory";

const CreateCategory = () => {
  const { mutate, isPending } = useCreateCategory();

  return (
    <div className="flex justify-center">
      <CategoryForm
        title="Create Category"
        description="Create a new notification category"
        isLoading={isPending}
        onSubmit={(data) => mutate(data)}
      />
    </div>
  );
};

export default CreateCategory;
