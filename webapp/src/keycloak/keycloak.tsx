import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import Keycloak, {
  KeycloakInitOptions,
  KeycloakLoginOptions,
} from "keycloak-js";
import React from "react";
import { Icon } from "../bootstrap";

const keycloak = Keycloak({
  clientId: "textventure",
  realm: "textventure",
  url: "http://localhost:3001/auth",
});

const keycloakInitOptions: KeycloakInitOptions = {
  flow: "implicit",
  onLoad: "login-required",
};

const keycloakLoginOptions: KeycloakLoginOptions = {
  redirectUri: "http://localhost:3000",
  scope:
    "roles microprofile-jwt address email offline_access phone profile web-origins",
};

function ButtonLogin() {
  const { keycloak } = useKeycloak();
  if (keycloak.authenticated) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          keycloak.logout();
        }}
      >
        <Icon icon="logout"></Icon>
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          keycloak.login(keycloakLoginOptions);
        }}
      >
        Login
      </button>
    );
  }
}

interface Children {
  children?: React.ReactNode;
}

function Secured(props: Children) {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakInitOptions}
      autoRefreshToken={false}
    >
      <Content>{props.children}</Content>
    </ReactKeycloakProvider>
  );
}

function Content(props: Children) {
  const { initialized } = useKeycloak();
  if (initialized) {
    return <div>{props.children}</div>;
  } else {
    return <div>connecting to auth server...</div>;
  }
}

export { ButtonLogin, Secured };
