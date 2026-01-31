import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CoverUpload from "@/components/reui/cover-upload";

const meta = {
  title: "reui/CoverUpload",
  component: CoverUpload,
  tags: ["autodocs"],
  argTypes: {
    maxSize: {
      control: "number",
      description: "Max file size allowed",
    },
    disabled: {
      control: "boolean",
      description: "Disable interactions",
    },
    defaultUri: {
      control: "text",
      description: "Default image URL for preview",
    },
  },
  args: {
    maxSize: 5 * 1024 * 1024,
    disabled: false,
    defaultUri: undefined,
    value: null,
  },
  render: (args) => (
    <div className="max-w-2xl p-6">
      <CoverUpload {...args} onChange={(v) => console.log("value:", v)} />
    </div>
  ),
} satisfies Meta<typeof CoverUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultImage: Story = {
  args: {
    defaultUri: "https://placekitten.com/1200/514",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultUri: "https://placekitten.com/1200/514",
  },
};
