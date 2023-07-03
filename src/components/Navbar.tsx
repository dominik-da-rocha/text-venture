import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { AudioPlayer, AudioState } from "./AudioPlayer";

export function Navbar(props: { audio: AudioState }) {
  const [show, setShow] = useState<"show" | "hidden">("hidden");
  const [autoClose, setAutoClose] = useState(0);
  const sec = 1000;
  const checkIntervall = 1;
  const closeAfter = 10;

  function toggleNavbar() {
    setShow(show === "show" ? "hidden" : "show");
  }

  useEffect(() => {
    if (show === "show") {
      let timeout = setTimeout(() => {
        if (autoClose > closeAfter) {
          setShow("hidden");
        }
        let newAuto = autoClose + checkIntervall;
        setAutoClose(newAuto);
      }, checkIntervall * sec);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [autoClose, show]);

  return (
    <div className="Navbar" onMouseMove={() => setAutoClose(0)}>
      <div className={["Buttons", show].join(" ")}>
        <HomeButton></HomeButton>
        <SettingsButton></SettingsButton>
        <AudioPlayer {...props.audio} />
      </div>
      <MenuButton className={show} onClick={toggleNavbar}></MenuButton>
    </div>
  );
}

function HomeButton() {
  const navigate = useNavigate();
  return (
    <Button className="ButtonHome" onClick={() => navigate("/")}>
      <Icon>home</Icon>
    </Button>
  );
}

export function SettingsButton() {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/settings") {
    return (
      <Button onClick={() => navigate(-1)} className="SettingsButton">
        <Icon>arrow_back</Icon>
      </Button>
    );
  } else {
    return (
      <Button onClick={() => navigate("settings")} className="SettingsButton">
        <Icon>settings</Icon>
      </Button>
    );
  }
}

interface MenuButtonProps {
  onClick(): void;
  className?: string;
}

function MenuButton(props: MenuButtonProps) {
  return (
    <Button
      className={["MenuButton", props.className ?? ""].join(" ")}
      onClick={props.onClick}
    >
      <Icon>menu</Icon>
    </Button>
  );
}
