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
        case "remove-thing-from-inventory":
          setTimeout(() => {
            Object.keys(text.players)
              .map((key) => text.players[key] as TextPlayer)
              .forEach((player) => {
                player.things = player.things.filter(
                  (thing) => thing.id !== effect.id
                );
              });
            onTextChanged(text);
          }, 200);
          break;
        case "change-thing-in-inventory":
          setTimeout(() => {
            Object.keys(text.players)
              .map((key) => text.players[key] as TextPlayer)
              .forEach((player) => {
                player.things.forEach((thing) => {
                  if (thing.id === effect.oldId) {
                    if (effect.description) {
                      thing.description = effect.description;
                    }
                    if (effect.name) {
                      thing.name = effect.name;
                    }
                    if (effect.newId) {
                      thing.id = effect.newId;
                    }
                  }
                });
              });
            onTextChanged(text);
          }, 200);
          break;
      }
    });

    interaction.effects = interaction.effects?.filter(
      (effect) => !effect.dropEffect
    );
  }
}
