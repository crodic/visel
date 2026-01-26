"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ImagePayload } from "@/components/form/types";
import SortableImageUpload from "@/components/form/file-upload-sortable";

// Example existing images from server
const EXISTING_IMAGES = [
  {
    id: "existing-1",
    src: "https://picsum.photos/400/300?random=1",
    alt: "Product view 1",
  },
  {
    id: "existing-2",
    src: "https://picsum.photos/400/300?random=2",
    alt: "Product view 2",
  },
  {
    id: "existing-3",
    src: "https://picsum.photos/400/300?random=3",
    alt: "Product view 3",
  },
];

interface FormData {
  images: ImagePayload[];
}

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<ImagePayload[] | null>(
    null
  );

  const form = useForm<FormData>({
    defaultValues: {
      // Initialize with existing images in order
      images: EXISTING_IMAGES.map((img, index) => ({
        type: "existing" as const,
        id: img.id,
        order: index,
      })),
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("[v0] Form submitted with ImagePayload[]:", data.images);

    // Example: Process the payload
    const result = processImagePayload(data.images);
    console.log("[v0] Processed result:", result);

    setLastSubmitted(data.images);
    setSubmitted(true);

    // Reset after 3 seconds
    // setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Image Upload with Form Integration
          </h1>
          <p className="text-muted-foreground mt-2">
            Demonstrates proper state separation: UI state vs form/submit state
            using react-hook-form.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormDescription>
                    Upload and reorder images. Existing images can be deleted,
                    and new ones can be added.
                  </FormDescription>
                  <FormControl>
                    <SortableImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      existingImages={EXISTING_IMAGES}
                      maxFiles={5}
                      maxSize={10 * 1024 * 1024}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" size="lg">
              Submit Images
            </Button>
          </form>
        </Form>

        {/* Submission Result */}
        {submitted && lastSubmitted && (
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="text-green-900 dark:text-green-100">
                Form Submitted Successfully
              </CardTitle>
              <CardDescription className="text-green-800 dark:text-green-200">
                Review the ImagePayload[] that would be sent to your server:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="border-border max-h-96 overflow-auto rounded-md border bg-white p-4 text-sm dark:bg-zinc-950">
                {JSON.stringify(
                  lastSubmitted,
                  (key, value) => {
                    // Don't stringify File objects
                    if (value instanceof File) {
                      return `[File: ${value.name}]`;
                    }
                    return value;
                  },
                  2
                )}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Documentation Card */}
        <Card>
          <CardHeader>
            <CardTitle>Component Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="mb-2 font-semibold">State Separation</h3>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>
                  <strong>UI State:</strong> Tracked uploads with
                  progress/status, drag reordering
                </li>
                <li>
                  <strong>Form State:</strong> ImagePayload[] representing user
                  intent (existing, new, deleted)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">ImagePayload Types</h3>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>
                  <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                    existing
                  </code>
                  : Keep existing image in new order
                </li>
                <li>
                  <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                    new
                  </code>
                  : Add newly uploaded file
                </li>
                <li>
                  <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                    deleted
                  </code>
                  : Remove existing image
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Key Features</h3>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>Drag and drop reordering with automatic order updates</li>
                <li>Upload progress tracking (UI only)</li>
                <li>Mixed display of existing and new images</li>
                <li>Explicit deletion tracking for existing images</li>
                <li>No server inference—payload is explicit and clear</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Example function showing how to process ImagePayload[] on the server.
 * This would typically be in a Server Action or API route.
 */
function processImagePayload(payloads: ImagePayload[]) {
  const result = {
    toDelete: [] as string[],
    toKeep: [] as { id: string; order: number }[],
    toUpload: [] as { tempId: string; fileName: string; order: number }[],
  };

  payloads.forEach((payload) => {
    if (payload.type === "deleted") {
      result.toDelete.push(payload.id);
    } else if (payload.type === "existing") {
      result.toKeep.push({ id: payload.id, order: payload.order });
    } else if (payload.type === "new") {
      result.toUpload.push({
        tempId: payload.tempId,
        fileName: payload.file.name,
        order: payload.order,
      });
    }
  });

  return result;
}
