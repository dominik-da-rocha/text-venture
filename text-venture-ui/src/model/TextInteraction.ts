import { TextActionId } from "./TextAction";
import { IMap, OneOf } from "../components/Utils";
import { TextObjectType } from "./TextObject";
import { TextEffect } from "./TextEffects";

export type TextInteraction =
  | TextInteractionEffect
  | TextInteractionRandom
  | TextInteractionLookAt
  | TextInteractionWalkTo
  | TextInteractionRandomTalkTo
  | TextInteractionTalkTo
  | TextInteractionLookAtPlayer
  | TextInteractionEffectOrRandom;

interface TextInteractionAbstract {
  id: string;
  matchesPlayer?: string;
  matchesAction: TextActionPattern;
  matchesObjects: TextObjectPattern[] | "any";
  style?: string;
  effects?: TextEffect[];
  personTalkToIndex?: number;
}

export interface TextActionPattern {
  oneOf?: OneOf<TextActionId>;
  any?: boolean;
}

export interface TextObjectPattern {
  oneIdOf?: OneOf<string>;
  oneTypeOf?: OneOf<TextObjectType>;
  any?: boolean;
  currentPlayerHasIt?: boolean;
  isCurrentPlayer?: boolean;
}

export type TextPlayerResponses =
  | string
  | string[]
  | { [playerId: string]: string | string[] };

export interface TextInteractionEffect extends TextInteractionAbstract {
  type: "effects";
  effects: TextEffect[];
}

export interface TextInteractionRandom extends TextInteractionAbstract {
  type: "random";
  responses: TextPlayerResponses;
}

export interface TextInteractionLookAt extends TextInteractionAbstract {
  type: "look-at";
  responses: TextPlayerResponses;
}

export interface TextInteractionWalkTo extends TextInteractionAbstract {
  type: "walk-to";
  responses: TextPlayerResponses;
}

export interface TextInteractionRandomTalkTo extends TextInteractionAbstract {
  type: "random-talk-to";
  questions: TextPlayerResponses;
  responses: string[];
}

export interface TextInteractionTalkTo extends TextInteractionAbstract {
  type: "talk-to";
  startDialogIds: string[];
  dialogs: IMap<TextInteractionTalkToQuestion>;
}

export interface TextSpeech {
  short: string;
  paragraphs: string[];
}

export interface TextInteractionTalkToQuestion {
  pc: IMap<TextSpeech>;
  npc: string;
  next: string[];
  dropIfAsked?: boolean;
  effects?: TextEffect[];
}

export interface TextInteractionLookAtPlayer extends TextInteractionAbstract {
  type: "look-at-player";
  responses: TextPlayerResponses;
}

export interface TextInteractionEffectOrRandom extends TextInteractionAbstract {
  type: "effect-or-random";
  responses: TextPlayerResponses;
}
