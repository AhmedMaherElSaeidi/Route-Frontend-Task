import Layout from "./Layout/Layout";
import { createHashRouter } from "react-router-dom";
import ChartPage from "./page/ChartPage/ChartPage";
import TransactionsPage from "./page/TransactionsPage/TransactionsPage";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <TransactionsPage /> },
      { path: "list-customers", element: <TransactionsPage /> },
      { path: "customer-chart", element: <ChartPage /> },
    ],
  },
]);

export default router;
