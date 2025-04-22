import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, User } from '../model/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
    }),
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useGetUserQuery } = api; 