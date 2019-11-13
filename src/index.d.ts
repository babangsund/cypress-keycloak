/// <reference types="cypress" />

declare namespace Cypress {
  interface Logout {
    root: string;
    realm: string;
    redirect_uri: string;
  }
  interface Chainable {
    /**
     * Command to sign out of keycloak
     * @example cy.logout({ realm: "..", redirect_uri: "...", root: "..." })
     */
    logout({ root, realm, redirect_uri }: Logout): Chainable;
  }
}
