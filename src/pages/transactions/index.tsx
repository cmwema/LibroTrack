import { Button } from "@mui/material";
import { TransactionsList } from "../../components/transactions";
import { Layout } from "../../layout";
import { useNavigate } from "react-router-dom";
import { routesEnum } from "../../utils/routesEnum";

const ButtonComponent = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      onClick={() => navigate(routesEnum.NEW_TRANSACTION)}
    >
      New Transaction
    </Button>
  );
};

export const Transactions = () => {
  return (
    <Layout title="All Transactions" ButtonComponent={ButtonComponent}>
      <TransactionsList />
    </Layout>
  );
};
