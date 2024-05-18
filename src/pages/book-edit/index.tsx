import { useLocation } from "react-router-dom";
import { BookForm } from "../../components/books/book-form";
import { StyledFormWrapper } from "../../components/styled-components";
import { useBookDetailsQuery } from "../../store/api-slice";

export const BookEdit = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const { data, isSuccess } = useBookDetailsQuery({ book_id: id });

  if (isSuccess) {
    console.log(data);
    return (
      <StyledFormWrapper>
        <BookForm isEdit={true} book={data} />
      </StyledFormWrapper>
    );
  }
};
