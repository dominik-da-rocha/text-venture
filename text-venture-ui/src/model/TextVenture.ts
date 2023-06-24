// Data structure for complete text adventure

import { IMap, arrayToIMap } from "../utils/Utils";
import { TextAction, TextActionMap } from "./TextAction";
import { TextAnecdote } from "./TextAnecdote";
import { TextInteraction } from "./TextInteraction";
import { TextScene, TextSceneMap } from "./TextScene";

interface TextObjectAbstract {
  id: string;
  name: string;
  description: TextDescription;
  interactions: TextInteraction[];
}

export type TextObject =
  | TextVenture
  | TextScene
  | TextThing
  | TextPerson
  | TextPlayer;

export type TextObjectType =
  | "venture"
  | "scene"
  | "thing"
  | "person"
  | "player";

export type TextToken = TextObject | TextLink;

interface TextVentureAbstract extends TextObjectAbstract {
  currentSceneId: string;
  currentPlayerId: string;
  logbook: TextLogbook[];
  logbookMaxLength: number;
  logbookTitle: string;
  anecdote: TextAnecdote;
}

// this is loaded
export interface TextVentureJson extends TextVentureAbstract {
  anecdote: TextAnecdote;
  actions: TextAction[];
  scenes: TextScene[];
  players: TextPlayer[];
  links: TextLink[];
}

// this is the same as the TextVentureJson
// but uses maps to access elements more faster
export interface TextVenture extends TextVentureAbstract {
  type: "venture";
  actions: TextActionMap;
  scenes: TextSceneMap;
  players: TextPlayerMap;
  links: TextLinkMap;
}

export function toTextVenture(json: TextVentureJson): TextVenture {
  return {
    type: "venture",
    id: json.id,
    name: json.name,
    description: json.description,
    actions: arrayToIMap(json.actions),
    scenes: arrayToIMap(json.scenes),
    players: arrayToIMap(json.players),
    links: arrayToIMap(json.links),
    interactions: [...json.interactions],
    currentSceneId: json.currentSceneId,
    currentPlayerId: json.currentPlayerId,
    logbook: [...json.logbook],
    logbookMaxLength: json.logbookMaxLength,
    logbookTitle: json.logbookTitle,
    anecdote: { ...json.anecdote },
  };
}

export interface TextThing extends TextObjectAbstract {
  type: "thing";
}

export interface TextPerson extends TextObjectAbstract {
  type: "person";
  things: TextThing[];
}

export interface TextPlayer extends TextObjectAbstract {
  type: "player";
  things: TextThing[];
}

export interface TextPlayerMap {
  [index: string]: TextPlayer | undefined;
}

export interface TextCommand {
  type: "command";
  action: TextAction;
  objects: TextObject[];
  playerName?: string;
  playerId?: string;
  question?: string;
  response: string;
  style?: string;
}

export interface TextLogbookObject {
  type: TextObjectType;
  name: string;
  id: string;
}

export interface TextLogbook {
  actionId: string;
  command: string;
  objects: TextLogbookObject[];
  playerName?: string;
  playerId?: string;
  question?: string;
  response: string;
  style?: string;
}

export interface TextLink {
  type: "link";
  id: string;
  url: string;
}

export type TextLinkMap = IMap<TextLink>;

export type TextDescription = string | string[];
