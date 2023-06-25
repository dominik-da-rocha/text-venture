import React, { useState } from "react";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function Navbar() {
  const [show, setShow] = useState<"show" | "hidden">("show");

  function toggleNavbar() {
    setShow(show === "show" ? "hidden" : "show");
  }

  return (
    <div className="Navbar">
      <div className={["Buttons", show].join(" ")}>
        <HomeButton></HomeButton>
        <SettingsButton></SettingsButton>
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
