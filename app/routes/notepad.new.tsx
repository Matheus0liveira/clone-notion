import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { makeDomainFunction } from 'domain-functions';
import { performMutation } from 'remix-forms';
import { createNotPadSchema, NotepadService } from '~/features/notepad';
import { getUserCookie } from '~/services';

const mutation = (request: Request) =>
  makeDomainFunction(createNotPadSchema)(async ({ title }) => {
    const notepadService = new NotepadService();

    const payload = await getUserCookie(request);

    const notpad = await notepadService.create({
      title,
      userId: payload?.user.id!,
    });

    return notpad;
  });

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({
    request,
    schema: createNotPadSchema,
    mutation: mutation(request),
  });

  if (!result.success) return result;

  return redirect('/notepad');
};

export const loader: LoaderFunction = ({ request }) => {
  return getUserCookie(request, {
    failRedirect: '/login',
    successRedirect: '/notepad',
  });
};
