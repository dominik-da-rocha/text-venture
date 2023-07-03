export interface TextSettings {
  textMode: FontStyle;
  textSize: FontSize;
  lightMode: LightMode;
  storageMode: StorageMode;
  consoleMode: OnOffMode;
  inventoryMode: OnOffMode;
  actionMode: OnOffMode;
}

export type LightMode = "system" | "light" | "dark";
export const LightModes = ["system", "light", "dark"];

export type OnOffMode = "on" | "off";

export type FontStyle = "serif" | "sans-serif" | "monospace" | "cursive";
export const FontStyles = ["serif", "sans-serif", "monospace", "cursive"];

export type FontSize = "small" | "medium" | "large";
export const FontSizes = ["small", "medium", "large"];

export type StorageMode = "local" | "session" | "memory";
export const StorageModes = ["local", "session", "memory"];
