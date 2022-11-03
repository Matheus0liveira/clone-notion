import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { loginCookie } from '~/services';

export const loader = async ({ request }: LoaderArgs) => {
  return redirect('/notepad', {
    headers: {
      'Set-Cookie': await loginCookie.serialize(''),
    },
  });
};
