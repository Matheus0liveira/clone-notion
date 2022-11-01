import { json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';

import { makeDomainFunction } from 'domain-functions';
import { performMutation } from 'remix-forms';

import { LoginPage, loginSchema } from '~/features/login';
import { LoginService } from '~/features/login/services/login.service.server';

const mutation = makeDomainFunction(loginSchema)(async (values) => {
  const loginService = new LoginService();
  const token = await loginService.login(values);

  return token;
});

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({
    request,
    schema: loginSchema,
    mutation,
  });

  if (!result.success) return result;

  console.log({ result });

  return json(result);
};

export default function Login() {
  return <LoginPage />;
}
