# This repository has been archived!

Just merged all open PRs and published v2.0.2, which will we be the last version.

Thank you to all that contributed. Unfortunately, I no longer have the time to maintain it.

Please fork it for any further updates!

# cypress-keycloak

Cypress commands for Keycloak

---

### Installation

Using [npm](https://www.npmjs.com/):

    $ npm install cypress-keycloak -D

Using [yarn](https://yarnpkg.com/):

    $ yarn add cypress-keycloak -D

Then with a module bundler like [webpack](https://webpack.github.io/), add the following line to `cypress/support/commands.js | .ts`:

```js
// Using ES6
import 'cypress-keycloak';
// using CommonJS
require('cypress-keycloak');
```

---

### Usage

Four `cy` commands have been added:

- **`cy.logout({ ... })`**:
  - `root`: string
  - `realm`: string
  - `redirect_uri`?: string, for Keycloak >= 18.0.0 use `post_logout_redirect_uri` instead
  - `post_logout_redirect_uri`?: string, for Keycloak < 18.0.0 use `post_logout_redirect_uri` instead
  - `id_token_hint`?: string
  - `path_prefix`?: string = "auth"
- **`cy.login({ ... })`**:
  - `root`: string
  - `realm`: string
  - `username`: string
  - `password`: string
  - `client_id`: string
  - `redirect_uri`: string
  - `path_prefix`?: string = "auth"
  - `code_challenge_method`: string, to use PKCE set this to `S256`
- **`cy.loginOTP({ ... })`**:
  - `root`: string
  - `realm`: string
  - `username`: string
  - `password`: string
  - `client_id`: string
  - `redirect_uri`: string
  - `path_prefix`?: string = "auth"
  - `otp_secret`: string
  - `otp_credential_id`?: string | null = null
- **`cy.register({ ... })`**:
  - `root`: string
  - `realm`: string
  - `client_id`: string
  - `path_prefix`?: string = "auth"
  - `redirect_uri`: string
  - `kc_idp_hint`?: string
  - `username`?: string
  - `email`?: string
  - `password`?: string
  - `passwordConfirm`?: string
  - `firstName`?: string
  - `lastName`?: string
  - `additionalAttributes`?: { [key: string]: any }

### Installation:

**If you don't want to use login with OTPs you can skip this section.**

For generation of OTPs you need to create a new task named `generateOTP` in your `cypress/plugins/index.js | .ts`, like discribed in README of [Cypress OTP](https://www.npmjs.com/package/cypress-otp).

To get your OTP secret you need to use e.g. an App for configurating OTP which can display the secret like FreeOTP+. The OTP credential ID can be found in Keycloaks Account Management Console, but only if there are at least two Authenticators configurated. It is only needed for login if you have more than one Authenticator.

Another way is to get these two values is by using the [endpoint `GET /{realmName}/users/{userId}/credentials`](https://www.keycloak.org/docs-api/9.0/rest-api/index.html#_users_resource).

**It is highly recommended to save your username, password, otp_secret and otp_credential_id in `.env.*.local` or another file within your gitignore.**

### Example:

```javascript
describe('thing', () => {
  beforeEach(() => {
    cy.login({
      root: 'https://keycloak.babangsund.com',
      realm: 'stage',
      username: 'babangsund',
      password: 'bacon',
      client_id: 'frontend',
      redirect_uri: 'https://babangsund.com/',
    });

    // or login with OTP
    cy.loginOTP({
      root: 'https://keycloak.babangsund.com',
      realm: 'stage',
      username: 'babangsund',
      password: 'bacon',
      client_id: 'frontend',
      redirect_uri: 'https://babangsund.com/',
      otp_secret: 'OZLDC2HZKM3QUC...', // e.g. 32 chars
      otp_credential_id: '5e231f20-8ca7-35e1-20a694b60181ca9', // e.g. 36 chars
    });
  });

  afterEach(() => {
    cy.logout({
      root: 'https://keycloak.babangsund.com',
      realm: 'stage',
      // using Keycloak < 18.0.0:
      // redirect_uri: 'https://babangsund.com/',
      // using Keycloak >= 18.0.0:
      post_logout_redirect_uri: 'https://babangsund.com/',
    });
  });
});
```

In case you want to declare these commands only one time with the values it is possible to overwrite them in your `cypress/support/commands.js | .ts` like this:

```javascript
Cypress.Commands.overwrite('login', (originalFn) => {
  originalFn({
    root: 'https://keycloak.babangsund.com',
    realm: 'stage',
    username: 'babangsund',
    password: 'bacon',
    client_id: 'frontend',
    redirect_uri: 'https://babangsund.com/',
  })
})

...
```

And use them like this:

```javascript
describe('thing', () => {
  beforeEach(() => {
    cy.login();

    // or login with OTP
    cy.loginOTP();
  });

  afterEach(() => {
    cy.logout();
  });
});
```

### Credits

#### Owner

cypress-keycloak is built and maintained by **babangsund**.
[@blog](https://babangsund.com/).
[@github](https://github.com/babangsund).
[@twitter](https://twitter.com/babangsund).

#### Contributors
- [m4xd](https://github.com/m4x3d)
- Pascal Küsgen
- Martin Guethle
- [Med Amine Amara](https://github.com/medamineamara)
- Oskar Thornblad
- Kai
- Raymon Ohmori
- Robert Wysocki
- Hussein Al Abry
