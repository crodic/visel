import SortableImageUpload from "@/components/reui/sortable-image-upload";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

// 👆 Update path về đúng component của bạn

/**
 * A sortable image uploader supporting:
 * - existing images
 * - new image uploads
 * - drag & drop sorting
 * - remove / delete
 * - upload progress simulation
 */
const meta = {
  title: "ui/SortableImageUpload",
  component: SortableImageUpload,
  tags: ["autodocs"],
  argTypes: {
    maxFiles: {
      control: "number",
      description: "Maximum number of images allowed",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size allowed",
    },
    disabled: {
      control: "boolean",
      description: "Disable all interactions",
    },
  },
  args: {
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    disabled: false,
    existingImages: [],
    value: [],
  },
  render: (args) => {
    return (
      <div className="p-6">
        <SortableImageUpload
          {...args}
          onChange={(v) => console.log("update payload:", v)}
        />
      </div>
    );
  },
} satisfies Meta<typeof SortableImageUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithExistingImages: Story = {
  args: {
    existingImages: [
      {
        id: "img-1",
        src: "https://placekitten.com/200/200",
        alt: "Kitten A",
      },
      {
        id: "img-2",
        src: "https://placekitten.com/210/210",
        alt: "Kitten B",
      },
    ],
    value: [
      { type: "existing", id: "img-1", order: 0 },
      { type: "existing", id: "img-2", order: 1 },
    ],
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    existingImages: [
      {
        id: "img-1",
        src: "https://placekitten.com/200/200",
        alt: "Disabled kitten",
      },
    ],
    value: [{ type: "existing", id: "img-1", order: 0 }],
  },
};

export const MaxFilesReached: Story = {
  args: {
    maxFiles: 1,
    existingImages: [
      {
        id: "img-1",
        src: "https://placekitten.com/200/200",
      },
    ],
    value: [{ type: "existing", id: "img-1", order: 0 }],
  },
};

/**
 * Upload interaction test:
 * - Click Browse File (should open input)
 * - Mock file upload event
 * - Verify new image preview appears
 * - Remove image
 */
export const ShouldUploadAndRemoveImage: Story = {
  name: "Should upload a file and remove it",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Browse File button
    const browseButton = await canvas.findByRole("button", {
      name: /browse file/i,
    });
    await userEvent.click(browseButton);

    // Locate hidden file input
    const fileInput = document.querySelector(
      "input[type='file']",
    ) as HTMLInputElement;

    const mockFile = new File(["dummy"], "demo.png", { type: "image/png" });
    await waitFor(() => {
      const dt = new DataTransfer();
      dt.items.add(mockFile);
      fileInput.files = dt.files;
      fileInput.dispatchEvent(new Event("change"));
    });

    // Verify preview appears
    await waitFor(async () => {
      const images = await canvas.findAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
    });

    // Remove the uploaded image
    const removeButtons = await canvas.findAllByRole("button", {
      name: "",
    });
    await userEvent.click(removeButtons[removeButtons.length - 1]);

    // Image should be removed
    await waitFor(async () => {
      const imgs = canvas.queryAllByRole("img");
      expect(imgs.length).toBe(0);
    });
  },
};
