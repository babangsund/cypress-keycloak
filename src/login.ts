import createUUID from './createUUID';
function generateCodeVerifier(len: number): string {
  return generateRandomString(len, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
}

import { sha256 as jssha256 } from 'js-sha256';
import * as base64js from 'base64-js';

function generateRandomData(len: number): Uint8Array | number[] {
  // use web crypto APIs if possible
  let array = null;
  const crypto = window.crypto;
  if (crypto && crypto.getRandomValues && window.Uint8Array) {
    array = new Uint8Array(len);
    crypto.getRandomValues(array);
    return array;
  }

  // fallback to Math random
  array = new Array(len);
  for (let j = 0; j < array.length; j++) {
    array[j] = Math.floor(256 * Math.random());
  }
  return array;
}

function generateRandomString(len: number, alphabet: string): string {
  const randomData = generateRandomData(len);
  const chars = new Array(len);
  for (let i = 0; i < len; i++) {
    chars[i] = alphabet.charCodeAt(randomData[i] % alphabet.length);
  }
  return String.fromCharCode.apply(null, chars);
}

Cypress.Commands.add(
  'login',
  function ({
    root,
    realm,
    username,
    password,
    client_id,
    redirect_uri,
    code_challenge_method,
    path_prefix = 'auth',
  }) {
    const pkce: Record<string, string> = {};
    if (code_challenge_method && code_challenge_method === 'S256') {
      // only support S256 not plain, keycloak.js does not support anything else
      pkce['code_challenge_method'] = code_challenge_method
      // hash codeVerifier, then encode as url-safe base64 without padding
      const code_verifier = generateCodeVerifier(96);
      const hashBytes = new Uint8Array(jssha256.arrayBuffer(code_verifier));
      const encodedHash = base64js.fromByteArray(hashBytes)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
      pkce['code_challenge'] = encodedHash;
      console.log(pkce);
    }
    return cy
      .request({
        url: `${root}${path_prefix ? `/${path_prefix}` : ''
          }/realms/${realm}/protocol/openid-connect/auth`,
        qs: {
          client_id,
          redirect_uri,
          scope: 'openid',
          state: createUUID(),
          nonce: createUUID(),
          response_type: 'code',
          response_mode: 'fragment',
          ...pkce,
        },
      }).then((response) => {
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
              username,
              password,
            },
          });
      })
  }
);
