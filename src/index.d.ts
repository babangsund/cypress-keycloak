/// <reference types="cypress" />

declare namespace Cypress {
  interface Logout {
    root: string;
    realm: string;
    redirect_uri?: string;
    path_prefix?: string;
    post_logout_redirect_uri?: string;
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
    kc_idp_hint?: string;
    code_challenge_method?: string;
  }
  interface LoginOTP extends Login {
    otp_secret: string;
    otp_credential_id?: string | null;
  }
  interface Register {
    root: string;
    realm: string;
    client_id: string;
    path_prefix?: string;
    redirect_uri: string;
    kc_idp_hint?: string;
    username?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    firstName?: string;
    lastName?: string;
    additionalAttributes?: { [key: string]: any };
  }
  interface Chainable {
    logout({
      root,
      realm,
      redirect_uri,
      post_logout_redirect_uri,
      id_token_hint,
    }: Logout): Chainable;
    login({
      root,
      realm,
      username,
      password,
      client_id,
      redirect_uri,
      kc_idp_hint,
    }: Login): Chainable;
    loginOTP({
      root,
      realm,
      username,
      password,
      client_id,
      redirect_uri,
      otp_secret,
      kc_idp_hint,
    }: LoginOTP): Chainable;
    register({
      root,
      realm,
      client_id,
      path_prefix,
      redirect_uri,
      kc_idp_hint,
      username,
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      additionalAttributes,
    }: Register): Chainable;
  }
}
