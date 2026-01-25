/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import { useCallback, useState, useRef } from "react";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/radix-ui/alert";
import { Button } from "@/components/radix-ui/button";
import { Card, CardContent } from "@/components/radix-ui/card";
import { Progress } from "@/components/radix-ui/progress";
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import {
  CircleX,
  CloudUpload,
  GripVertical,
  ImageIcon,
  TriangleAlert,
  XIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface SortableFormImageUploadProps {
  // Form field props
  value?: File[]; // Array of File objects in order
  onChange?: (value: File[]) => void;
  disabled?: boolean;

  // Upload props
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  onImagesChange?: (images: ImageFile[]) => void;
  onUploadComplete?: (images: ImageFile[]) => void;
}

interface SortableImage {
  id: string;
}

export default function SortableFormImageUpload({
  value = [],
  onChange,
  disabled = false,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = "image/*",
  className,
  onImagesChange,
  onUploadComplete,
}: SortableFormImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const imagesRef = useRef<ImageFile[]>([]);
  const [allImages, setAllImages] = useState<SortableImage[]>([]); // Declare allImages

  // Helper function to create sorted File array from current images
  const getSortedFiles = useCallback((): File[] => {
    return imagesRef.current.map((img) => img.file);
  }, []);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "File must be an image";
    }
    if (file.size > maxSize) {
      return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    if (images.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    return null;
  };

  const addImages = useCallback(
    (files: FileList | File[]) => {
      if (disabled) return;

      const newImages: ImageFile[] = [];
      const newErrors: string[] = [];

      Array.from(files).forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(`${file.name}: ${error}`);
          return;
        }

        const imageFile: ImageFile = {
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "uploading",
        };

        newImages.push(imageFile);
      });

      if (newErrors.length > 0) {
        setErrors((prev) => [...prev, ...newErrors]);
      }

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        imagesRef.current = updatedImages;
        setImages(updatedImages);
        onImagesChange?.(updatedImages);

        // Notify form of new files
        onChange?.(getSortedFiles());

        // Simulate upload progress
        newImages.forEach((imageFile) => {
          simulateUpload(imageFile);
        });
      }
    },
    [
      images,
      maxSize,
      maxFiles,
      disabled,
      onImagesChange,
      onChange,
      getSortedFiles,
    ]
  );

  const simulateUpload = (imageFile: ImageFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setImages((prev) =>
          prev.map((img) =>
            img.id === imageFile.id
              ? { ...img, progress: 100, status: "completed" as const }
              : img
          )
        );

        // Check if all uploads are complete
        const updatedImages = images.map((img) =>
          img.id === imageFile.id
            ? { ...img, progress: 100, status: "completed" as const }
            : img
        );

        if (updatedImages.every((img) => img.status === "completed")) {
          onUploadComplete?.(updatedImages);
        }
      } else {
        setImages((prev) =>
          prev.map((img) =>
            img.id === imageFile.id ? { ...img, progress } : img
          )
        );
      }
    }, 100);
  };

  const removeImage = useCallback(
    (id: string) => {
      if (disabled) return;

      // If it's an uploaded image, also remove from images array and revoke URL
      const uploadedImage = images.find((img) => img.id === id);
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage.preview);
        const updated = images.filter((img) => img.id !== id);
        imagesRef.current = updated;
        setImages(updated);

        // Notify form of new files
        onChange?.(getSortedFiles());
      }
    },
    [images, disabled, onChange, getSortedFiles]
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        addImages(files);
      }
    },
    [disabled, addImages]
  );

  const openFileDialog = useCallback(() => {
    if (disabled) return;

    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = accept;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        addImages(target.files);
      }
    };
    input.click();
  }, [accept, disabled, addImages]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div
      className={cn(
        "w-full max-w-4xl",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {/* Instructions */}
      <div className="mb-4 text-center">
        <p className="text-muted-foreground text-sm">
          Upload up to {maxFiles} images (JPG, PNG, GIF, WebP, max{" "}
          {formatBytes(maxSize)} each). <br />
          Drag and drop images to reorder.
          {images.length > 0 && ` ${images.length}/${maxFiles} uploaded.`}
        </p>
      </div>

      {/* Image Grid with Sortable */}
      {images.length > 0 && (
        <div className="mb-6">
          <Sortable
            value={images.map((item) => item.id)}
            onValueChange={(newItemIds) => {
              // Reorder images based on sortable change
              const newImages = newItemIds
                .map((itemId) => images.find((img) => img.id === itemId))
                .filter((item): item is ImageFile => item !== undefined);

              imagesRef.current = newImages;
              setImages(newImages);
              // Notify form of new files in order
              onChange?.(newImages.map((img) => img.file));

              toast.success("Images reordered successfully!", {
                duration: 3000,
              });
            }}
            getItemValue={(item) => item}
            strategy="grid"
            className="grid auto-rows-fr grid-cols-5 gap-2.5"
            onDragStart={(event) => setActiveId(event.active.id as string)}
            onDragEnd={() => setActiveId(null)}
            // disabled={disabled}
          >
            {images.map((item) => (
              <SortableItem key={item.id} value={item.id}>
                <div className="bg-accent/50 group border-border hover:bg-accent/70 relative flex shrink-0 items-center justify-center rounded-md border shadow-none transition-all duration-200 hover:z-10 data-[dragging=true]:z-50">
                  <img
                    src={item.preview || "/placeholder.svg"}
                    className="pointer-events-none h-30 w-full rounded-md object-cover"
                    alt={item.file.name}
                  />

                  {/* Drag Handle */}
                  <SortableItemHandle className="absolute start-2 top-2 cursor-grab opacity-0 group-hover:opacity-100 active:cursor-grabbing">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-6 rounded-full bg-transparent"
                      disabled={disabled}
                    >
                      <GripVertical className="size-3.5" />
                    </Button>
                  </SortableItemHandle>

                  {/* Remove Button Overlay */}
                  <Button
                    onClick={() => removeImage(item.id)}
                    variant="outline"
                    size="icon"
                    className="absolute end-2 top-2 size-6 rounded-full opacity-0 shadow-sm group-hover:opacity-100"
                    disabled={disabled}
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              </SortableItem>
            ))}
          </Sortable>
        </div>
      )}

      {/* Upload Area */}
      <Card
        className={cn(
          "rounded-md border-dashed shadow-none transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="text-center">
          <div className="border-border mx-auto mb-3 flex size-[32px] items-center justify-center rounded-full border">
            <CloudUpload className="size-4" />
          </div>
          <h3 className="text-2sm text-foreground mb-0.5 font-semibold">
            Choose a file or drag & drop here.
          </h3>
          <span className="text-secondary-foreground mb-3 block text-xs font-normal">
            JPEG, PNG, up to {formatBytes(maxSize)}.
          </span>
          <Button
            size="sm"
            type="button"
            variant="mono"
            onClick={openFileDialog}
            disabled={disabled}
          >
            Browse File
          </Button>
        </CardContent>
      </Card>

      {/* Upload Progress Cards */}
      {images.length > 0 && (
        <div className="mt-6 space-y-3">
          {images.map((imageFile) => (
            <Card key={imageFile.id} className="rounded-md shadow-none">
              <CardContent className="flex items-center gap-2 p-3">
                <div className="border-border flex size-[32px] shrink-0 items-center justify-center rounded-md border">
                  <ImageIcon className="text-muted-foreground size-4" />
                </div>
                <div className="flex w-full flex-col gap-1.5">
                  <div className="-mt-2 flex w-full items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-foreground text-xs leading-none font-medium">
                        {imageFile.file.name}
                      </span>
                      <span className="text-muted-foreground text-xs leading-none font-normal">
                        {formatBytes(imageFile.file.size)}
                      </span>
                      {imageFile.status === "uploading" && (
                        <p className="text-muted-foreground text-xs">
                          Uploading... {Math.round(imageFile.progress)}%
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => removeImage(imageFile.id)}
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      disabled={disabled}
                    >
                      <CircleX className="size-3.5" />
                    </Button>
                  </div>

                  <Progress
                    value={imageFile.progress}
                    className={cn(
                      "h-1 transition-all duration-300",
                      "[&>div]:bg-zinc-950 dark:[&>div]:bg-zinc-50"
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-5">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>File upload error(s)</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
    </div>
  );
}
