"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SortableFormImageUpload from "@/components/form/sortable-form";

const formSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  });

  function onSubmit(values: FormValues) {
    console.log("Form submitted with images:", values);
    setSubmitted(values);
  }

  console.log("First file: ", form.getValues("images")[0]);

  return (
    <main className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Image Upload Form
          </h1>
          <p className="text-muted-foreground">
            Upload and organize your images with drag-and-drop reordering
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>
              Upload images and organize them by dragging to reorder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <SortableFormImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          maxFiles={10}
                          maxSize={10 * 1024 * 1024}
                          defaultUrls={[
                            "https://plus.unsplash.com/premium_photo-1669828434908-c71eb9dad5e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://images.unsplash.com/photo-1768728186759-d5dd600612eb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_photo-1768053968250-c1ea4a302653?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://images11.unsplash.com/photo-1761839256840-7780a45b85dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                          ]}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload multiple images and drag to reorder them. The
                        order will be saved when you submit.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setSubmitted(null);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Submission Result */}
        {submitted && (
          <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="text-green-900 dark:text-green-100">
                Form Submitted Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Files submitted ({submitted.images.length}):</strong>
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-green-700 dark:text-green-300">
                  {submitted.images.map((file, index) => (
                    <li key={`${file.name}-${index}`}>
                      {index + 1}. {file.name} (
                      {(file.size / 1024 / 1024).toFixed(2)}MB)
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
