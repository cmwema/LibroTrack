import { useLocation } from "react-router-dom";
import { useTransactionDetailsQuery } from "../../store/api-slice";
import { Layout } from "../../layout";
import { TransactionForm } from "../../components/transactions/transaction-form";
import { Stack } from "@mui/material";

export const EditTransaction = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop() || "";
  const { data, isSuccess, isLoading } = useTransactionDetailsQuery(id);
  if (isLoading) {
    <Layout title="Transaction Details">
      <Stack sx={{ padding: "4rem" }}>Loading...</Stack>
    </Layout>;
  }
  if (isSuccess) {
    return (
      <Layout title="Edit Transaction">
        <Stack sx={{ padding: "2rem" }} alignItems={"center"}>
          <TransactionForm edit={true} transaction={data} />
        </Stack>
      </Layout>
    );
  }
};
