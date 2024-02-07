import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  id: string;
  title: string;
  author: string;
}

/*

GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode

posts?title=test&author=test

*/

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
    searchTitle: builder.query({
      query: ({ title }: { title: string }) => ({
        method: "GET",
        url: `posts?title=${title}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
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
  useSearchTitleQuery,
  useLazySearchTitleQuery,
} = dataApi;
