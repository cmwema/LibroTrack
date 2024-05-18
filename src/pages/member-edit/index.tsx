import { useLocation } from "react-router-dom";
import { useMemberDetailsQuery } from "../../store/api-slice";
import { Layout } from "../../layout";
import { StyledFormWrapper } from "../../components/styled-components";
import { MemberForm } from "../../components/members/member-form";

export const MemberEdit = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop() || "";
  const { data, isSuccess, isLoading } = useMemberDetailsQuery(id);
  if (isLoading) {
    return (
      <Layout title="Member Edit">
        <StyledFormWrapper padding={"4rem"}>Loading...</StyledFormWrapper>
      </Layout>
    );
  }
  if (isSuccess) {
    return (
      <Layout title="Member Edit">
        <StyledFormWrapper padding={"4rem"}>
          <MemberForm member={data} edit={true} />
        </StyledFormWrapper>
      </Layout>
    );
  }
};
