/// <reference types="cypress" />

declare namespace Cypress {
  interface Logout {
    root: string;
    realm: string;
    redirect_uri: string;
  }
  interface Login {
    root: string;
    realm: string;
    username: string;
    password: string;
    client_id: string;
    redirect_uri: string;
  }
  interface Chainable {
    /**
     * Command to sign out of Keycloak
     * @example cy.logout({
     *    root: "...",
     *    realm: "..",
     *    redirect_uri: "..."
     * });
     */
    logout({ root, realm, redirect_uri }: Logout): Chainable;
    /**
     * Command to sign into Keycloak
     * @example cy.logout({
     *    root: "...",
     *    realm: "..",
     *    username: "...",
     *    password: "...",
     *    client_id: "...",
     *    redirect_uri: "..."
     * });
     */
    login({
      root,
      realm,
      username,
      password,
      client_id,
      redirect_uri,
    }: Login): Chainable;
  }
}
