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
    <div className="About">
      <h1>About Text Venture</h1>

      <h3>Legal</h3>
      <p>
        Text Venture is a fictional website created for demonstration purposes
        only. Any resemblance to real websites or products is purely
        coincidental.
      </p>

      <h3>Issues</h3>
      <p>
        If you encounter any issues or have feature requests for Text Venture,
        please visit the GitHub repository:
      </p>
      <p>
        <a
          className="github-link"
          href="https://github.com/dominik-da-rocha/text-venture"
        >
          <img
            src={"/icons/github.svg"}
            alt="https://github.com/dominik-da-rocha/text-venture"
          />
          <span>https://github.com/dominik-da-rocha/text-venture</span>
        </a>
      </p>

      <h3>Acknowledgements</h3>
      <ul></ul>

      <h3>Impressum</h3>
      <p>
        <span>
          Dominik da Rocha <br />
        </span>
        <span>
          todo-get-an-email@text-venture.com
          <br />
        </span>
      </p>

      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}
