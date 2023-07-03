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
