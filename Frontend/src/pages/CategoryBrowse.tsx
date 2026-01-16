/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState } from "react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/common/Pagination";
import { useCategories } from "@/features/categories/useCategories";
import { useMySubscriptions } from "@/features/subscriptions/useMySubscriptions";
import { useSubscribeCategory } from "@/features/subscriptions/useSubscribeCategory";
import { useUnsubscribeCategory } from "@/features/subscriptions/useUnsubscribeCategory";
import CategoryCard from "@/components/Category/CategoryCard";

const PAGE_LIMIT = 8;

const CategoryBrowse = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useCategories(
    page,
    PAGE_LIMIT,
    search
  ) as any;

  const { data: subs } = useMySubscriptions();
  const subscribedIds =
    subs?.categoryIds?.map((c: any) => c._id) ?? [];

  const { mutate: subscribe, isPending: subLoading } =
    useSubscribeCategory();
  const { mutate: unsubscribe, isPending: unSubLoading } =
    useUnsubscribeCategory();
    console.log(unsubscribe, "fdfdf");

  const categories = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-4">

      {/* Search */}
      <Input
        placeholder="Search categories..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        className="max-w-sm"
      />

      {/* List */}
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat: any) => {
          const isSubscribed = subscribedIds.includes(cat._id);

          return (
            <CategoryCard
              key={cat._id}
              category={cat}
              isSubscribed={isSubscribed}
              loading={subLoading || unSubLoading}
              onSubscribe={() => subscribe(cat._id)}
              onUnsubscribe={() => unsubscribe(cat._id)}
            />
          );
        })}
      </div>

      {!isLoading && categories.length === 0 && (
        <div className="text-center text-muted-foreground">
          No categories found
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default CategoryBrowse;
