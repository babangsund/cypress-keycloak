Cypress.Commands.add(
  'logout',
  ({ root = '', realm = '', redirect_uri = '' }) => {
    return cy.request({
      qs: { redirect_uri },
      url: `${root}/auth/realms/${realm}/protocol/openid-connect/logout`,
    });
  }
);
