import { MouseEventHandler } from "react";
import { ComponentProps } from ".";
import { andClassName } from "./Component";
import { Variant } from "./Theme";

interface ButtonProps extends ComponentProps {
  variant: Variant;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button(props: ButtonProps) {
  const className = "btn btn-" + props.variant + andClassName(props);
  return <button {...props} className={className} />;
}

export type { ButtonProps };
export { Button };
