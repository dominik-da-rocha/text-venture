import React from "react";
import "./Home.css";
import { TableOfContents, TableOfContentsItem } from "./TableOfContents";
import { Anecdote } from "./Anecdote";

export interface Chapter {
  id: string;
  name: string;
  disabled?: boolean;
}

export interface HomeProps {
  chapters: Chapter[];
}

export function Home(props: HomeProps) {
  let page = 1;
  return (
    <div className="Home">
      <img src="icons/logo.svg" alt="txt" className="Watermark" />
      <div className="Title">
        <h1>
          <span>Text Venture</span>
        </h1>
        <div className="Subtitle">Breathtaking Quests</div>
      </div>
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
