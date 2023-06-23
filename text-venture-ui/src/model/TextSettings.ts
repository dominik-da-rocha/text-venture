export interface TextSettings {
  textMode: TextMode;
  textSize: TextSize;
  lightMode: TextLightMode;
  deviceMode: TextDeviceMode;
  consoleMode: TextOnOffMode;
  inventoryMode: TextOnOffMode;
  actionMode: TextOnOffMode;
}

export type TextLightMode = "light" | "dark";

export type TextDeviceMode = "mobile" | "desktop";

export type TextOnOffMode = "on" | "off";

export type TextMode = "serif" | "sans-serif" | "monospace" | "cursive";

export type TextSize = "small" | "medium" | "large";
