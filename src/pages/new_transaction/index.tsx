import { StyledFormWrapper } from "../../components/styled-components";
import { TransactionForm } from "../../components/transactions/transaction-form";

export const NewTransaction = () => {
  return (
    <StyledFormWrapper>
      <TransactionForm edit={false} />
    </StyledFormWrapper>
  );
};
