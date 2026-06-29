import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import ProjectPage from '../pages/ProjectPage';
import SistemasInternosPage from '../pages/SistemasInternosPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  // Página dedicada e standalone (sem nav/footer) — aberta em nova aba.
  { path: '/sistemas-internos', element: <SistemasInternosPage /> },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projetos/:slug', element: <ProjectPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
