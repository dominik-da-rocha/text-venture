import { TextPlayerResponses } from "./TextInteraction";
import { TextThing } from "./TextObject";

export type TextEffectType =
  | "add-footnote"
  | "add-paragraph-to-scene"
  | "add-thing-to-inventory"
  | "change-person-in-scene"
  | "change-thing-in-inventory"
  | "change-thing-in-scene"
  | "give-item-from-inventory-to"
  | "pick-up-thing-from-scene"
  | "remove-thing-from-inventory"
  | "remove-tokens-from-scene"
  | "play-sound";

export type TextEffect =
  | TextEffectAddFootnote
  | TextEffectAddParagraphsToScene
  | TextEffectAddThingToInventory
  | TextEffectChangePersonInScene
  | TextEffectChangeThingInInventory
  | TextEffectChangeThingInScene
  | TextEffectGiveItemFromInventoryTo
  | TextEffectPickUpThingFromScene
  | TextEffectRemoveThingFromInventory
  | TextEffectRemoveTokensFromScene
  | TextEffectPlaySound;

interface TextEffectAbstract {
  type: TextEffectType;
  keepEffect?: boolean;
}

export interface TextEffectAddParagraphsToScene extends TextEffectAbstract {
  type: "add-paragraph-to-scene";
  paragraphs: TextPlayerResponses;
}

export interface TextEffectAddFootnote extends TextEffectAbstract {
  type: "add-footnote";
  footnotes: string[];
}

export interface TextEffectRemoveThingFromInventory extends TextEffectAbstract {
  type: "remove-thing-from-inventory";
  id: string;
}

export interface TextEffectChangePersonInScene extends TextEffectAbstract {
  type: "change-person-in-scene";
  oldId: string;
  name?: string;
  description?: string;
  newId?: string;
  things?: TextThing[];
}

export interface TextEffectChangeThingInInventory extends TextEffectAbstract {
  type: "change-thing-in-inventory";
  oldId: string;
  name?: string;
  description?: string;
  newId?: string;
}

export interface TextEffectChangeThingInScene extends TextEffectAbstract {
  type: "change-thing-in-scene";
  oldId: string;
  name?: string;
  description?: string;
  newId?: string;
}

export interface TextEffectAddThingToInventory extends TextEffectAbstract {
  type: "add-thing-to-inventory";
  thing: TextThing;
}

export interface TextEffectPickUpThingFromScene extends TextEffectAbstract {
  type: "pick-up-thing-from-scene";
  thingId: string;
}

export interface TextEffectGiveItemFromInventoryTo extends TextEffectAbstract {
  type: "give-item-from-inventory-to";
  itemCommandObjectIdx: number;
  receiverCommandObjectIdx: number;
}

export interface TextEffectRemoveTokensFromScene extends TextEffectAbstract {
  type: "remove-tokens-from-scene";
  id: string;
}

export interface TextEffectPlaySound extends TextEffectAbstract {
  type: "play-sound";
  url: string;
}
