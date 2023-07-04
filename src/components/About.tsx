import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

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
            className="Icon"
            src={"/icons/github.svg"}
            alt="https://github.com/dominik-da-rocha/text-venture"
          />
          <span>https://github.com/dominik-da-rocha/text-venture</span>
        </a>
      </p>

      <h3>Acknowledgements</h3>
      <h4>Used Tools and libraries</h4>
      <ul className="Acknowledgements">
        <li>
          <span>
            front end is created with <a href="https://react.dev/">react</a>
          </span>
        </li>
        <li>
          <span>
            icons are provided by{" "}
            <a href="https://fonts.google.com/icons">material icons</a>
          </span>
        </li>
        <li>
          <span className="cursive">
            cursive font is{" "}
            <a href="https://fonts.google.com/specimen/Kalam">Kalam</a>
          </span>
        </li>
        <li>
          <span className="serif">
            serif font is{" "}
            <a href="https://fonts.google.com/specimen/Kotta+One">Kotta One</a>
          </span>
        </li>
        <li>
          <span className="sans-serif">
            sans serif font is{" "}
            <a href="https://fonts.google.com/specimen/M+PLUS+Rounded+1c">
              M PLUS Rounded 1c
            </a>
          </span>
        </li>
        <li>
          <span className="monospace">
            monospace font is{" "}
            <a href="https://fonts.google.com/specimen/Source+Code+Pro">
              Source Code Pro
            </a>
          </span>
        </li>
        <li>
          <span>
            content is created with the help of{" "}
            <a href="https://openai.com/blog/chatgpt">OpenAI - ChatGPT</a>
          </span>
        </li>
        <li>
          <span>
            back end is written in <a href="https://go.dev/">go</a>
          </span>
        </li>
        <li>
          <span>
            <a href="https://www.sqlite.org/index.html">SQLite</a> is used as
            database
          </span>
        </li>
        <li>
          <span>
            most of the source code is edited in{" "}
            <a href="https://code.visualstudio.com/">Visual Studio Code</a>
          </span>
        </li>
        <li>
          <span>
            http server is <a href="https://nginx.org/">nginx</a>
          </span>
        </li>
        <li>
          <span>
            all running in <a href="https://www.docker.com/">docker</a>{" "}
            container
          </span>
        </li>
      </ul>

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
