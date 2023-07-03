import React from "react";
import "./Scene.css";
import { TextScene } from "../model/TextScene";
import { TextObject, TextToken } from "../model/TextObject";
import { TokenProcessor } from "./TokenProcessor";

export type SceneSwitchEffect = "start-scene-switch" | "end-scene-switch";
export const sceneEffectChangeTime = 500;
export const sceneSwitchEffectStart = "start-scene-switch";
export const sceneSwitchEffectEnd = "end-scene-switch";

export interface SceneProps {
  scene: TextScene | undefined;
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
  onNextDialog(dialog: undefined): void;
  refLastParagraph: React.RefObject<HTMLDivElement>;
}

export function Scene(props: SceneProps) {
  return <SceneSelect {...props} />;
}

function SceneSelect(props: SceneProps) {
  if (props.scene !== undefined) {
    switch (props.scene.type) {
      case "scene":
        return <SceneViewer {...props} />;
    }
  }

  return (
    <article className="red-alert">No scene or conversation selected!</article>
  );
}

interface SceneViewerProps extends SceneProps {}

function SceneViewer(props: SceneViewerProps) {
  if (!props.scene) {
    return <></>;
  }

  return (
    <div key={props.scene?.id} className="Scene smoothIn">
      <h2>{props.scene.name}</h2>
      <SceneTextViewer
        className="Paragraphs"
        text={props.scene.paragraphs ?? []}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
        firstLetterLarge
        refLastParagraph={props.refLastParagraph}
      />
      {props.scene.footnotes && props.scene.footnotes.length > 0 ? (
        <SceneTextViewer
          className="Footnotes"
          text={props.scene.footnotes ?? []}
          onRenderToken={props.onRenderToken}
          onObjectClick={props.onObjectClick}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

interface SceneTextViewerProps {
  className: string;
  text: string | string[];
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
  firstLetterLarge?: boolean;
  refLastParagraph?: React.RefObject<HTMLDivElement>;
}

function SceneTextViewer(props: SceneTextViewerProps) {
  if (typeof props.text === "string") {
    return (
      <SceneTextArrayViewer
        className={props.className}
        text={[props.text]}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
        firstLetterLarge={props.firstLetterLarge}
        refLastParagraph={props.refLastParagraph}
      />
    );
  } else {
    return (
      <SceneTextArrayViewer
        className={props.className}
        text={props.text}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
        firstLetterLarge={props.firstLetterLarge}
        refLastParagraph={props.refLastParagraph}
      />
    );
  }
}

interface SceneTextArrayViewerProps {
  className: string;
  text: string[];
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
  firstLetterLarge?: boolean;
  refLastParagraph?: React.RefObject<HTMLDivElement>;
}

function SceneTextArrayViewer(props: SceneTextArrayViewerProps) {
  return (
    <div className={props.className}>
      {TokenProcessor(
        props.text,
        (tokenEvent) => {
          const object = props.onRenderToken(
            tokenEvent.tokenType,
            tokenEvent.tokenId
          );
          const warn =
            object === undefined || tokenEvent.tokens.length < 3
              ? "red-alert nop"
              : "";
          const className = [object?.type, object?.id, warn].join(" ");
          switch (object?.type) {
            case "link":
              return (
                <a
                  title={warn ? tokenEvent.span : ""}
                  key={tokenEvent.spanIdx}
                  href={object.url}
                  target={object.isInternal ? undefined : "_blank"}
                  rel={object.isInternal ? undefined : "noreferrer noopener"}
                  className={"SceneLink " + className}
                >
                  {warn ? "⚠" : ""}
                  {tokenEvent.tokenText ?? tokenEvent.span}
                </a>
              );
            case "style":
              return (
                <span
                  key={tokenEvent.spanIdx}
                  className={"SceneStyle " + className + " " + object.id}
                >
                  {tokenEvent.tokenText}
                </span>
              );
            default:
              return (
                <span
                  title={warn ? tokenEvent.span : ""}
                  key={tokenEvent.spanIdx}
                  className={"SceneObject " + className}
                  onClick={(event) => {
                    event.preventDefault();
                    if (object !== undefined) {
                      props.onObjectClick(object);
                    }
                  }}
                >
                  {warn ? "⚠" : ""}
                  {tokenEvent.tokenText ?? tokenEvent.span}
                </span>
              );
          }
        },
        (textEvent) => {
          return (
            <span key={textEvent.spanIdx} className="Text">
              {textEvent.span}
            </span>
          );
        },
        (joinEvent) => {
          const isFirstParagraph = joinEvent.paragraphIdx === 0;
          const isLastParagraph =
            joinEvent.paragraphIdx === joinEvent.paragraphs.length - 1;

          const className = [
            "Paragraph",
            isFirstParagraph && props.firstLetterLarge
              ? " first-letter-large"
              : "",
            "smoothIn",
            isLastParagraph ? "SceneBottom" : "",
          ].join(" ");

          return (
            <p
              className={className}
              key={joinEvent.paragraphIdx}
              ref={
                joinEvent.paragraphIdx === joinEvent.paragraphs.length - 1
                  ? props.refLastParagraph
                  : undefined
              }
            >
              {joinEvent.spans}
            </p>
          );
        }
      )}
    </div>
  );
}
