import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  id: string;
  title: string;
  author: string;
}

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["Post"],
    }),
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPostById: builder.query({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `posts/${id}`,
      }),
    }),
    addNewPost: builder.mutation({
      query: (payload: Post) => ({
        url: "/posts",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query(payload: { id: string | number; data: Post }) {
        return {
          url: `posts/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id: string | number) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useGetUserQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useUpdatePostMutation,
} = dataApi;
