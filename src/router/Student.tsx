import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SuspenseLoader from 'src/layouts/components/SuspenseLoader/index';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards

const Notification = Loader(
  lazy(() => import('src/components/Notification/Notification'))
);
const studentRoutes = [
  {
    path: '/',
    element: <Navigate to="holidays" replace />
  },
];

export default studentRoutes;
