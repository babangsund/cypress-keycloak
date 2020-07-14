# cypress-keycloak

Cypress commands for Keycloak

---

### Installation

Using [npm](https://www.npmjs.com/):

    $ npm install cypress-keycloak -D

Using [yarn](https://yarnpkg.com/):

    $ yarn add cypress-keycloak -D

Then with a module bundler like [webpack](https://webpack.github.io/), add the following line to `cypress/support/index.js`:

```js
// Using ES6
import 'cypress-keycloak';
// using CommonJS
require('cypress-keycloak');
```

---

### Usage

Two `cy` commands have been added:

- **`cy.logout({ ... })`**:
  - `root`: string
  - `realm`: string
  - `redirect_uri`: string
- **`cy.login({ ... })`**:
  - `root`: string
  - `realm`: string
  - `username`: string
  - `password`: string
  - `client_id`: string
  - `redirect_uri`: string
  - `path_prefix`?: string = "auth"

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
  });
  afterEach(() => {
    cy.logout({
      root: 'https://keycloak.babangsund.com',
      realm: 'stage',
      redirect_uri: 'https://babangsund.com/',
    });
  });
});
```

### Credits

cypress-keycloak is built and maintained by **babangsund**.  
[@blog](https://babangsund.com/).  
[@github](https://github.com/babangsund).  
[@twitter](https://twitter.com/babangsund).
