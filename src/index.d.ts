/// <reference types="cypress" />

declare namespace Cypress {
  interface Logout {
    root: string;
    realm: string;
    redirect_uri?: string;
    path_prefix?: string;
    post_logout_redirect_uri?: string,
    id_token_hint?: string;
  }
  interface Login {
    root: string;
    realm: string;
    username: string;
    password: string;
    client_id: string;
    path_prefix?: string;
    redirect_uri: string;
  }
  interface LoginOTP extends Login {
    otp_secret: string;
    otp_credential_id?: string | null;
  }
  interface Chainable {
    logout({ root, realm, redirect_uri, post_logout_redirect_uri, id_token_hint }: Logout): Chainable;
    login({
      root,
      realm,
      username,
      password,
      client_id,
      redirect_uri,
    }: Login): Chainable;
    loginOTP({
      root,
      realm,
      username,
      password,
      client_id,
      redirect_uri,
      otp_secret,
    }: LoginOTP): Chainable;
  }
}
