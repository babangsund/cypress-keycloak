import createUUID from "./createUUID";

Cypress.Commands.add(
  "register",
  ({
    root,
    realm,
    client_id,
    path_prefix = "auth",
    redirect_uri,
    kc_idp_hint,
    username,
    email,
    password,
    passwordConfirm,
    firstName,
    lastName,
    additionalAttributes,
  }) =>
    cy
      .request({
        url: `${root}${
          path_prefix ? `/${path_prefix}` : ""
        }/realms/${realm}/protocol/openid-connect/registrations`,
        qs: {
          client_id,
          redirect_uri,
          kc_idp_hint,
          scope: "openid",
          state: createUUID(),
          nonce: createUUID(),
          response_type: "code",
          response_mode: "fragment",
        },
      })
      .then((response) => {
        const html = document.createElement("html");
        html.innerHTML = response.body;

        const form = html.getElementsByTagName("form");
        const isAuthorized = !form.length;

        let body = {
          username,
          password,
          passwordConfirm,
          email,
          firstName,
          lastName,
        };

        for (const [key, value] of Object.entries(additionalAttributes)) {
          body = {
            ...body,
            [key]: value,
          };
        }

        if (!isAuthorized)
          return cy.request({
            form: true,
            method: "POST",
            url: form[0].action,
            followRedirect: false,
            body,
          });
      })
);
