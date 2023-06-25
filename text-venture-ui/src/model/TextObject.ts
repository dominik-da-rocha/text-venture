import { IMap } from "../components/Utils";
import { TextInteraction } from "./TextInteraction";
import { TextScene } from "./TextScene";

export type TextDescription = string | string[];

export interface TextObjectAbstract {
  id: string;
  name: string;
  description: TextDescription;
  interactions: TextInteraction[];
}

export type TextObject = TextScene | TextThing | TextPerson | TextPlayer;

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

export type TextObjectType = "scene" | "thing" | "person" | "player";

export type TextToken = TextObject | TextLink | TextStyle;

export interface TextLink {
  type: "link";
  id: string;
  url: string;
  isInternal?: boolean;
}

export interface TextStyle {
  type: "style";
  id: string;
}

export type TextLinkMap = IMap<TextLink>;
