import React, { useEffect, useRef, useState } from "react";
import {
  SceneSwitchEffect,
  Scene,
  sceneEffectChangeTime,
  sceneSwitchEffectEnd,
  sceneSwitchEffectStart,
} from "./Scene";
import { SceneHeader } from "./SceneHeader";
import { ActionMenu } from "./ActionMenu";
import {
  ConsoleMenu,
  TextVentureLogbook,
  commandToString,
} from "./ConsoleMenu";
import { InventoryMenu } from "./InventoryMenu";
import { TextActionNone, TextAction } from "../model/TextAction";
import { getByIdOrFirst, matchesAny, matchesOneOf } from "./Utils";
import {
  TextInteraction,
  TextObjectPattern,
  TextActionPattern,
} from "../model/TextInteraction";
import { useShowPopup } from "./PopupAlert";
import {
  ReadingSpeed,
  ReadingSpeedMap,
  TextSettings,
} from "../model/TextSettings";
import { TextObject, TextToken, TextDescription } from "../model/TextObject";
import { TextCommand, TextLogbook } from "../model/TextConsole";
import { TextVenture } from "../model/TextVenture";
import { handleEffects, selectRandomPlayerResponses } from "./EffectHandler";
import { VentureSpy } from "./VentureSpy";

interface VentureProps {
  onSettingsChanged(copy: TextSettings): void;
  settings: TextSettings;
  text: TextVenture;
  onTextChanged(text: TextVenture | undefined): void;
  onPlaySound(url: string): void;
}

export function Venture(props: VentureProps) {
  return (
    <div className="TextVenture">
      <VentureWrapper {...props}></VentureWrapper>
    </div>
  );
}

