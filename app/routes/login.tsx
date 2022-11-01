import { json, LoaderArgs, redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';

import { makeDomainFunction } from 'domain-functions';
import { performMutation } from 'remix-forms';

import { LoginPage, loginSchema } from '~/features/login';
import { LoginService } from '~/features/login/services/login.service.server';
import { getUserCookie, loginCookie } from '~/services';

const mutation = makeDomainFunction(loginSchema)(async (values) => {
  const loginService = new LoginService();
  const payload = await loginService.login(values);

  return payload;
});

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({
    request,
    schema: loginSchema,
    mutation,
  });

  if (!result.success) return result;

  return redirect('/', {
    headers: {
      'Set-Cookie': await loginCookie.serialize(result.data),
    },
  });
};

export const loader = async ({ request }: LoaderArgs) => {
  return await getUserCookie(request, { successRedirect: '/' });
};

export default function Login() {
  return <LoginPage />;
}
