/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Pencil, Trash2 } from "lucide-react";
import DeleteCategoryDialog from "@/components/Category/DeleteCategoryDialog";
import { useCategories } from "@/features/categories/useCategories";
import { Link } from "react-router";

type CategoryListProps = {
  onEdit?: (id: string) => void;
};

const CategoryList = ({ onEdit }: CategoryListProps) => {
  const { data: categories = [], isLoading } = useCategories();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="rounded-md border p-6 text-center text-muted-foreground">
        Loading categories...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-30 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category: any) => (
              <TableRow key={category._id}>
                <TableCell className="font-medium">
                  {category.name}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {category.description || "—"}
                </TableCell>

                <TableCell className="text-right space-x-2">
                  <Link to={`/admin/categories/edit/${category._id}`}>
                                    <Button
                  className="text-white hover:text-white"
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit?.(category._id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  </Link>


                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => setDeleteId(category._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {categories.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-8 text-center text-muted-foreground"
                >
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteCategoryDialog
        open={!!deleteId}
        categoryId={deleteId}
        onClose={() => setDeleteId(null)}
      />
    </>
  );
};

export default CategoryList;
