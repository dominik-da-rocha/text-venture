import { IMap } from "../utils/Utils";

export type TextActionId =
  | "none"
  | "open"
  | "close"
  | "push"
  | "pull"
  | "walkTo"
  | "pickUp"
  | "talkTo"
  | "give"
  | "use"
  | "lookAt"
  | "turnOn"
  | "turnOff"
  | "save"
  | "load"
  | "reset"
  | "light"
  | "about"
  | "device"
  | "console"
  | "inventory";

export interface TextAction {
  id: TextActionId;
  name: string;
  hidden?: boolean;
  minCount: number;
  maxCount: number;
  preposition?: string;
}

export interface TextActionsInterface {
  none?: TextAction | undefined;
  open?: TextAction | undefined;
  close?: TextAction | undefined;
  push?: TextAction | undefined;
  pull?: TextAction | undefined;
  walkTo?: TextAction | undefined;
  pickUp?: TextAction | undefined;
  talkTo?: TextAction | undefined;
  give?: TextAction | undefined;
  use?: TextAction | undefined;
  lookAt?: TextAction | undefined;
  turnOn?: TextAction | undefined;
  turnOff?: TextAction | undefined;
  save?: TextAction | undefined;
  load?: TextAction | undefined;
  reset?: TextAction | undefined;
  light?: TextAction | undefined;
  about?: TextAction | undefined;
}

export type TextActionMap = IMap<TextAction>;

export const TextActionNone: TextAction = {
  id: "none",
  name: "",
  hidden: true,
  minCount: 999,
  maxCount: 999,
};

export const TextActionSave: TextAction = {
  id: "save",
  name: "Save Game",
  minCount: 0,
  maxCount: 0,
};

export const TextActionLoad: TextAction = {
  id: "load",
  name: "Load Game",
  minCount: 0,
  maxCount: 0,
};

export const TextActionReset: TextAction = {
  id: "reset",
  name: "Reset Game",
  minCount: 0,
  maxCount: 0,
};

export const TextActionLight: TextAction = {
  id: "light",
  name: "Toggle Light",
  minCount: 0,
  maxCount: 0,
};

export const TextActionAbout: TextAction = {
  id: "about",
  name: "About the Game",
  minCount: 0,
  maxCount: 0,
};

export const TextActionDevice: TextAction = {
  id: "device",
  name: "Toggle Device",
  minCount: 0,
  maxCount: 0,
};

export const TextActionConsole: TextAction = {
  id: "console",
  name: "Toggle Console",
  minCount: 0,
  maxCount: 0,
};

export const TextActionInventory: TextAction = {
  id: "inventory",
  name: "Toggle Inventory",
  minCount: 0,
  maxCount: 0,
};
