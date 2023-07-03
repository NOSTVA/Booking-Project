import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => `/u`,
    }),
    getAppointment: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: ["Appointment"],
    }),
    getAppointments: builder.query({
      query: ({ owner, status, visa }) =>
        `/appointments?owner=${owner}&status=${status}&visa=${visa}`,
      providesTags: ["Appointment"],
    }),

    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/appointments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateApplicant: builder.mutation({
      query: ({ id, data }) => ({
        url: `/applicants/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Appointment"],
    }),
    deleteApplicant: builder.mutation({
      query: (id) => ({
        url: `/applicants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment"],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointments/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointment"],
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `/logout`,
        method: "GET",
        body: data,
      }),
    }),

    getMyAppointments: builder.query({
      query: ({ owner, status, visa }) =>
        `/u/appointments?owner=${owner}&status=${status}&visa=${visa}`,
      providesTags: ["Appointment"],
    }),
    getAllUsers: builder.query({
      query: () => `/u/users`,
      providesTags: ["Appointment"],
    }),

    deassignUser: builder.mutation({
      query: ({ userId, appointmentId }) => ({
        url: `/u/users/assign/${userId}/${appointmentId}`,
        method: "DELETE",
        invalidatesTags: ["Appointment"],
      }),
    }),

    assignUser: builder.mutation({
      query: ({ userId, appointmentId }) => ({
        url: `/u/users/assign/${userId}/${appointmentId}`,
        method: "POST",
        invalidatesTags: ["Appointment"],
      }),
    }),
  }),
});

export const {
  useGetAppointmentQuery,
  useGetAppointmentsQuery,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
  useCreateAppointmentMutation,
  useGetUserDataQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMyAppointmentsQuery,
  useGetAllUsersQuery,
  useDeassignUserMutation,
  useAssignUserMutation,
} = apiSlice;
