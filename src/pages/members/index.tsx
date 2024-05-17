import { Stack } from "@mui/material";
import { MembersList } from "../../components/members-list";

export const Members = () => {
  return (
    <Stack sx={{ padding: "1rem" }}>
      <MembersList />
    </Stack>
  );
};
