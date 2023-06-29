export interface TextEffectAddParagraphsToScene {
  type: "add-paragraph-to-scene";
  paragraphs: string[];
  dropEffect: boolean;
}

export interface TextEffectRemoveThingFromInventory {
  type: "remove-thing-from-inventory";
  id: string;
  dropEffect: boolean;
}

export interface TextEffectChangeThingInInventory {
  type: "change-thing-in-inventory";
  oldId: string;
  name?: string;
  description?: string;
  newId?: string;
  dropEffect: boolean;
}

export type TextEffect =
  | TextEffectAddParagraphsToScene
  | TextEffectRemoveThingFromInventory
  | TextEffectChangeThingInInventory;
