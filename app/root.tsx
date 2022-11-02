import type { MetaFunction, LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import styles from './tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang='en' className='dark h-screen'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='dark:bg-zinc-900 dark:text-white h-screen overflow-x-hidden'>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
