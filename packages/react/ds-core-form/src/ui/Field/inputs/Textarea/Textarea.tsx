/* @canonical/generator-ds 0.9.0-experimental.4 */
import type React from "react";
import { useFormContext } from "react-hook-form";
import type { TextareaProps } from "./types.js";
import "./styles.css";
import { mixins } from "../../../constants.js";
import withWrapper from "../../common/Wrapper/withWrapper.js";

const componentCssClassName = "ds form-textarea";

/**
 * description of the Textarea component
 * @returns {React.ReactElement} - Rendered Textarea
 */
const Textarea = ({
  id,
  className,
  style,
  name,
  registerProps,
  ...otherProps // Should only be native input props
}: TextareaProps): React.ReactElement => {
  const { register } = useFormContext();
  return (
    <textarea
      id={id}
      style={style}
      className={[mixins.FormInput, componentCssClassName, className]
        .filter(Boolean)
        .join(" ")}
      {...otherProps}
      {...register(name, registerProps)}
    />
  );
};

export default withWrapper<TextareaProps>(Textarea);
