import { useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import "./VentureSpy.css";

export function VentureSpy(props: any) {
  const [mode, setMode] = useState<"on" | "off">("off");
  function toggleOnOff() {
    setMode(mode === "off" ? "on" : "off");
  }
  return (
    <div className={["VentureSpy", mode].join(" ")}>
      <Button className="SpyOnOff" onClick={toggleOnOff}>
        <Icon>build</Icon>
      </Button>
      <code>
        <div className="Header">Venture Spy</div>
        <div className="Tree">
          <ObjectTree name="TextVenture" item={props} />
        </div>
      </code>
    </div>
  );
}

function ObjectTree(props: { name: string; item: any }) {
  const [expanded, setExpanded] = useState(true);

  function toggleExpand() {
    setExpanded(!expanded);
  }
  if (!props) {
    return <></>;
  }
  if (!props.name) {
    return <></>;
  }
  if (!props.item) {
    return <></>;
  }

  const keys = Object.keys(props.item);
  const type = typeof props.item;
  switch (type) {
    case "object":
      return (
        <ul className="Object">
          <li>
            <span>
              {Array.isArray(props.item) ? "[] " : "{} "}
              {props.name}
            </span>
            {keys.length > 0 ? (
              <Button onClick={toggleExpand}>
                <Icon>{expanded ? "expand_less" : "expand_more"}</Icon>
              </Button>
            ) : (
              <></>
            )}
          </li>

          {expanded ? (
            Object.keys(props.item).map((key) => {
              return <ObjectTree item={props.item[key]} name={key} key={key} />;
            })
          ) : (
            <></>
          )}
        </ul>
      );

    case "string": {
      return (
        <li className="String">
          <span>
            {'""'} {props.name}: {props.item}
          </span>
        </li>
      );
    }

    case "number": {
      return (
        <li className="String">
          <span>
            {"##"} {props.name}: {props.item}
          </span>
        </li>
      );
    }
  }
  return (
    <li>
      {type}: {props.name}: {props.item + ""}
    </li>
  );
}
