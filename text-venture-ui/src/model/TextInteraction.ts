import { TextActionId } from "./TextAction";
import { IMap, OneOf } from "../components/Utils";
import { TextObjectType } from "./TextObject";

export type TextInteraction =
  | TextInteractionSimple
  | TextInteractionRandom
  | TextInteractionLookAt
  | TextInteractionGiveItemTo
  | TextInteractionWalkTo
  | TextInteractionPickUp
  | TextInteractionRandomTalkTo
  | TextInteractionTalkTo
  | TextInteractionLookAtPlayer;

interface TextInteractionAbstract {
  id: string;
  matchesPlayer?: string;
  matchesAction: TextActionPattern;
  matchesObjects: TextObjectPattern[] | "any";
  style?: string;
  events?: TextInteractionEvent[];
}

export interface TextActionPattern {
  oneOf?: OneOf<TextActionId>;
  any?: boolean;
}

export interface TextObjectPattern {
  oneIdOf?: OneOf<string>;
  oneTypeOf?: OneOf<TextObjectType>;
  any?: boolean;
  playerHasIt?: boolean;
  isPlayer?: boolean;
}

export interface TextInteractionEvent {}

export interface TextInteractionSimple extends TextInteractionAbstract {
  type: "simple";
  response: string;
}

export interface TextInteractionRandom extends TextInteractionAbstract {
  type: "random";
  responses: string[];
}

export interface TextInteractionLookAt extends TextInteractionAbstract {
  type: "look-at";
  responses: string[];
}

export interface TextInteractionGiveItemTo extends TextInteractionAbstract {
  type: "give-item-to";
  responses: string[];
}

export interface TextInteractionWalkTo extends TextInteractionAbstract {
  type: "walk-to";
  responses: string[];
}

export interface TextInteractionPickUp extends TextInteractionAbstract {
  type: "pick-up";
  responses: string[];
}

export interface TextInteractionRandomTalkTo extends TextInteractionAbstract {
  type: "random-talk-to";
  questions: string[];
  responses: string[];
}

export interface TextInteractionTalkTo extends TextInteractionAbstract {
  type: "talk-to";
  start: string[];
  dialogs: IMap<TextInteractionTalkToQuestion>;
}

export interface TextInteractionTalkToQuestion {
  pc: IMap<string> | string;
  npc: string;
  next: string[];
  dropIfAsked?: boolean;
}

export interface TextInteractionLookAtPlayer extends TextInteractionAbstract {
  type: "look-at-player";
  responses: string[];
}
