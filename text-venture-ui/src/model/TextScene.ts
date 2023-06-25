import { IMap } from "../components/Utils";
import { TextInteraction } from "./TextInteraction";
import { TextDescription, TextThing, TextPerson } from "./TextObject";

export interface TextScene {
  type: "scene";
  id: string;
  name: string;
  description: TextDescription;
  paragraphs: string[];
  things: TextThing[];
  persons: TextPerson[];
  interactions: TextInteraction[];
}

export type TextSceneMap = IMap<TextScene>;
