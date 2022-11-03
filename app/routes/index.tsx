import type { ActionFunction, LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { makeDomainFunction } from 'domain-functions';
import { performMutation } from 'remix-forms';
import { createUserSchema, UserService, CreatePage } from '~/features/user';
import { getUserCookie } from '~/services';

const mutation = makeDomainFunction(createUserSchema)(async (values) => {
  const loginService = new UserService();
  const user = await loginService.create(values);

  return user;
});

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({
    request,
    schema: createUserSchema,
    mutation,
  });

  if (!result.success) return result;

  return redirect('/login');
};

export const loader = async ({ request }: LoaderArgs) => {
  return await getUserCookie(request, { successRedirect: '/notepad' });
};

export default function Create() {
  return <CreatePage />;
}
