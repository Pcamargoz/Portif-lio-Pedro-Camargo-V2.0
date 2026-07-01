import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import ProjectPage from '../pages/ProjectPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  // Área dedicada indisponível por enquanto: qualquer acesso direto à rota é
  // redirecionado para a home. O portal na home exibe um aviso "Em breve".
  { path: '/sistemas-internos', element: <Navigate to="/#sistemas" replace /> },
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
