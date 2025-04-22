import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingState } from '@shared/ui';
import { Layout } from '../Layout';

// Ленивая загрузка компонентов страниц
const PostListPage = lazy(() =>
  import('@pages/ui/PostListPage/PostListPage').then((module) => ({ default: module.PostListPage }))
);
const PostDetailPage = lazy(() =>
  import('@pages/ui/PostDetailPage/PostDetailPage').then((module) => ({
    default: module.PostDetailPage,
  }))
);

// Обертка для ленивых компонентов
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingState />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(PostListPage),
      },
      {
        path: 'post/:id',
        element: withSuspense(PostDetailPage),
      },
    ],
  },
]);
