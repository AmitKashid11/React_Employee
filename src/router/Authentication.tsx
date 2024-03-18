import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import DropDown from 'src/components/DropDown/DropDown';
import AddEmployee from 'src/components/Employee/AddEmployee';
import AddTask from 'src/components/Task/AddTask';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards
//const SchoolList = Loader(lazy(() => import('src/RITeSchool/authentication/schoolList/schoolList')));
const ForgotPassword = Loader(
  lazy(() => import('src/components/Authentication/Login/ForgotPassword'))
);
const TermAndCondition = Loader(
  lazy(
    () =>
      import('src/components/Authentication/TermAndConditions/TermAndCondition')
  )
);
const Home = Loader(
  lazy(() => import('src/components/Home/Home'))
);

const EmployeeList = Loader(lazy(() =>
  import('src/components/Employee/EmployeeList')
));  // to authenticate List

const TaskList = Loader(lazy(() =>
  import('src/components/Task/TaskList')
));

const AuthenticationRoute = [
  {
    path: '/',
    element: <Navigate to="Home" replace />
  },
  {
    path: 'Home',
    element: <Home />
  },
  {
    path: 'AddEmployee',
    element: <AddEmployee />
  },
  {
    path: 'AddEmployee/:Id',
    element: <AddEmployee />
  },
  {
    path: 'EmployeeList',
    element: <EmployeeList />
  },
  {
    path: 'AddTask',
    element: <AddTask />
  },
  {
    path: 'TaskList',
    element: <TaskList />
  },
  {
    path: 'AddTask/:Id',
    element: <AddTask />
  },
  {
    path: 'DropDown',
    element: <DropDown />
  },
  {
    path: 'forgotPassword',
    element: <ForgotPassword />
  },

  {
    path: 'TermAndCondition',
    element: <TermAndCondition />
  }
];

export default AuthenticationRoute;
