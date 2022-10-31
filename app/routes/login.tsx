import type { ActionFunction } from '@remix-run/node';

import { makeDomainFunction } from 'domain-functions';
import { formAction } from 'remix-forms';

import { LoginPage } from '~/features/login/login.page';
import { loginSchema } from '~/features/login/schemas/login.schema';

const mutation = makeDomainFunction(loginSchema)(async (values) => values);

export const action: ActionFunction = async ({ request }) => {
  console.log(JSON.stringify(request, null, 2));

  return formAction({
    request,
    schema: loginSchema,
    mutation,
    successPath: '/login',
  });
};

export default function Login() {
  return <LoginPage />;
}
