
import { Button } from "@/components/ui/button";
import CategoryList from "@/pages/CategoryList";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const AllCategoryList = () => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage notification categories
          </p>
        </div>

        <Button onClick={() => navigate("/admin/categories/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Category
        </Button>
      </div>

      {/* Table */}
      <CategoryList onEdit={handleEdit} />
    </div>
  );
};

export default AllCategoryList;
