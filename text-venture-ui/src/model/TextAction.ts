import { IMap } from "../utils/Utils";

export type TextActionId =
  | "none"
  | "walkTo"
  | "pickUp"
  | "talkTo"
  | "give"
  | "use"
  | "lookAt"
  //----- todo ---- may be reduced to use object
  | "turnOn"
  | "turnOff"
  | "open"
  | "close"
  | "push"
  | "pull";

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
