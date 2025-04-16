import type { Meta, StoryFn, StoryObj } from "@storybook/react";

import { useEffect, useState } from "react";
import { Button } from "../../../Button/index.js";
import type {
  BestPosition,
  WindowFitmentDirection,
} from "../../../hooks/index.js";
import Component from "./TooltipArea.js";

const meta = {
  title: "Tooltip/TooltipArea",
  component: Component,
  // Add padding to all tooltips to allow their entire contents to be visible
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Message: "Hello world",
    children: <Button label="Default" />,
  },
};

export const Top: Story = {
  args: {
    Message: "Hello world",
    preferredDirections: ["top"],
    children: <Button label="Top" />,
  },
};

export const Left: Story = {
  args: {
    Message: "Hello world",
    preferredDirections: ["left"],
    children: <Button label="Left" />,
  },
};

export const Right: Story = {
  args: {
    Message: "Hello world",
    preferredDirections: ["right", "top"],
    children: <Button label="Right" />,
  },
};

export const Bottom: Story = {
  args: {
    Message: "Hello world",
    preferredDirections: ["bottom", "top", "left", "right"],
    children: <Button label="Bottom" />,
  },
};

export const Wrapping: Story = {
  args: {
    Message: (
      <span>
        orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </span>
    ),
    children: <Button label="Wrapping" />,
  },
};

export const Changeable: StoryFn = () => {
  const options: WindowFitmentDirection[] = ["top", "right", "bottom", "left"];

  const [bestPosition, setBestPosition] = useState<BestPosition | undefined>(
    undefined,
  );

  const [preferredDirection, setPreferredDirection] = useState(options[0]);

  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    setPreferredDirection(options[changeCount % options.length]);
  }, [changeCount]);

  return (
    <Component
      Message={bestPosition?.positionName}
      preferredDirections={[preferredDirection]}
      onBestPositionChange={(p) => setBestPosition(p)}
    >
      <Button
        label="Click to change direction"
        onClick={() => setChangeCount((prev) => prev + 1)}
      />
    </Component>
  );
};

export const Inline: StoryFn = () => {
  return (
    <p style={{ color: "white" }}>
      I am a paragraph using a&nbsp;
      <Component Message="This is a tooltip describing the word">
        {/* biome-ignore lint/a11y/useValidAnchor: Allow invalid link href for showing a link in the story */}
        <a href={"#"}>word</a>
      </Component>
      &nbsp;that needs further explanation, which will be provided via a
      tooltip.
    </p>
  );
};

export const AutoFit: StoryFn = () => {
  return (
    <Component
      Message={"This is autofit"}
      preferredDirections={["top"]}
      autoFit={true}
      style={{ position: "absolute", bottom: 0, left: 0 }}
    >
      <Button label={"Autofit"} />
    </Component>
  );
};
