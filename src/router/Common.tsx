import { Suspense, lazy } from 'react';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Holidays = Loader(lazy(() => import('src/components/Holidays/Holidays')));


const commonRoutes = [


  {
    path: 'Holidays',
    element: <Holidays />
  },

];

export default commonRoutes;
