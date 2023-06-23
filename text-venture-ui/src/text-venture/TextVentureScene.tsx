import React from "react";
import { TextObject } from "./../model/TextVenture";
import { TextScene } from "./../model/TextScene";

export interface TextVentureSceneProps {
  scene: TextScene | undefined;
  onRenderToken(type: string, id: string): TextObject | undefined;
  onObjectClick(object: TextObject): void;
  onNextDialog(dialog: undefined): void;
  blur: "blur" | "no-blur";
}

export function TextVentureScene(props: TextVentureSceneProps) {
  return (
    <div className={props.blur}>
      <TextVentureSceneSelect {...props} />
    </div>
  );
}

function TextVentureSceneSelect(props: TextVentureSceneProps) {
  if (props.scene !== undefined) {
    switch (props.scene.type) {
      case "scene":
        return <SceneViewer {...props} />;
    }
  }

  return <article className="warn">No scene or conversation selected!</article>;
}

interface SceneViewerProps extends TextVentureSceneProps {}

function SceneViewer(props: SceneViewerProps) {
  if (!props.scene) {
    return <></>;
  }
  return (
    <div key={props.scene?.id} className="TextVentureScene">
      <div className="Description">
        <h2>{props.scene.name}</h2>
        <SceneTextViewer
          text={props.scene.description ?? []}
          onRenderToken={props.onRenderToken}
          onObjectClick={props.onObjectClick}
        />
      </div>
    </div>
  );
}

interface SceneTextViewerProps {
  text: string | string[];
  onRenderToken(type: string, id: string): TextObject | undefined;
  onObjectClick(object: TextObject): void;
}

function SceneTextViewer(props: SceneTextViewerProps) {
  if (typeof props.text === "string") {
    return (
      <SceneTextArrayViewer
        text={[props.text]}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
      />
    );
  } else {
    return (
      <SceneTextArrayViewer
        text={props.text}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
      />
    );
  }
}

interface SceneTextArrayViewerProps {
  text: string[];
  onRenderToken(type: string, id: string): TextObject | undefined;
  onObjectClick(object: TextObject): void;
}

function SceneTextArrayViewer(props: SceneTextArrayViewerProps) {
  const paragraphs = props.text.map((p, pkey) => {
    const spans = p
      .split(/({[a-z-]*:[a-z-]*:[a-zA-Z -,.—_:"']*})/)
      .map((s, skey) => {
        if (s.startsWith("{") && s.endsWith("}")) {
          const tokens = s.substring(1, s.length - 1).split(":");
          const object = props.onRenderToken(tokens[0], tokens[1]);
          const warn = object === undefined || tokens.length < 3 ? "warn" : "";
          const className = [object?.type, object?.id, warn].join(" ");
          return (
            <a
              key={skey}
              href="?"
              className={className}
              onClick={(event) => {
                event.preventDefault();
                if (object !== undefined) {
                  props.onObjectClick(object);
                }
              }}
            >
              {warn ? "⚠" : ""}
              {tokens[2] ?? s}
            </a>
          );
        } else {
          return (
            <span key={skey} className="Text">
              {s}
            </span>
          );
        }
      });
    return (
      <p className="Paragraph" key={pkey}>
        {spans}
      </p>
    );
  });
  return <div className="Paragraphs">{paragraphs}</div>;
}
