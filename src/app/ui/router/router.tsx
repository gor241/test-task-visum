import { createBrowserRouter } from 'react-router-dom';
import { PostListPage } from '@pages/ui/PostListPage';
import { PostDetailPage } from '@pages/ui/PostDetailPage';
import { Layout } from '../Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostListPage />,
      },
      {
        path: 'post/:id',
        element: <PostDetailPage />,
      },
    ],
  },
]); 