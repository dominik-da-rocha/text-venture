export interface TextEffectAddParagraphsToScene {
  type: "add-paragraph-to-scene";
  paragraphs: string[];
}

export type TextEffect = TextEffectAddParagraphsToScene;
