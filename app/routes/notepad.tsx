import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Notepad } from '~/features/notepad';
import { NotepadService, ListNotPadsPage } from '~/features/notepad';
import { getUserCookie } from '~/services';

export const loader = async ({ request }: LoaderArgs) => {
  const payload = await getUserCookie(request, { failRedirect: '/login' });

  const notepadService = new NotepadService();

  if (!payload) return;

  const notepads = await notepadService.getMany({ userId: payload.user.id });

  return { data: notepads };
};

export default function Index() {
  const { data } = useLoaderData<Notepad.NotPads>();
  return <ListNotPadsPage data={data as unknown as Notepad.NotPads['data']} />;
}
