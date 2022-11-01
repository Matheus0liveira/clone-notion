import { createCookie, redirect } from '@remix-run/node';
import type { Login } from '~/features/login';

export const loginCookie = createCookie('login', {
  maxAge: 31_536_000, // one year
});

export type GetUserCookieArgs = {
  failRedirect: string;
  successRedirect: string;
};

export type GetUserCookie = (
  request: Request,
  args?: Partial<GetUserCookieArgs>
) => Promise<Login.SessionUser | null>;

export const getUserCookie: GetUserCookie = async (request, args) => {
  const cookieHeader = request.headers.get('Cookie');

  const user = await loginCookie.parse(cookieHeader);

  console.log(args?.failRedirect);

  if (args?.failRedirect && !user) return redirect(args.failRedirect);
  if (args?.successRedirect && user) return redirect(args.successRedirect);

  return user;
};
