import { IMap } from "../utils/Utils";
import { TextInteraction } from "./TextInteraction";
import { TextDescription, TextThing, TextPerson } from "./TextVenture";

export interface TextScene {
  type: "scene";
  id: string;
  name: string;
  description: TextDescription;
  things: TextThing[];
  persons: TextPerson[];
  interactions: TextInteraction[];
}

export type TextSceneMap = IMap<TextScene>;
