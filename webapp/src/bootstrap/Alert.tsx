import { Variant, andClassName, ComponentProps } from ".";

interface AlertProps extends ComponentProps {
  rounded?: boolean;
  variant: Variant;
}

function Alert(props: AlertProps) {
  const className =
    "" +
    ("alert-" + props.variant) +
    (" border border-" + props.variant) +
    (props.rounded ? " rounded" : "") +
    andClassName(props);

  return <div {...props} className={className} />;
}

export type { AlertProps };

export { Alert };
