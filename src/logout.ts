Cypress.Commands.add(
  'logout',
  ({
    root,
    realm,
    redirect_uri,
    post_logout_redirect_uri,
    id_token_hint,
    client_id,
    path_prefix = 'auth',
  }) => {
    const qs: Record<string, string> = post_logout_redirect_uri
      ? { post_logout_redirect_uri }
      : { redirect_uri };
    if (post_logout_redirect_uri && id_token_hint) {
      qs.id_token_hint = id_token_hint;
    }
    if (post_logout_redirect_uri && client_id) {
      qs.client_id = client_id;
    }

    return cy
      .request({
        qs,
        url: `${root}${
          path_prefix ? `/${path_prefix}` : ''
        }/realms/${realm}/protocol/openid-connect/logout`,
      })
      .then((response) => {
        const html = document.createElement('html');
        html.innerHTML = response.body;
        const contentArea = html.getElementsByClassName('content-area')[0];

        if (
          contentArea === undefined ||
          contentArea.id !== 'kc-logout-confirm'
        ) {
          return;
        }
        const form = contentArea.getElementsByTagName('form')[0];
        const url = `${root}${form.getAttribute('action')}`;
        const inputs = form.getElementsByTagName('input');

        const body: Record<string, string> = {};
        for (const input of Array.prototype.slice.call(inputs)) {
          body[input.name] = input.value;
        }
        return cy.request({
          url,
          method: 'POST',
          body,
          form: true,
        });
      });
  }
);
