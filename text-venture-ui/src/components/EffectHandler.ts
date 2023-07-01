import { TextCommand } from "../model/TextConsole";
import {
  TextInteraction,
  TextInteractionTalkToQuestion,
  TextPlayerResponses,
} from "../model/TextInteraction";
import { TextPlayer, TextThing } from "../model/TextObject";
import { TextScene } from "../model/TextScene";
import { TextVenture } from "../model/TextVenture";
import { TokenProcessor } from "./TokenProcessor";
import { randomItem } from "./Utils";

export function handleEffects(
  text: TextVenture,
  scene: TextScene,
  player: TextPlayer,
  interaction: TextInteraction | TextInteractionTalkToQuestion,
  command: TextCommand,
  onTextChanged: (text: TextVenture) => void,
  onScrollToBottom: () => void,
  onPlaySound: (url: string) => void
) {
  const effects = interaction.effects;
  if (scene && player && effects) {
    effects.forEach((effect) => {
      switch (effect.type) {
        case "add-paragraph-to-scene": {
          onScrollToBottom();
          setTimeout(() => {
            scene.paragraphs.push(
              ...selectPlayerResponses(effect.paragraphs, player.id)
            );
            onTextChanged(text);
          }, 200);
          return;
        }
        case "add-footnote": {
          onScrollToBottom();
          setTimeout(() => {
            if (scene.footnotes === undefined) {
              scene.footnotes = [];
            }
            scene.footnotes.push(...effect.footnotes);
            onTextChanged(text);
          }, 200);
          return;
        }
        case "remove-thing-from-inventory": {
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
          return;
        }
        case "change-thing-in-inventory": {
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
          return;
        }
        case "add-thing-to-inventory": {
          player.things.push(effect.thing);
          onTextChanged(text);
          return;
        }
        case "change-thing-in-scene": {
          const thing = scene.things.find((thing) => thing.id === effect.oldId);
          if (thing) {
            if (effect.newId) {
              replaceIdsInScenesParagraphs(
                scene,
                "thing",
                thing.id,
                effect.newId
              );
              thing.id = effect.newId;
            }
            if (effect.description) {
              thing.description = effect.description;
            }
            if (effect.name) {
              thing.name = effect.name;
            }

            onTextChanged(text);
          }
          return;
        }
        case "pick-up-thing-from-scene": {
          removeObjectTokensFromScenesDescription(scene, effect.thingId);
          giveItemFromTo(effect.thingId, scene, player);
          onTextChanged(text);
          return;
        }
        case "give-item-from-inventory-to": {
          const thing = command.objects[effect.itemCommandObjectIdx];
          const receiver = command.objects[
            effect.receiverCommandObjectIdx
          ] as IHaveThings;
          if (receiver.things) {
            giveItemFromTo(thing.id, player, receiver);
          }
          return;
        }
        case "remove-tokens-from-scene": {
          removeObjectTokensFromScenesDescription(scene, effect.id);
          onTextChanged(text);
          return;
        }
        case "change-person-in-scene": {
          const person = scene.persons.find(
            (thing) => thing.id === effect.oldId
          );
          if (person) {
            if (effect.newId) {
              replaceIdsInScenesParagraphs(
                scene,
                "person",
                person.id,
                effect.newId
              );
              person.id = effect.newId;
            }
            if (effect.description) {
              person.description = effect.description;
            }
            if (effect.name) {
              person.name = effect.name;
            }
            if (effect.things) {
              person.things = effect.things;
            }
            onTextChanged(text);
          }
          return;
        }
        case "play-sound": {
          onPlaySound(effect.url);
          return;
        }
      }

      throw new Error("Unknown effect " + (effect as any).type);
    });

    interaction.effects = interaction.effects?.filter((effect) =>
      Boolean(effect.keepEffect)
    );
  }
}
function replaceIdsInScenesParagraphs(
  scene: TextScene,
  type: string,
  id: string,
  newId: string
) {
  scene.paragraphs = scene.paragraphs.map((p) => {
    return p.replaceAll("{" + type + ":" + id, "{" + type + ":" + newId);
  });
}

function removeObjectTokensFromScenesDescription(scene: TextScene, id: string) {
  scene.paragraphs = TokenProcessor(
    scene.paragraphs,
    (onToken) => (onToken.tokenId === id ? onToken.tokenText : onToken.span),
    (onText) => onText.span,
    (onJoin) => onJoin.spans.join(" ")
  );
}

interface IHaveThings {
  things: TextThing[];
}

function giveItemFromTo(
  thingId: string,
  owner: IHaveThings,
  receiver: IHaveThings
) {
  if (owner && receiver) {
    const idx = owner.things.findIndex((thing) => thingId === thing.id);
    if (idx >= 0) {
      let thing = owner.things[idx];
      receiver.things.push(thing);
      owner.things.splice(idx, 1);
    }
  }
}

export function selectText(text: string | string[]): string[] {
  if (typeof text === "string") {
    return [text];
  } else {
    return text;
  }
}

export function selectPlayerResponses(
  responses: TextPlayerResponses,
  id: string
): string[] {
  if (Array.isArray(responses)) {
    return responses;
  } else if (typeof responses === "object") {
    if (responses[id] !== undefined) {
      return selectText(responses[id]);
    }
    let keys = Object.keys(responses);
    if (keys.length > 0 && responses[keys[0]] !== undefined) {
      return selectText(responses[keys[0]]);
    }
  }
  console.error("response if faulty: ", responses);
  return ["{error:sorry:response is faulty}"];
}

export function selectRandomPlayerResponses(
  responses: TextPlayerResponses,
  id: string
) {
  let r = selectPlayerResponses(responses, id);
  return randomItem(r);
}
