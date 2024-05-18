import { StyledFormWrapper } from "../../components/styled-components";
import { MemberForm } from "../../components/members/member-form";

export const NewMember = () => {
  return (
    <StyledFormWrapper>
      <MemberForm edit={false} />
    </StyledFormWrapper>
  );
};
