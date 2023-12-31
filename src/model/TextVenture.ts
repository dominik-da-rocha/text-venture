// Data structure for complete text venture

import { MigrationHandlerMap } from "../components/LocalState";
import { arrayToIMap } from "../components/Utils";
import { TextAction, TextActionMap } from "./TextAction";
import { TextAnecdote } from "./TextAnecdote";
import { CommandMode, TextLogbook } from "./TextConsole";
import { TextInteraction } from "./TextInteraction";
import {
  TextLink,
  TextLinkMap,
  TextObjectAbstract,
  TextPlayer,
} from "./TextObject";
import { TextScene, TextSceneMap } from "./TextScene";

interface TextVentureAbstract extends TextObjectAbstract {
  type: "venture";
  version: 1;
  currentSceneId: string;
  currentPlayerId: string;
  logbook: TextLogbook[];
  logbookMaxLength: number;
  logbookTitle: string;
  anecdote: TextAnecdote;
  commandMode: CommandMode;
  currentConversationId?: string;
  currentDialogId?: string;
  interactions: TextInteraction[];
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
    version: json.version,
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
    commandMode: json.commandMode,
  };
}

export interface TextPlayerMap {
  [index: string]: TextPlayer | undefined;
}

export const TextVentureMigration = new MigrationHandlerMap([
  [1, v1_addVersion],
]);

export function v1_addVersion(stored: TextVenture, defaultValue: TextVenture) {
  return stored;
}
