import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Login = {
  username: string;
  password: string;
};
export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://librotrackapi.onrender.com/api/",
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
  }),
});

export const { useLoginMutation } = apiSlice;
