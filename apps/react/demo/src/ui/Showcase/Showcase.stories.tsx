import type { Meta, StoryObj } from "@storybook/react";
import Component from "./Showcase.js";

const meta = {
  title: "Showcase",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
