/* @canonical/generator-ds 0.9.0-experimental.9 */
import type React from "react";
import type { ResetButtonProps } from "./types.js";
import "./styles.css";
import { Button } from "@canonical/react-ds-core";
import defaultMessages from "../../messages.js";

const componentCssClassName = "ds combobox-reset-button";

/**
 * description of the ResetButton component
 * @returns {React.ReactElement} - Rendered ResetButton
 */
const ResetButton = ({
  id,
  className,
  messages = defaultMessages,
  style,
  onClick,
}: ResetButtonProps): React.ReactElement => {
  return (
    <Button
      id={id}
      style={style}
      className={[componentCssClassName, className].filter(Boolean).join(" ")}
      aria-label={messages.reset()}
      type="button"
      onClick={onClick}
    >
      x
    </Button>
  );
};

export default ResetButton;
