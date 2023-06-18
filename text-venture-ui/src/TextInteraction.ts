import { TextActionId } from "./TextAction";
import { TextObjectType } from "./TextVenture";
import { OneOf } from "./Util";

export type TextInteraction =
  | TextInteractionSimple
  | TextInteractionRandom
  | TextInteractionLookAt
  | TextInteractionLoad
  | TextInteractionSave
  | TextInteractionReset
  | TextInteractionGiveItemTo
  | TextInteractionWalkTo
  | TextInteractionPickUp
  | TextInteractionRandomTalkTo;

interface TextInteractionAbstract {
  id: string;
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
  type: "lookAt";
  responses: string[];
}

export interface TextInteractionSave extends TextInteractionAbstract {
  type: "save";
}

export interface TextInteractionLoad extends TextInteractionAbstract {
  type: "load";
}

export interface TextInteractionReset extends TextInteractionAbstract {
  type: "reset";
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
