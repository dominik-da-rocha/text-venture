import "./Icon.css";
import { andClassName, LeafProps, toDefault } from ".";

interface IconProps extends LeafProps {
  icon: string;
  size?: number;
}

function Icon(props: IconProps) {
  const className = "icon material-icons" + andClassName(props);
  const size = toDefault(props.size, 1.5) + "rem";
  const style = {
    fontSize: size,
    lineHeight: size,
    height: size,
  };
  return (
    <span {...props} className={className} style={style}>
      {props.icon}
    </span>
  );
}

export type { IconProps };
export { Icon };
