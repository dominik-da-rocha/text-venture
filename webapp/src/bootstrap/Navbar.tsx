import {
  ComponentProps,
  Icon,
  andClassName,
  Variant,
  Button,
  BreakpointName,
} from ".";

interface NavbarProps extends ComponentProps {
  variant: Variant;
  expand: BreakpointName;
}

function Navbar(props: NavbarProps) {
  const className =
    "navbar navbar-expand-lg bg-" +
    props.variant +
    " container-fluid" +
    andClassName(props);
  return <nav {...props} className={className} />;
}

interface NavbarBrandProps extends ComponentProps {}

function NavbarBrand(props: NavbarBrandProps) {
  const className = "navbar-brand" + andClassName(props);
  return <div {...props} className={className} />;
}

interface NavbarTogglerProps extends ComponentProps {
  variant: Variant;
  toggle: () => void;
}

function NavbarToggler(props: NavbarTogglerProps) {
  const className = "navbar-toggler" + andClassName(props);
  return (
    <Button {...props} className={className} onClick={props.toggle}>
      <Icon icon="menu" />
    </Button>
  );
}

interface NavbarNavProps extends ComponentProps {
  show: boolean;
  expand: BreakpointName;
}

function NavbarNav(props: NavbarNavProps) {
  const className =
    "collapse " +
    (props.show ? "show" : "") +
    "  navbar-collapse" +
    andClassName(props);
  return (
    <div {...props} className={className}>
      <ul className={"navbar-nav me-auto mb-2 mb-" + props.expand + "-0"}>
        {props.children}
      </ul>
    </div>
  );
}

interface NavbarNavItemProps extends ComponentProps {}

function NavbarNavItem(props: NavbarNavItemProps) {
  return <li {...props} className="nav-item" />;
}

export { Navbar, NavbarBrand, NavbarToggler, NavbarNav, NavbarNavItem };
