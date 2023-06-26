import { TextAction } from "./TextAction";
import { TextObject, TextObjectType } from "./TextObject";

export type CommandMode = "action" | "conversation";

export interface TextCommand {
  type: "command";
  action: TextAction;
  objects: TextObject[];
  playerName?: string;
  playerId?: string;
  question?: string;
  response?: string;
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
  response?: string;
  style?: string;
}
