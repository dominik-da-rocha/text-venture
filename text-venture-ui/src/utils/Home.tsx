import React from "react";
import "./Home.css";
import { TableOfContents, TableOfContentsItem } from "./TableOfContents";
import { Link } from "react-router-dom";

export function Home() {
  let page = 1;
  return (
    <div className="Home">
      <h1>Text Venture</h1>
      <div className="Subtitle">Breathtaking Quests</div>
      <p>
        <TableOfContents>
          <TableOfContentsItem
            title="Captain Hunters Space Quest"
            path="/captain-hunters-space-quest"
            page={page++}
          />
          <TableOfContentsItem
            path="/settings"
            title="Settings"
            page={page++}
          />
          <TableOfContentsItem path="/help" title="Help" page={page++} />
          <TableOfContentsItem path="/about" title="About" page={page++} />
        </TableOfContents>
      </p>
    </div>
  );
}

export function About() {
  return (
    <div>
      <h1>Text Venture</h1>
      <div className="Subtitle">About the the Website</div>
      <p>
        <h3>Contact</h3>
        <div>Dominik da Rocha</div>
        <div>dominik.da.rocha@gmail.com</div>
      </p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}
