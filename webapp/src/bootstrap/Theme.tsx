import "./ThemeDark.scss";
import "./ThemeLight.scss";
import { createContext, useContext, useEffect, useState } from "react";
import {
  andClassName,
  ComponentProps,
  initState,
  LeafProps,
  Icon,
  Button,
} from ".";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

type Contrast = "light" | "dark";

enum Breakpoint {
  xs = 0,
  sm = 576,
  md = 768,
  lg = 992,
  xl = 1200,
  xxl = 1440,
}

type BreakpointName = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

class Theme {
  constructor() {
    this.contrast = "light";
    this.breakpoint = Breakpoint.lg;
    this.toggle = this.toggle.bind(this);
    this.isDark = this.isDark.bind(this);
    this.isLight = this.isLight.bind(this);
    this.setBreakpoint = this.setBreakpoint.bind(this);
  }

  contrast: Contrast;
  breakpoint: Breakpoint;

  toggle() {
    this.contrast = this.isDark() ? "light" : "dark";
    this.update();
  }

  isDark() {
    return this.contrast === "dark";
  }

  isLight() {
    return this.contrast === "light";
  }

  update() {
    this.setTheme({ ...this });
  }

  setTheme = (theme: Theme) => {
    console.error("ThemeContext.Provider not loaded");
  };

  setBreakpoint(bp: Breakpoint) {
    if (bp >= Breakpoint.xxl) {
      this.breakpoint = Breakpoint.xxl;
    } else if (bp >= Breakpoint.xl) {
      this.breakpoint = Breakpoint.xl;
    } else if (bp >= Breakpoint.lg) {
      this.breakpoint = Breakpoint.lg;
    } else if (bp >= Breakpoint.md) {
      this.breakpoint = Breakpoint.md;
    } else if (bp >= Breakpoint.sm) {
      this.breakpoint = Breakpoint.sm;
    } else {
      this.breakpoint = Breakpoint.xs;
    }
    this.update();
    console.log("breakpoint: " + this.breakpoint.toString());
  }
}

const defaultTheme: Theme = new Theme();

const ThemeContext = createContext<Theme>(defaultTheme);

interface ThemeProviderProps extends ComponentProps {
  theme?: Theme;
}

function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = useState(initState(props.theme, defaultTheme));
  theme.setTheme = setTheme.bind(theme);

  useEffect(() => {
    const handleResize = (event: Event) => {
      theme.setBreakpoint((event.target as Window).innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  const className = "theme theme-" + theme.contrast + andClassName(props);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={className}>{props.children}</div>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

interface ToggleThemeButtonProps extends LeafProps {
  variant: Variant;
}

function ToggleThemeButton(props: ToggleThemeButtonProps) {
  const theme = useTheme();
  const icon = theme.isDark() ? "light_mode" : "dark_mode";
  return (
    <Button {...props} onClick={theme.toggle}>
      <Icon icon={icon}></Icon>
    </Button>
  );
}

export type {
  Contrast,
  Variant,
  Breakpoint,
  Theme,
  ToggleThemeButtonProps,
  BreakpointName,
};

export {
  ThemeContext,
  ThemeProvider,
  defaultTheme,
  useTheme,
  ToggleThemeButton,
};
