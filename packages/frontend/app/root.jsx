import {
  Links,
  useLoaderData,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'remix';

import styles from './styles/root.css';

import axios from 'axios';

export function meta() {
  return { title: 'Tic Tac Toe' };
}

export default function App() {
  const data = useLoaderData();

  axios.defaults.baseURL = data;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export async function loader() {
  return process.env.API_URL;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
