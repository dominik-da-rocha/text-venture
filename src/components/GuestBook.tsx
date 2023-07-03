import React, { useEffect, useState } from "react";
import "./GuestBook.css";
import { Button } from "./Button";
import { Icon } from "./Icon";

const defaultNames = [
  "The Nebula Gazette",
  "Stellar Chronicles",
  "Celestial Observer",
  "Galaxy Gazette",
  "Cosmic Times",
  "Interstellar Herald",
  "Astral Bulletin",
  "Solar Flare Tribune",
  "Andromeda News",
  "Stellar Tribune",
  "Lunar Gazette",
  "Supernova Chronicle",
  "Solar System Herald",
  "Interstellar Journal",
  "Galactic Times",
  "Cosmos Chronicle",
  "Orion's Observer",
  "Astral Express",
  "Celestial Gazette",
  "Star Cluster Chronicle",
  "Galactic Observer",
  "Nebulaic Times",
  "Orion's Chronicle",
  "Interstellar Herald",
  "Draco Daily",
  "Solar Flare Gazette",
  "Andromeda Observer",
  "Stellar Bulletin",
  "Celestial Post",
  "Cosmic Herald",
  "Astral Times",
  "Stellar Gazette",
  "Interstellar Journal",
  "Cosmos Chronicle",
  "Solar System Observer",
  "Nebulaic Tribune",
  "Star Cluster Herald",
  "Galactic Express",
  "Celestial Tribune",
  "Lunar Observer",
  "Andromeda Chronicle",
  "Draco Herald",
  "Interstellar Times",
  "Rigel's Gazette",
  "Nebulaic Bulletin",
  "Stellar Chronicle",
  "Cosmos Observer",
  "Solar Flare Journal",
  "Interstellar Post",
  "Orion's Tribune",
  "Lunar Gazette",
  "Andromeda Times",
  "Stellar Observer",
  "Polaris Bulletin",
  "Celestial Herald",
  "Nebulaic Post",
  "Phoenix's Chronicle",
  "Draco Tribune",
  "Interstellar Express",
  "Rigel's Observer",
  "Nebulaic Gazette",
  "Stellar Chronicle",
  "Cosmic Times",
  "Solar System Herald",
  "Orion's Journal",
  "Lunar Gazette",
  "Andromeda Observer",
  "Stellar Bulletin",
  "Polaris Chronicle",
  "Celestial Post",
  "Nebulaic Tribune",
  "Solar Flare",
  "Interstellar Herald",
  "Cassiopeia's Gazette",
  "Rigel's Times",
  "Nebulaic Observer",
  "Stellar Bulletin",
  "Cosmos Chronicle",
  "Solar System Tribune",
  "Orion's Post",
  "Lunar Herald",
  "Andromeda Express",
  "Stellar Observer",
  "Polaris Gazette",
  "Celestial Chronicle",
  "Nebulaic Times",
  "Solar Flare Herald",
  "Interstellar Journal",
  "Cassiopeia's Tribune",
  "Rigel's Observer",
  "Nebulaic Bulletin",
  "Stellar Chronicle",
  "Cosmic Times",
  "Solar System Herald",
  "Orion's Gazette",
  "Lunar Observer",
  "Andromeda Tribune",
  "Stellar Express",
  "Polaris Chronicle",
  "Celestial Herald",
];

function getRandomName() {
  const idx = Math.round(Math.random() * defaultNames.length);
  return defaultNames[idx];
}

export function GuestBook() {
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [preview, setPreview] = useState<"on" | "off">("off");
  const [entries, setEntries] = useState<GuestBookEntryProps[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [defaultName, setDefaultName] = useState(getRandomName);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleCommentChanged(text: string) {
    setError(undefined);
    setComment(
      text
        .split("\n")
        .filter((_, idx) => idx < 10)
        .join("\n")
    );
  }

  function handleNameChanged(text: string) {
    setError(undefined);
    setName(text);
  }

  function togglePreview() {
    setPreview(preview === "off" ? "on" : "off");
  }

  function handleSendClick() {
    if (comment.length === 0) {
      setError("Comment is empty");
      return;
    }
    let nameToSend = name;
    if (nameToSend.length === 0) {
      nameToSend = defaultName;
    }
    fetch("/api/v1/guest-book", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ comment: comment, name: nameToSend }),
    })
      .then(function (res) {
        console.log(res);
        setRefetch(!refetch);
        setComment("");
        setName("");
        setDefaultName(getRandomName());
        setError(undefined);
      })
      .catch(function (error) {
        setError(error);
        console.log(error);
      });
  }

  function fetchEntries() {
    fetch("/api/v1/guest-book", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(response.status + " " + response.statusText);
        }
      })
      .then((entries) => {
        setEntries(entries);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  useEffect(fetchEntries, [refetch]);

  return (
    <div className="GuestBook">
      <h1>Guest Book</h1>
      <div>
        <textarea
          value={comment}
          className="CommentInput"
          onChange={(e) => handleCommentChanged(e.target.value)}
          maxLength={255}
          rows={10}
          wrap="hard"
          placeholder="Please leave a comment"
        />

        <input
          value={name}
          onChange={(e) => handleNameChanged(e.target.value)}
          placeholder={defaultName}
          className="NameInput"
          maxLength={64}
        />

        <div className="Buttons">
          <Button onClick={togglePreview} checked={preview === "on"}>
            <Icon>preview</Icon>
          </Button>
          <Button onClick={() => handleSendClick()}>
            <Icon>send</Icon>
          </Button>
        </div>

        {error !== undefined ? (
          <div className="Error red-alert">
            <h3>Error</h3>
            {"" + error}
          </div>
        ) : (
          <></>
        )}

        <div className={["Preview", preview].join(" ")}>
          <GuestBookEntry
            comment={comment}
            name={name === "" ? defaultName : name}
          />
        </div>
      </div>

      <div className="Entries">
        {entries.map((entry, idx) => {
          return <GuestBookEntry key={idx} {...entry} />;
        })}
      </div>
    </div>
  );
}

interface GuestBookEntryProps {
  comment: string;
  name: string;
}

function GuestBookEntry(props: GuestBookEntryProps) {
  const comment = props.comment;
  const name = props.name;
  return (
    <div className="GuestBookEntry">
      <div className="Comments">
        {comment.split("\n").map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <div className="Name">- {name}</div>
    </div>
  );
}
