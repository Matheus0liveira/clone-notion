export namespace Login {
  export type User = {
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