export function VentureWrapper(props: VentureProps) {
  const text = props.text;
  const settings = props.settings;
  const [currentCommand, setCurrentCommand] = useState<TextCommand>({
    type: "command",
    action: TextActionNone,
    objects: [],
  });
  const [sceneSwitchEffect, setSceneSwitchEffect] = useState<SceneSwitchEffect>(
    () => sceneSwitchEffectEnd
  );
  const showPopup = useShowPopup();
  const refLastParagraph = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sceneSwitchEffect === sceneSwitchEffectStart) {
      var tout = setTimeout(() => {
        setSceneSwitchEffect(sceneSwitchEffectEnd);
      }, sceneEffectChangeTime);
    }
    return () => {
      clearTimeout(tout);
    };
  }, [sceneSwitchEffect]);

  function handleScrollToBottom() {
    setTimeout(() => {
      if (refLastParagraph.current) {
        refLastParagraph.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }

  const scene = getByIdOrFirst(text.scenes, text.currentSceneId);
  if (scene === undefined) {
    return <div>No scene selected</div>;
  }
  const player = getByIdOrFirst(text.players, text.currentPlayerId);
  if (player === undefined) {
    return <div>No player selected</div>;
  }

  function toLogbook(command: TextCommand): TextLogbook {
    const log: TextLogbook = {
      actionId: command.action.id,
      objects: command.objects.map((o) => {
        return {
          type: o.type,
          id: o.id,
          name: o.name,
        };
      }),
      command: commandToString(command),
      response: command.response,
      question: command.question,
      style: command.style,
      personTalkedToIndex: command.personTalkedToIndex,
      playerName: command.playerName,
      playerId: command.playerId,
    };
    console.log(log);
    return log;
  }

  function appendLogbook(logbookEntry: TextLogbook, hidePopup: boolean) {
    const newLogbook = [logbookEntry, ...text.logbook];
    while (newLogbook.length > text.logbookMaxLength) {
      newLogbook.splice(newLogbook.length - 1, 1);
    }
    text.logbook = newLogbook;
    props.onTextChanged(text);
    if (
      props.settings.consoleMode === "off" &&
      props.text.commandMode === "action" &&
      !hidePopup
    ) {
      showPopup(
        () => <TextVentureLogbook {...logbookEntry} />,
        getPopupTime(logbookEntry, props.settings.readingSpeed)
      );
    }
  }

  function appendCommandToLogbook(command: TextCommand, hidePopup?: boolean) {
    if (command.response || command.question) {
      const logbookEntry = toLogbook(command);
      appendLogbook(logbookEntry, hidePopup ?? false);
    }
  }

  function updateCurrentCommand(
    action: TextAction | undefined,
    object: TextObject | undefined
  ) {
    if (
      text.commandMode !== "action" &&
      action?.id !== "look-at" &&
      object?.type !== "player"
    ) {
      return;
    }

    let newCommand = { ...currentCommand };
    let update = false;
    if (action && newCommand.action.id !== action.id) {
      newCommand.action = action;
      newCommand.objects = [];
      update = true;
    }

    if (object) {
      const listed = newCommand.objects.find((obj) => obj.id === object.id);
      if (listed === undefined) {
        newCommand.objects.push(object);
        update = true;
        if (newCommand.action.id === "none" && text.actions["look-at"]) {
          newCommand.action = text.actions["look-at"];
        }
      }
    }

    if (update) {
      if (runCommand(newCommand)) {
        setTimeout(
          () =>
            setCurrentCommand({
              type: "command",
              action: TextActionNone,
              objects: [],
            }),
          1000
        );
      } else {
        setCurrentCommand(newCommand);
      }
    }
  }

  function runCommand(command: TextCommand): boolean {
    if (command.objects.length >= command.action.minCount) {
      let interaction: TextInteraction | undefined = undefined;
      command.objects.find((o) => {
        interaction = ifMatches(command, o?.interactions);
        if (interaction) {
          console.log("found interaction on " + o.id + ": " + interaction.id);
        }
        return interaction;
      });

      if (interaction) {
        return evalCommand(command, interaction);
      }

      interaction = ifMatches(command, scene?.interactions);
      if (interaction) {
        console.log(
          "found interaction on " + scene?.id + ": " + interaction.id
        );
        return evalCommand(command, interaction);
      }

      interaction = ifMatches(command, player?.interactions);
      if (interaction) {
        console.log(
          "found interaction on " + player?.id + ": " + interaction.id
        );
        return evalCommand(command, interaction);
      }

      interaction = ifMatches(command, text?.interactions);
      if (interaction) {
        console.log("found interaction on " + text?.id + ": " + interaction.id);
        return evalCommand(command, interaction);
      }
    }

    return false;
  }

  function evalCommand(
    command: TextCommand,
    interaction: TextInteraction
  ): boolean {
    let result = false;
    command.style = interaction.style;
    command.personTalkedToIndex = interaction.personTalkToIndex;
    command.playerName = player?.shortName;
    command.playerId = player?.id;
    switch (interaction.type) {
      case "random":
        command.response = selectRandomPlayerResponses(
          interaction.responses,
          player?.id ?? ""
        );
        appendCommandToLogbook(command);
        result = true;
        break;
      case "effect-or-random":
        if (
          interaction.effects === undefined ||
          interaction.effects.length === 0
        ) {
          command.response = selectRandomPlayerResponses(
            interaction.responses,
            player?.id ?? ""
          );
          appendCommandToLogbook(command);
        } else {
          command.response = selectRandomPlayerResponses(
            interaction.responses,
            player?.id ?? ""
          );
          appendCommandToLogbook(command, true);
        }
        result = true;
        break;
      case "effects":
        result = true;
        appendCommandToLogbook(command, true);
        break;
      case "look-at":
        command.response =
          getDescription(command.objects[0].description) ??
          selectRandomPlayerResponses(interaction.responses, player?.id ?? "");
        appendCommandToLogbook(command);
        result = true;
        break;
      case "look-at-player":
        command.response = selectRandomPlayerResponses(
          interaction.responses,
          player?.id ?? ""
        );
        appendCommandToLogbook(command);
        selectPlayer(command.objects[0]);
        result = true;
        break;
      case "walk-to":
        command.response = selectRandomPlayerResponses(
          interaction.responses,
          player?.id ?? ""
        );
        appendCommandToLogbook(command);
        selectScene(command.objects[0]);
        result = true;
        break;

      case "random-talk-to":
        command.question = selectRandomPlayerResponses(
          interaction.responses,
          player?.id ?? ""
        );
        command.response = selectRandomPlayerResponses(
          interaction.responses,
          player?.id ?? ""
        );
        appendCommandToLogbook(command);
        result = true;
        break;
      case "talk-to":
        text.commandMode = "conversation";
        text.currentConversationId = interaction.id;
        delete text.currentDialogId;
        props.onTextChanged(text);
        result = true;
        break;
    }

    if (result === true) {
      if (scene && player) {
        handleEffects(
          text,
          scene,
          player,
          interaction,
          command,
          props.onTextChanged,
          handleScrollToBottom,
          props.onPlaySound
        );
      }
      return result;
    }

    command.response = "Note from the author: That should not happen!";
    appendCommandToLogbook(command);

    return true;
  }

  function handleAction(action: TextAction) {
    updateCurrentCommand(action, undefined);
  }

  function handleRenderToken(type: string, id: string): TextToken | undefined {
    if (scene) {
      switch (type) {
        case "thing":
          return scene.things.find((t) => t.id === id);
        case "player":
          return text.players[id];
        case "person":
          return scene.persons.find((p) => p.id === id);
        case "scene":
          return text.scenes[id];
        case "link":
          return text.links[id];
        case "style":
          return {
            type: "style",
            id: id,
          };
      }
    }
    return undefined;
  }

  function handleObjectClick(object: TextObject) {
    const listed = currentCommand.objects.find((obj) => obj.id === object.id);
    if (listed === undefined) {
      updateCurrentCommand(currentCommand.action, object);
    }
  }

  function handleNextDialog(dialog: undefined) {}

  function ifMatches(
    command: TextCommand,
    interactions: TextInteraction[] | undefined
  ): TextInteraction | undefined {
    if (interactions === undefined) {
      return undefined;
    }
    const interaction = interactions.find((i) => {
      logInteraction("---------------------");
      logInteraction("checking interaction: " + i.id);

      if (player && i.matchesPlayer && i.matchesPlayer !== player.id) {
        logInteraction("does not match player");
        return false;
      }
      const actionMatch = doesActionMatch(command.action, i.matchesAction);
      if (actionMatch) {
        logInteraction("action matched ", i.matchesAction);
        const objectsMatch = doesObjectsMatch(
          command.objects,
          i.matchesObjects
        );
        if (objectsMatch) {
          logInteraction("objects matched ", i.matchesObjects);
        }
        return actionMatch && objectsMatch;
      }
      return false;
    });

    return interaction;
  }

  function doesObjectsMatch(
    objects: TextObject[],
    patterns: TextObjectPattern[] | "any" | undefined
  ): boolean {
    if (patterns === "any") {
      return true;
    }
    if (patterns) {
      if (patterns.length !== objects.length) {
        return false;
      }
      logInteraction("objects length is okay");
      const matches = objects.map((obj, idx) => {
        const pattern = patterns[idx];
        if (matchesAny(Boolean(pattern?.any))) {
          logInteraction("objects any matches");
          return true;
        }
        if (matchesOneOf(pattern.oneIdOf, obj.id)) {
          logInteraction("objects id matches");
          return true;
        }
        if (pattern.isCurrentPlayer && obj.id === player?.id) {
          logInteraction("objects is player matches");
          return true;
        }
        if (matchesOneOf(pattern.oneTypeOf, obj.type)) {
          logInteraction("objects type matches");
          return true;
        }
        if (
          pattern.currentPlayerHasIt &&
          player?.things.find((item) => item.id === obj.id) !== undefined
        ) {
          logInteraction("objects player has it matches");
          return true;
        }
        return false;
      });

      let matchAll = true;
      matches.forEach((match) => {
        matchAll = matchAll && match;
      });
      return matchAll;
    }
    return false;
  }

  function doesActionMatch(
    action: TextAction,
    pattern: TextActionPattern | undefined
  ) {
    if (pattern) {
      if (matchesAny(pattern?.any)) {
        return true;
      }
      if (matchesOneOf(pattern?.oneOf, action.id)) {
        return true;
      }
    }
    return false;
  }

  function getDescription(text: TextDescription) {
    if (Array.isArray(text) && text.length > 0) {
      return text[0];
    } else if (typeof text === "string") {
      return text;
    }
    return undefined;
  }

  function selectPlayer(nextPlayer: TextObject) {
    if (
      nextPlayer.type === "player" &&
      nextPlayer.id !== text.currentPlayerId
    ) {
      setTimeout(() => {
        text.currentPlayerId = nextPlayer?.id;
        props.onTextChanged(text);
      }, 100);
    }
  }

  function selectScene(scene: TextObject) {
    if (scene.type === "scene" && scene.id !== text.currentSceneId) {
      setSceneSwitchEffect(sceneSwitchEffectStart);
      setTimeout(() => {
        text.currentSceneId = scene.id;
        props.onTextChanged(text);
        window.scrollTo({ top: 0 });
      }, sceneEffectChangeTime);
    }
  }

  return (
    <>
      <ConsoleMenu
        text={text}
        command={currentCommand}
        mode={settings.consoleMode}
        onModeChanged={(mode) => {
          let copy = { ...settings };
          copy.consoleMode = mode;
          props.onSettingsChanged(copy);
        }}
        onTextChange={props.onTextChanged}
        appendLogbook={appendLogbook}
        onScrollToBottom={handleScrollToBottom}
        onPlaySound={props.onPlaySound}
      />

      <InventoryMenu
        onObjectClick={handleObjectClick}
        player={player}
        mode={settings.inventoryMode}
        onModeChanged={(mode) => {
          let copy = { ...settings };
          copy.inventoryMode = mode;
          props.onSettingsChanged(copy);
        }}
      />

      <ActionMenu
        currentAction={currentCommand.action}
        actions={text.actions}
        onAction={handleAction}
        mode={props.settings.actionMode}
        onModeChanged={(mode) => {
          let copy = { ...settings };
          copy.actionMode = mode;
          props.onSettingsChanged(copy);
        }}
        commandMode={text.commandMode}
      />

      <div className={sceneSwitchEffect}>
        {scene.id === Object.keys(text.scenes)[0] && (
          <SceneHeader text={text} />
        )}

        <Scene
          scene={scene}
          onNextDialog={handleNextDialog}
          onObjectClick={handleObjectClick}
          onRenderToken={handleRenderToken}
          refLastParagraph={refLastParagraph}
        ></Scene>
      </div>
      <VentureSpy {...text}></VentureSpy>
    </>
  );
}

function logInteraction(text: string, obj?: any) {
  if (obj) {
    return console.log(text, obj);
  } else {
    return console.log(text);
  }
}
function getPopupTime(
  logbookEntry: TextLogbook,
  readingSpeed?: ReadingSpeed
): number {
  let letters = logbookEntry.command.length;
  if (logbookEntry.question) {
    letters += logbookEntry.question.length;
  }
  if (logbookEntry.response) {
    letters += logbookEntry.response.length;
  }

  const wordsPerMinute = ReadingSpeedMap.get(readingSpeed ?? "medium") ?? 150;
  const words = letters / 5;
  const s = 1000.0;
  const min = 60.0 * s;
  const time = (words / wordsPerMinute) * min;
  return time;
}
