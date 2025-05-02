import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Component from "./Button.js";

describe("Button component", () => {
  it("renders", () => {
    render(<Component>Hello world!</Component>);
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Component className="test-class">Hello world!</Component>);
    expect(screen.getByText("Hello world!")).toHaveClass("test-class");
  });
});
