import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  BookDetails,
  Books,
  Dashboard,
  Login,
  MemberDetails,
  Members,
  PasswordReset,
  TransactionDetails,
  Transactions,
} from "./pages";
import { routesEnum } from "./utils/routesEnum";
import { DashboardLayout } from "./layout";

function App() {
  const router = createBrowserRouter([
    {
      path: routesEnum.LOGIN,
      element: <Login />,
    },
    {
      element: <DashboardLayout />,
      children: [
        {
          path: routesEnum.PASSWORD_REST,
          element: <PasswordReset />,
        },
        {
          path: routesEnum.DASHBOARD,
          element: <Dashboard />,
        },
        {
          path: routesEnum.BOOKS,
          element: <Books />,
        },
        {
          path: routesEnum.BOOK_DETAILS,
          element: <BookDetails />,
        },
        {
          path: routesEnum.MEMBERS,
          element: <Members />,
        },
        {
          path: routesEnum.MEMBER_DETAILS,
          element: <MemberDetails />,
        },
        {
          path: routesEnum.TRANSACTIONS,
          element: <Transactions />,
        },
        {
          path: routesEnum.TRANSACTION_DETAILS,
          element: <TransactionDetails />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
