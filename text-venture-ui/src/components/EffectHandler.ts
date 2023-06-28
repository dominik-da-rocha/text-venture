import {
  TextInteraction,
  TextInteractionTalkToQuestion,
} from "../model/TextInteraction";
import { TextPlayer } from "../model/TextObject";
import { TextScene } from "../model/TextScene";
import { TextVenture } from "../model/TextVenture";

export function handleEffects(
  text: TextVenture,
  scene: TextScene,
  player: TextPlayer,
  interaction: TextInteraction | TextInteractionTalkToQuestion,
  onTextChanged: (text: TextVenture) => void,
  onScrollToBottom: () => void
) {
  const effects = interaction.effects;
  if (scene && player && effects) {
    effects.forEach((effect) => {
      switch (effect.type) {
        case "add-paragraph-to-scene":
          onScrollToBottom();
          setTimeout(() => {
            scene.paragraphs.push(...effect.paragraphs);
            onTextChanged(text);
          }, 200);
          break;
      }
    });

    delete interaction.effects;
  }
}
