import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  BookDetails,
  Books,
  Login,
  MemberDetails,
  Members,
  TransactionDetails,
  Transactions,
} from "./pages";
import { routesEnum } from "./utils/routesEnum";
import { DashboardLayout } from "./layout";
import { NewMember } from "./pages/new-member";
import { NewBook } from "./pages/new-book";
import { NewTransaction } from "./pages/new_transaction";
import ProtectedRoute from "./components/auth/protected-route";
import { BookEdit } from "./pages/book-edit";

function App() {
  const router = createBrowserRouter([
    {
      path: routesEnum.LOGIN,
      element: <Login />,
    },
    {
      element: <ProtectedRoute element={<DashboardLayout />} />,
      children: [
        {
          path: routesEnum.BOOKS,
          element: <Books />,
        },
        {
          path: routesEnum.BOOK_DETAILS,
          element: <BookDetails />,
        },
        {
          path: routesEnum.NEW_BOOK,
          element: <NewBook />,
        },
        {
          path: routesEnum.EDIT_BOOK,
          element: <BookEdit />,
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
          path: routesEnum.NEW_MEMBER,
          element: <NewMember />,
        },
        {
          path: routesEnum.TRANSACTIONS,
          element: <Transactions />,
        },
        {
          path: routesEnum.TRANSACTION_DETAILS,
          element: <TransactionDetails />,
        },
        {
          path: routesEnum.NEW_TRANSACTION,
          element: <NewTransaction />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
