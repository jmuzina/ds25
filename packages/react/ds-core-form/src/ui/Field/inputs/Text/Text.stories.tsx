/* @canonical/generator-ds 0.9.0-experimental.4 */

// Needed for function-based story, safe to remove otherwise
// import type { TextProps } from './types.js'
import type { Meta, StoryObj } from "@storybook/react";
import * as decorators from "storybook/decorators.js";
import Component from "./Text.js";
// Needed for template-based story, safe to remove otherwise
// import type { StoryFn } from '@storybook/react'

const meta = {
  title: "Field/inputs/Text",
  component: Component,
  decorators: [decorators.form()],
} satisfies Meta<typeof Component>;

export default meta;

/*
  CSF3 story
  Uses object-based story declarations with strong TS support (`Meta` and `StoryObj`).
  Uses the latest storybook format.
*/
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "full_name",
  },
};

export const Disabled: Story = {
  args: {
    name: "full_name_disabled",
    disabled: true,
  },
};

export const Email: Story = {
  args: {
    name: "email",
    inputType: "email",
  },
};

export const WithPrefix: Story = {
  args: {
    name: "username",
    inputType: "text",
    prefix: "@",
  },
};

export const WithSuffix: Story = {
  args: {
    name: "domain",
    inputType: "text",
    suffix: ".domain.com",
  },
};

export const RTLWithPrefixAndSuffix: Story = {
  args: {
    name: "username_rtl",
    label: "نام کاربری",
    prefix: "نام:",
    suffix: "!",
  },
  decorators: [
    (Story) => (
      <div className="rtl">
        <Story />
      </div>
    ),
  ],
};

/*
  Function-based story
  Direct arguments passed to the component
  Simple, but can lead to repetition if used across multiple stories with similar configurations

  export const Default = (args: TextProps) => <Component {...args} />;
  Default.args = { children: <span>Hello world!</span> };
*/

/*
  Template-Based story
  Uses a template function to bind story variations, making it more reusable
  Slightly more boilerplate but more flexible for creating multiple stories with different configurations

  const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;
  export const Default: StoryFn<typeof Component> = Template.bind({});
  Default.args = {
    children: <span>Hello world!</span>
  };
*/

/*
  Static story
  Simple and straightforward, but offers the least flexibility and reusability

  export const Default: StoryFn<typeof Component> = () => (
    <Component><span>Hello world!</span></Component>
  );
*/
