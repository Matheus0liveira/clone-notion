import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Notepad } from '~/features/notepad';
import { NotepadService, NotPadPage } from '~/features/notepad';
import { getUserCookie } from '~/services';

export const loader = async ({ request, params }: LoaderArgs) => {
  try {
    const payload = await getUserCookie(request, { failRedirect: '/login' });

    const notepadService = new NotepadService();

    if (!payload) return;

    if (!params.id) throw Error('Params id required');

    return notepadService.getById({
      id: params.id,
    });
  } catch (e) {
    return redirect('/notepad');
  }
};

export default function Index() {
  const { content, title } = useLoaderData<Notepad.NotPad>();

  return <NotPadPage title={title} initialValue={content} />;
}
