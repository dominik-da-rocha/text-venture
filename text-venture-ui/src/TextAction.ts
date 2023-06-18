import { IMap } from "./Util";

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
  | "reset";

export interface TextAction {
  id: TextActionId;
  name: string;
  disabled?: boolean;
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
}

export type TextActionMap = IMap<TextAction>;

export const TextActionNone: TextAction = {
  id: "none",
  name: "",
  disabled: true,
  minCount: 999,
  maxCount: 999,
};

export const TextActionGameControl: TextAction[] = [
  {
    id: "save",
    name: "Save",
    minCount: 0,
    maxCount: 0,
  },
  {
    id: "load",
    name: "Load",
    minCount: 0,
    maxCount: 0,
  },
  {
    id: "reset",
    name: "Reset",
    minCount: 0,
    maxCount: 0,
  },
];
