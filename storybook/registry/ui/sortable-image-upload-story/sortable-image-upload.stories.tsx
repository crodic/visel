import SortableImageUpload from "@/components/reui/sortable-image-upload";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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
  title: "reui/SortableImageUpload",
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
