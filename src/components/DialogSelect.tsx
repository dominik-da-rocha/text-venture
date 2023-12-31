import React, { useEffect, useState } from "react";
import "./DialogSelect.css";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { TextObject, TextPlayer } from "../model/TextObject";
import {
  TextInteractionTalkTo,
  TextInteractionTalkToQuestion,
} from "../model/TextInteraction";
import { TextVenture } from "../model/TextVenture";
import { TextScene } from "../model/TextScene";
import { TextCommand, TextLogbook } from "../model/TextConsole";
import { handleEffects } from "./EffectHandler";

export interface DialogSelectProps {
  text: TextVenture;
  personTalkedTo: TextObject;
  command: TextCommand;
  onTextChanged(text: TextVenture): void;
  appendLogbook(logbookEntry: TextLogbook): void;
  onScrollToBottom(): void;
  onPlaySound(url: string): void;
}

export function DialogSelect(props: DialogSelectProps) {
  const text = props.text;
  const scene = text.scenes[text.currentSceneId] as TextScene;
  const player = text.players[text.currentPlayerId] as TextPlayer;
  const command = props.command;
  const conversation = scene.interactions.find(
    (ia) => ia.id === text.currentConversationId && ia.type === "talk-to"
  ) as TextInteractionTalkTo | undefined;
  const [personTalkedToId] = useState(() => props.personTalkedTo.id);
  const [dialogsToChooseFrom, setDialogsToChooseFrom] = useState<string[]>([]);
  const [selectedDialogIdx, setSelectedDialogIdx] = useState<number>(() => 0);
  const personTalkedTo = scene.persons.find((p) => p.id === personTalkedToId);

  useEffect(() => {
    if (conversation) {
      if (text.currentDialogId === undefined) {
        setDialogsToChooseFrom(conversation.startDialogIds);
      } else {
        const dialog = conversation.dialogs[text.currentDialogId];
        if (dialog) {
          setDialogsToChooseFrom(dialog.next);
        }
      }
    }
  }, [text.currentDialogId, conversation]);

  function handleDialogOkClick() {
    const conversation = scene.interactions.find(
      (ia) => ia.id === text.currentConversationId && ia.type === "talk-to"
    ) as TextInteractionTalkTo | undefined;

    if (!conversation) {
      console.warn("conversation is undefined");
      return;
    }
    if (selectedDialogIdx < 0) {
      console.warn("user ended conversation");
      delete text.currentDialogId;
      delete text.currentConversationId;
      text.commandMode = "action";
      props.onTextChanged({ ...text });
      return;
    }
    if (!scene) {
      console.warn("scene is undefined");
      return;
    }
    if (!player) {
      console.warn("player is undefined");
      return;
    }
    if (selectedDialogIdx >= dialogsToChooseFrom.length) {
      console.warn("selectedDialogIdx is out of bounds");
      return;
    }
    const selectedDialogId = dialogsToChooseFrom[selectedDialogIdx];
    if (!selectedDialogId) {
      console.warn("selectedDialogId is undefined", dialogsToChooseFrom);
      return;
    }
    const selectedDialog = conversation.dialogs[selectedDialogId];
    if (!selectedDialog) {
      console.warn("selectedDialogId is undefined");
      return;
    }
    if (!personTalkedTo) {
      console.warn("personTalkedTo is undefined");
      return;
    }

    let pc = selectedDialog?.pc[player.id];
    if (pc === undefined) {
      console.warn("speech for " + player.id + " is undefined");
      return;
    }
    let npc = selectedDialog.npc;
    let pcParagraphs = pc?.paragraphs;
    props.onScrollToBottom();
    setTimeout(() => {
      if (pc) {
        scene.paragraphs.push(...pcParagraphs);
      }
      scene.paragraphs.push(npc);
      props.onTextChanged(text);
    }, 200);

    handleEffects(
      text,
      scene,
      player,
      selectedDialog,
      command,
      props.onTextChanged,
      props.onScrollToBottom,
      props.onPlaySound
    );

    let deletedIds = dropDialogIfAsked(conversation, selectedDialogId);
    deletedIds.forEach((id) => {
      let idx = selectedDialog.next.findIndex((next) => next === id);
      if (idx >= 0) {
        selectedDialog.next.splice(idx, 1);
      }
    });
    setDialogsToChooseFrom([...selectedDialog.next]);

    let logbook: TextLogbook = {
      objects: [
        {
          id: personTalkedTo.id,
          name: personTalkedTo.name,
          type: personTalkedTo.type,
        },
      ],
      actionId: "talk-to",
      command: "",
      playerId: player.id,
      playerName: player.name,
      question: pc.short,
      response: npc,
    };
    setTimeout(() => {
      props.appendLogbook(logbook);
    }, 1);

    if (Object.keys(conversation.dialogs).length === 0) {
      let idx = scene.interactions.findIndex((ia) => ia.id === conversation.id);
      if (idx >= 0) {
        scene.interactions.splice(idx, 1);
      }
      setTimeout(() => {
        delete text.currentConversationId;
        delete text.currentDialogId;
        text.commandMode = "action";
        props.onTextChanged({ ...text });
      }, 100);
    } else {
      text.currentDialogId = selectedDialogId;
    }
    props.onTextChanged({ ...text });
    setSelectedDialogIdx(0);
  }

  return (
    <div className="DialogSelect">
      <span className={["player", player.id].join(" ")}>
        {player.shortName}:{" "}
      </span>
      <select
        value={selectedDialogIdx}
        onChange={(e) => setSelectedDialogIdx(Number.parseInt(e.target.value))}
      >
        {dialogsToChooseFrom.map((dialogId, idx) => {
          const dialog = conversation?.dialogs[dialogId];
          if (!dialog) {
            return undefined;
          }
          return (
            <option key={dialogId} value={idx}>
              {dialog.pc[player.id]?.short ?? "speech is for player undefined"}
            </option>
          );
        })}
      </select>
      <Button onClick={handleDialogOkClick} id="text-venture-dialog-ok">
        <Icon>check</Icon>
      </Button>
    </div>
  );
}

function dropDialogIfAsked(
  conversation: TextInteractionTalkTo,
  dialogId: string
): string[] {
  const dialogs = conversation.dialogs;
  const deletedIds = [];
  const dialogsToDelete: string[] = [];
  const dialog = dialogs[dialogId];
  if (
    dialog !== undefined &&
    (dialog.dropIfAsked || dialog.next.length === 0)
  ) {
    console.log("deleted " + dialogId);
    deletedIds.push(dialogId);
    delete dialogs[dialogId];
    const idx = conversation.startDialogIds.findIndex((id) => dialogId === id);
    if (idx >= 0) {
      conversation.startDialogIds.splice(idx, 1);
    }

    Object.keys(dialogs)
      .map((key) => {
        return {
          id: key,
          dialog: dialogs[key] as TextInteractionTalkToQuestion,
        };
      })
      .forEach((pair) => {
        const idx = pair.dialog.next.findIndex((d) => d === dialogId);
        if (idx >= 0) {
          pair.dialog.next.splice(idx, 1);
        }

        if (pair.dialog.next.length === 0) {
          dialogsToDelete.push(pair.id);
        }
      });

    dialogsToDelete.forEach((id) => {
      deletedIds.push(...dropDialogIfAsked(conversation, id));
    });
  }
  return deletedIds;
}
