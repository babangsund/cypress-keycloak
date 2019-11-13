function createUUID(): string {
  const s: string[] = [];
  const hexDigits = '0123456789abcdef';

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }

  s[14] = '4';
  s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';

  return s.join('');
}

Cypress.Commands.add(
  'login',
  ({ root, realm, username, password, client_id, redirect_uri }) => {
    return cy
      .request({
        url: `${root}/auth/realms/${realm}/protocol/openid-connect/auth`,
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

        if (!isAuthorized) {
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
        }
      });
  }
);
