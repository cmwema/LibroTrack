import { Stack } from "@mui/material";
import { TransactionsList } from "../../components/transactions";

export const Transactions = () => {
  return (
    <Stack sx={{ padding: "1rem" }}>
      <TransactionsList />;
    </Stack>
  );
};
