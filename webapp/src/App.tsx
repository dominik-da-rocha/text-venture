import React, { ChangeEvent, useState } from "react";
import "./App.css";
import {
  Alert,
  Button,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  ThemeProvider,
  ToggleThemeButton,
} from "./bootstrap";
import { NavbarNavItem } from "./bootstrap/Navbar";
import { ButtonLogin, Secured } from "./keycloak";

function App() {
  const navVariant = "primary";
  const navExpand = "xs";
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <Secured>
      <ThemeProvider className="app">
        <Navbar variant="primary" expand={navExpand}>
          <NavbarBrand>
            <Button variant={navVariant}>TEST</Button>
          </NavbarBrand>
          <NavbarToggler variant={navVariant} toggle={toggleNav} />
          <NavbarNav
            id="navbarSupportedContent"
            show={showNav}
            expand={navExpand}
          >
            <NavbarNavItem>
              <ToggleThemeButton variant={navVariant} />
            </NavbarNavItem>
            <NavbarNavItem>
              <ButtonLogin />
            </NavbarNavItem>
          </NavbarNav>
        </Navbar>

        <TestControl></TestControl>
      </ThemeProvider>
    </Secured>
  );
}

function TestControl() {
  const [hello, setHello] = useState("");
  const [call, setCall] = useState("say hello");
  const [echo, setEcho] = useState("");

  return (
    <div>
      <div className="hello">
        <Button
          variant="primary"
          className="m-2"
          onClick={async () => {
            setHello("...");
            const message = await fetch("/api/v1/test/greeting", {})
              .then((response: Response) => {
                return response.text();
              })
              .catch((response: Response) => {
                return response.statusText;
              });
            setHello(message);
          }}
        >
          hello
        </Button>
        <Alert variant="primary" className="p-2 m-2">
          {hello}
        </Alert>
      </div>

      <div className="echo">
        <input
          value={call}
          placeholder="echo..."
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCall(event.target.value);
          }}
        />
        <Button
          variant="primary"
          className="m-2"
          onClick={async () => {
            setEcho("...");
            const message = await fetch("/api/v1/test/echo", {
              method: "POST",
              body: call,
            })
              .then((response: Response) => {
                return response.text();
              })
              .catch((response: Response) => {
                return response.statusText;
              });
            setEcho(message);
          }}
        >
          echo
        </Button>
        <Alert variant="primary" className="p-2 m-2">
          {echo}
        </Alert>
      </div>
    </div>
  );
}

export default App;
