import { Button } from "@mui/material";
import { MembersList } from "../../components/members-list";
import { Layout } from "../../layout";
import { useNavigate } from "react-router-dom";
import { routesEnum } from "../../utils/routesEnum";

const ButtonComponent = () => {
  const navigate = useNavigate();
  return (
    <Button variant="outlined" onClick={() => navigate(routesEnum.NEW_MEMBER)}>
      New Member
    </Button>
  );
};

export const Members = () => {
  return (
    <Layout title="All Members" ButtonComponent={ButtonComponent}>
      <MembersList />
    </Layout>
  );
};
