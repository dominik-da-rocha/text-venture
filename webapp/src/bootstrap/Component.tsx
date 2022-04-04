import { ReactNode } from "react";

interface ChildrenProps {
  children?: ReactNode;
}

interface LeafProps {
  id?: string;
  className?: string;
}

interface ComponentProps extends ChildrenProps, LeafProps {}

function andClassName(props: { className?: string }) {
  return props.className ? " " + props.className : "";
}

function toDefault<T>(value: T | undefined, defVal: T): T {
  return value === undefined ? defVal : value;
}

function initState<T>(value: T | undefined, defVal: T): () => T {
  return () => {
    return value === undefined ? defVal : value;
  };
}

export type { ChildrenProps, LeafProps, ComponentProps };

export { andClassName, toDefault, initState };
