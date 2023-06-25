// Data structure for complete text adventure

import { arrayToIMap } from "../components/Utils";
import { TextAction, TextActionMap } from "./TextAction";
import { TextAnecdote } from "./TextAnecdote";
import {
  TextLink,
  TextLinkMap,
  TextObject,
  TextObjectAbstract,
  TextObjectType,
  TextPlayer,
} from "./TextObject";
import { TextScene, TextSceneMap } from "./TextScene";

interface TextVentureAbstract extends TextObjectAbstract {
  type: "venture";
  currentSceneId: string;
  currentPlayerId: string;
  logbook: TextLogbook[];
  logbookMaxLength: number;
  logbookTitle: string;
  anecdote: TextAnecdote;
}

// this is loaded
export interface TextVentureJson extends TextVentureAbstract {
  type: "venture";
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
    anecdote: { ...json.anecdote },
    links: arrayToIMap(json.links),
    actions: arrayToIMap(json.actions),
    interactions: [...json.interactions],
    players: arrayToIMap(json.players),
    scenes: arrayToIMap(json.scenes),
    logbookMaxLength: json.logbookMaxLength,
    logbookTitle: json.logbookTitle,
    logbook: [...json.logbook],
    currentSceneId: json.currentSceneId,
    currentPlayerId: json.currentPlayerId,
  };
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
