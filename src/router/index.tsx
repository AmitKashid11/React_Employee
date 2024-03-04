import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import AuthenticationRoutes from 'src/router/Authentication';
import commonRoutes from './Common';
import landingRoutes from './Landing';
import studentRoutes from './Student';

const router: PartialRouteObject[] = [
  {
    path: '/',
    children: AuthenticationRoutes
  },

  // ExtendedSidebarLayout

  {
    path: 'extended-sidebar',
    element: <ExtendedSidebarLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/Authentication" replace />
      },
      {
        path: '/landing',
        children: landingRoutes
      },
      {
        path: '/Student',
        children: studentRoutes
      },
      {
        path: '/Authentication',
        children: AuthenticationRoutes
      },
      {
        path: '/Common',
        children: commonRoutes
      }
    ]
  }
];

export default router;
