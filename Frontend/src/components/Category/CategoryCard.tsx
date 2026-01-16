import { Button } from "@/components/ui/button";
import type { ICategory } from "@/features/categories/category.types";

type Props = {
  category: ICategory;
  isSubscribed: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  loading?: boolean;
};

export default function CategoryCard({
  category,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
  loading,
}: Props) {
  return (
    <div className="rounded-lg border p-4 flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{category.name}</h3>
        <p className="text-sm text-muted-foreground">
          {category.description}
        </p>
      </div>

      {isSubscribed ? (
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 hover:text-red-500"
          disabled={loading}
          onClick={onUnsubscribe}
        >
          Unsubscribe
        </Button>
      ) : (
        <Button
          size="sm"
          disabled={loading}
          onClick={onSubscribe}
        >
          Subscribe
        </Button>
      )}
    </div>
  );
}
