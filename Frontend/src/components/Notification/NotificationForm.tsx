/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/features/categories/useCategories";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  message: z.string().min(10, "Message is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export type NotificationFormValues = z.infer<typeof schema>;

type Props = {
  onSubmit: (data: NotificationFormValues) => void;
  isLoading?: boolean;
  defaultValues?: Partial<NotificationFormValues>;
  mode?: "create" | "edit";
};

export default function NotificationForm({
  onSubmit,
  isLoading,
  defaultValues,
  mode = "create",
}: Props) {
 const { data: categories = [] } = useCategories() as any;
  const categoryList = categories?.data || [] as any[];

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      message: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <Card className="max-w-xl w-full">
      <CardHeader>
        <CardTitle>
          {mode === "edit" ? "Edit Notification" : "Create Notification"}
        </CardTitle>
        <CardDescription>
          {mode === "edit"
            ? "Update existing notification"
            : "Send a notification to subscribed users"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* TITLE */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MESSAGE */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryList.map((cat: any) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : mode === "edit"
                ? "Update Notification"
                : "Create Notification"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
