Cypress.Commands.add('logout', ({ root, realm, redirect_uri, path_prefix = 'auth' }) =>
  cy.request({
    qs: { redirect_uri },
    url: `${root}${ path_prefix ? `/${path_prefix}` : ''}/realms/${realm}/protocol/openid-connect/logout`,
  })
);
