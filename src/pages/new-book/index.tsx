import { BookForm } from "../../components/books/book-form";
import { StyledFormWrapper } from "../../components/styled-components";

export const NewBook = () => {
  return (
    <StyledFormWrapper>
      <BookForm isEdit={false} />
    </StyledFormWrapper>
  );
};
