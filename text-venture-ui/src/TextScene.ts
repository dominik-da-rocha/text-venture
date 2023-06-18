import { IMap } from "./Util";
import { TextInteraction } from "./TextInteraction";
import {
  TextDescription,
  TextThing,
  TextPerson,
  TextConversation,
} from "./TextVenture";

export interface TextScene {
  type: "scene";
  id: string;
  name: string;
  description: TextDescription;
  things: TextThing[];
  persons: TextPerson[];
  interactions: TextInteraction[];
  conversations: TextConversation[];
}

export type TextSceneMap = IMap<TextScene>;
