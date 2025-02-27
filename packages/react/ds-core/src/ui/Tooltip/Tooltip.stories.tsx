import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "../Button/index.js";
import Component from "./Tooltip.js";

const meta = {
  title: "Tooltip",
  component: Component,
  // Add padding to all tooltips to allow their entire contents to be visible
  decorators: [
    (Story) => (
      <div style={{ padding: "3rem", backgroundColor: "gray" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Hello world",
    children: <Button label="Default" />,
  },
};

export const TopLeft: Story = {
  args: {
    message: "Hello world",
    position: "topLeft",
    children: <Button label="Top Left" />,
  },
};

export const TopCenter: Story = {
  args: {
    message: "Hello world",
    position: "topCenter",
    children: <Button label="Top Center" />,
  },
};

export const TopRight: Story = {
  args: {
    message: "Hello world",
    position: "topRight",
    children: <Button label="Top Right" />,
  },
};

export const Left: Story = {
  args: {
    message: "Hello world",
    position: "left",
    children: <Button label="Left" />,
  },
};

export const Right: Story = {
  args: {
    message: "Hello world",
    position: "right",
    children: <Button label="Right" />,
  },
};

export const BottomLeft: Story = {
  args: {
    message: "Hello world",
    position: "btmLeft",
    children: <Button label="Bottom Left" />,
  },
};

export const BottomCenter: Story = {
  args: {
    message: "Hello world",
    position: "btmCenter",
    children: <Button label="Bottom Center" />,
    autoAdjust: true,
  },
};

export const BottomRight: Story = {
  args: {
    message: "Hello world",
    position: "btmRight",
    children: <Button label="Bottom Right" />,
  },
};

export const AutoAdjust: Story = {
  args: {
    message: "Hello world",
    autoAdjust: true,
    position: "left",
    children: <Button label="Auto Adjusted left" />,
  },
};

export const Detached: Story = {
  args: {
    message: "Hello world",
    autoAdjust: true,
    detached: true,
    position: "btmRight",
    children: <Button label="Detached bottom right" />,
  },
};
