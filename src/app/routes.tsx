import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './Layout'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/app/Layout.tsx',
    children: [
      { index: true, lazy: () => import('./Home'), entry: 'src/app/Home.tsx' },
      // Página de sistema: solo en desarrollo, no se prerenderiza ni se publica.
      ...(import.meta.env.DEV ? [{ path: '_sistema', lazy: () => import('./Sistema') }] : []),
      { path: 'privacidad', lazy: () => import('./Privacidad'), entry: 'src/app/Privacidad.tsx' },
      { path: 'cookies', lazy: () => import('./Cookies'), entry: 'src/app/Cookies.tsx' },
      // /404 se prerenderiza como 404.html para el hosting; '*' cubre la navegación en el cliente.
      { path: '404', lazy: () => import('./NotFound'), entry: 'src/app/NotFound.tsx' },
      { path: '*', lazy: () => import('./NotFound'), entry: 'src/app/NotFound.tsx' },
    ],
  },
]
