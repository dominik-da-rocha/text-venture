import React from "react";
import "./Home.css";
import { TableOfContents, TableOfContentsItem } from "./TableOfContents";
import { Link } from "react-router-dom";
import { Anecdote } from "./Anecdote";

export interface Chapter {
  id: string;
  name: string;
}

export interface HomeProps {
  chapters: Chapter[];
}

export function Home(props: HomeProps) {
  let page = 1;
  return (
    <div className="Home">
      <h1>Text Venture</h1>
      <div className="Subtitle">Breathtaking Quests</div>
      <Anecdote
        chronicler="Orion Starfield"
        source="Anachronic of the Milky Way"
      >
        Ah, my dear friends, let me regale you with the wonders I've witnessed!
        I've soared through galaxies, danced with stars, and beheld
        civilizations beyond imagination. Time itself has unraveled before my
        very eyes, revealing the tapestry of history as I gallantly traversed
        its threads.
      </Anecdote>

      <TableOfContents>
        {props.chapters.map((chapter) => {
          return (
            <TableOfContentsItem
              key={chapter.id}
              path={chapter.id}
              title={chapter.name}
              page={page++}
            />
          );
        })}
        <TableOfContentsItem
          path="guest-book"
          title="Guest Book"
          page={page++}
        />
        <TableOfContentsItem path="about" title="About" page={page++} />
      </TableOfContents>
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
