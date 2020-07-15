import createUUID from './createUUID';

Cypress.Commands.add(
  'login',
  ({ root, realm, username, password, client_id, redirect_uri, path_prefix }) =>
    cy
      .request({
        url: `${root}/${path_prefix || 'auth' }/realms/${realm}/protocol/openid-connect/auth`,
        qs: {
          client_id,
          redirect_uri,
          scope: 'openid',
          state: createUUID(),
          nonce: createUUID(),
          response_type: 'code',
          response_mode: 'fragment',
        },
      })
      .then(response => {
        const html = document.createElement('html');
        html.innerHTML = response.body;

        const form = html.getElementsByTagName('form');
        const isAuthorized = !form.length;

        if (!isAuthorized)
          return cy.request({
            form: true,
            method: 'POST',
            url: form[0].action,
            followRedirect: false,
            body: {
              username: username,
              password: password,
            },
          });
      })
);
