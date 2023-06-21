// Data structure for complete text adventure

import { arrayToIMap } from "./Util";
import { TextAction, TextActionMap } from "./TextAction";
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
  | TextPlayer
  | TextConversation;

export type TextObjectType =
  | "venture"
  | "scene"
  | "thing"
  | "person"
  | "player"
  | "conversation";

// this is loaded
export interface TextVentureJson extends TextObjectAbstract {
  actions: TextAction[];
  scenes: TextScene[];
  players: TextPlayer[];
  currentSceneId: string;
  currentPlayerId: string;
  commandLog: TextLog[];
  commandLogMaxLength: number;
  commandLogTitle: string;
  textMode: TextMode;
  lightMode: TextLightMode;
  deviceMode: TextDeviceMode;
  consoleMode: TextOnOffMode;
  inventoryMode: TextOnOffMode;
}

// this is the same as the TextVentureJson
// but uses maps to access elements more faster
export interface TextVenture extends TextObjectAbstract {
  type: "venture";
  actions: TextActionMap;
  scenes: TextSceneMap;
  players: TextPlayerMap;
  currentSceneId: string;
  currentPlayerId: string;
  commandLog: TextLog[];
  commandLogMaxLength: number;
  commandLogTitle: string;
  textMode: TextMode;
  lightMode: TextLightMode;
  deviceMode: TextDeviceMode;
  consoleMode: TextOnOffMode;
  inventoryMode: TextOnOffMode;
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
    interactions: json.interactions,
    currentSceneId: json.currentSceneId,
    currentPlayerId: json.currentPlayerId,
    commandLog: [...json.commandLog],
    commandLogMaxLength: json.commandLogMaxLength,
    commandLogTitle: json.commandLogTitle,
    textMode: json.textMode,
    lightMode: json.lightMode,
    deviceMode: json.deviceMode,
    consoleMode: json.consoleMode,
    inventoryMode: json.inventoryMode,
  };
}

export interface TextConversation extends TextObjectAbstract {
  type: "conversation";
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

export interface TextDialog {
  type: "dialog";
  id: string;
  speaker: string;
  text: string;
  nextDialogs: string[];
  isPlayer: boolean;
}

export interface TextCommand {
  type: "command";
  action: TextAction;
  objects: TextObject[];
  response: string;
  talkerId?: string;
  talker?: string;
  question?: string;
  style?: string;
}

export type TextLog = TextCommand | TextDialog;

export type TextDescription = string | string[];

export type TextLightMode = "light" | "dark";

export type TextDeviceMode = "mobile" | "desktop";

export type TextOnOffMode = "on" | "off";

export type TextMode = "c64" | "comic" | "book";
