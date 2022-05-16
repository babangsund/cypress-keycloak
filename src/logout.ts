Cypress.Commands.add('logout', ({ root, realm, redirect_uri, post_logout_redirect_uri, id_token_hint, path_prefix = 'auth' }) => {
  const qs = post_logout_redirect_uri ? { post_logout_redirect_uri, id_token_hint } : { redirect_uri }
  if (post_logout_redirect_uri && id_token_hint) {
    qs.id_token_hint = id_token_hint
  }

  return cy.request({
    qs,
    url: `${root}${ path_prefix ? `/${path_prefix}` : ''}/realms/${realm}/protocol/openid-connect/logout`,
  })
});
