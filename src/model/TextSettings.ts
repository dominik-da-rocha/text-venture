import { MigrationHandlerMap } from "../components/LocalState";

export interface TextSettings {
  version: 1 | 2;
  fontStyle: FontStyle;
  textSize: FontSize;
  lightMode: LightMode;
  storageMode: StorageMode;
  consoleMode: OnOffMode;
  inventoryMode: OnOffMode;
  actionMode: OnOffMode;
  readingSpeed: ReadingSpeed;
}

export type LightMode = "system" | "light" | "dark";
export const LightModes = ["system", "light", "dark"];

export type OnOffMode = "on" | "off";

export type FontStyle = "serif" | "sans-serif" | "monospace" | "cursive";
export const FontStyles = ["serif", "sans-serif", "monospace", "cursive"];

export type FontSize = "small" | "medium" | "large";
export const FontSizes = ["small", "medium", "large"];

export type ReadingSpeed = "slow" | "medium" | "fast";
export const ReadingSpeeds = ["slow", "medium", "fast"];
export const ReadingSpeedMap = new Map<ReadingSpeed, number>([
  ["slow", 80],
  ["medium", 150],
  ["fast", 200],
]);

export type StorageMode = "local" | "session" | "memory";
export const StorageModes = ["local", "session", "memory"];

export const TextSettingMigration = new MigrationHandlerMap<TextSettings>([
  [1, v1_addReadingSpeed],
  [2, v2_renameTextModeToFontStyle],
]);

function v1_addReadingSpeed(stored: TextSettings, def: TextSettings) {
  stored.readingSpeed = "medium";
  return stored;
}

function v2_renameTextModeToFontStyle(stored: TextSettings, def: TextSettings) {
  stored.fontStyle = (stored as any)["textMode"];
  delete (stored as any).textMode;

  stored.fontStyle = (stored as any)["textSize"];
  delete (stored as any).textSize;

  return stored;
}
