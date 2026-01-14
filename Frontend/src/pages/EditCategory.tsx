import { useParams, useNavigate } from "react-router";
import CategoryForm from "@/components/Category/CategoryForm";
import { useUpdateCategory } from "@/features/categories/useUpdateCategory";
import { useCategory } from "@/features/categories/useCategories";

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading } = useCategory(id!);
  const { mutate, isPending } = useUpdateCategory(id as string);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!category) return null;

  return (
    <div className="flex justify-center">
      <CategoryForm
        title="Edit Category"
        description="Update category details"
        defaultValues={{
          name: category.name,
          description: category.description,
        }}
        isLoading={isPending}
        onSubmit={(data) =>
          mutate(
            { id: category._id, payload: data },
            {
              onSuccess: () => navigate("/admin"),
            }
          )
        }
      />
    </div>
  );
};

export default EditCategory;
