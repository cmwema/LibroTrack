import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Login = {
  username: string;
  password: string;
};

type Book = {
  title: string;
  author: string;
  isbn: string;
  published_date: string;
  stock: number;
  genre: string;
};
type EditBook = {
  id: string;
  book: Book;
};

export type Member = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  debt: number;
};

type NewMember = {
  first_name: string;
  last_name: string;
  email: string;
  debt: number;
};

export type EditMember = {
  id: string;
  member: Member;
};

const getToken = () => localStorage.getItem("token") || "";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://librotrackapi.onrender.com/api/",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }: Login) => {
        return {
          url: "login",
          method: "POST",
          body: {
            username,
            password,
          },
        };
      },
    }),
    booksList: builder.query({
      query: () => {
        return {
          url: "books",
          method: "GET",
        };
      },
    }),
    bookDetails: builder.query({
      query: ({ book_id }) => {
        return {
          url: `books/${book_id}`,
          method: "GET",
        };
      },
    }),
    newBook: builder.mutation({
      query: ({ title, author, published_date, isbn, stock, genre }: Book) => {
        return {
          url: "books/",
          body: { title, author, published_date, isbn, stock, genre },
          method: "POST",
        };
      },
    }),
    editBook: builder.mutation({
      query: ({ id, book }: EditBook) => {
        return {
          url: `books/${id}/`,
          method: "PUT",
          body: book,
        };
      },
    }),
    deleteBook: builder.mutation({
      query: ({ book_id }) => {
        return {
          url: `books/${book_id}/`,
          method: "DELETE",
        };
      },
    }),
    membersList: builder.query({
      query: () => {
        return {
          url: "members",
          method: "GET",
        };
      },
    }),
    memberDetails: builder.query({
      query: (id: string) => {
        return {
          url: `members/${id}`,
          method: "GET",
        };
      },
    }),
    newMember: builder.mutation({
      query: (body: NewMember) => {
        return {
          url: "members/",
          method: "POST",
          body: body,
        };
      },
    }),
    editMember: builder.mutation({
      query: ({ id, first_name, last_name, email, debt }: Member) => {
        return {
          url: `members/${id}/`,
          method: "PUT",
          body: { id, first_name, last_name, email, debt },
        };
      },
    }),
    deleteMember: builder.mutation({
      query: (id: string) => {
        return {
          url: `members/${id}/`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  // books
  useBooksListQuery,
  useBookDetailsQuery,
  useNewBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  // members
  useMembersListQuery,
  useNewMemberMutation,
  useEditMemberMutation,
  useMemberDetailsQuery,
  useDeleteMemberMutation,
} = apiSlice;
