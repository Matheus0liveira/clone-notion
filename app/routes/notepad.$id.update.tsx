import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { NotepadService } from '~/features/notepad';
import { getUserCookie } from '~/services';

export const action: ActionFunction = async ({ request, params, context }) => {
  getUserCookie(request, { failRedirect: `/login` });

  const data = await request.formData();

  const title = data.get('title') as string;
  const content = data.get('content') as string;

  if (!params.id) return redirect(`/notepad/${params.id}`);

  const notepadService = new NotepadService();

  await notepadService.update({
    id: params.id,
    title: title || undefined,
    content: content || undefined,
  });

  return redirect(`/notepad/${params.id}`);
};

export const loader: LoaderFunction = ({ request }) =>
  getUserCookie(request, { failRedirect: `/login` });
