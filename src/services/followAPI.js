import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "./authAPI";

export const followApi = createApi({
  reducerPath: "followApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["userProfile"],
  endpoints: (builder) => ({
    getUserProfileDetails: builder.query({
      providesTags: ["userProfile"],
      query: (username) => `/users/profile/u/${username}`,
      transformResponse: (response) => response.data,
    }),
    updateUserDetails: builder.mutation({
      query: (data) => {
        return {
          url: `/users/profile`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["userProfile"],
    }),
    updateAvatar: builder.mutation({
      query: (data) => {
        return {
          url: "users/avatar",
          method: "PATCH",
          body: data,
        };
      },
      transformResponse: (response) => response.data,
    }),
    handleFollow: builder.mutation({
      query: ({ followerId }) => ({
        url: `/follow/${followerId}`,
        method: "POST",
        body: {},
      }),
      async onQueryStarted(
        { username, searchQuery },
        { dispatch, queryFulfilled }
      ) {
        const patchUpdate = [
          dispatch(
            followApi.util.updateQueryData(
              "getUserProfileDetails",
              username,
              (draft) => {
                draft.isFollowing = !draft.isFollowing;
                if (draft.isFollowing) {
                  draft.followersCount += 1;
                } else {
                  draft.followersCount -= 1;
                }
              }
            )
          ),
          dispatch(
            authApi.util.updateQueryData(
              "userSuggetions",
              undefined,
              (draft) => {
                const user = draft.users.find(
                  (user) => user.username === username
                );
                if (user) {
                  user.isFollowing = !user.isFollowing;
                  if (user.isFollowing) {
                    user.followerCount += 1;
                  } else {
                    user.followerCount -= 1;
                  }
                }
              }
            )
          ),
          dispatch(
            authApi.util.updateQueryData("searchUser", searchQuery, (draft) => {
              const user = draft.users.find(
                (user) => user.username === username
              );
              if (user) {
                user.isFollowing = !user.isFollowing;
                if (user.isFollowing) {
                  user.followerCount += 1;
                } else {
                  user.followerCount -= 1;
                }
              }
            })
          ),
        ];
        try {
          await queryFulfilled;
        } catch (error) {
          patchUpdate.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUserProfileDetailsQuery,
  useHandleFollowMutation,
  useUpdateUserDetailsMutation,
  useUpdateAvatarMutation,
} = followApi;
