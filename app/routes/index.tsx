import type { LoaderArgs } from '@remix-run/node';
import { NotPadPage } from '~/features/notepad';
import { getUserCookie } from '~/services';

export const loader = async ({ request }: LoaderArgs) => {
  return await getUserCookie(request, { failRedirect: '/login' });
};

export default function Index() {
  return <NotPadPage />;
}
