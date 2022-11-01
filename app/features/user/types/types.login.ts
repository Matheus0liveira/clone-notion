export namespace User {
  export type Login = {
    email: string;
    password: string;
  };

  export type SessionUser = {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}
