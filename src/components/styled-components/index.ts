import { Stack, colors } from "@mui/material";
import styled from "@emotion/styled";

export const StyledFormWrapper = styled(Stack)({
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledForm = styled(Stack)({
  width: "60%",
  border: "2px solid",
  borderColor: colors.grey[200],
  padding: "2rem",
  borderRadius: "1rem",
  backgroundColor: "white",
});
