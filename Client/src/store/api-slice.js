import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => `/u`,
    }),
    getAppointment: builder.query({
      query: (id) => `/appointments/${id}`,
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
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
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
} = apiSlice;
