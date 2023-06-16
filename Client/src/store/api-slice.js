import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  tagTypes: ["Appointment", "Applicants"],
  endpoints: (builder) => ({
    getAppointment: builder.query({
      query: (id) => `/appointments/${id}`,
    }),

    getAppointments: builder.query({
      query: () => "/appointments",
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
  }),
});

export const {
  useGetAppointmentQuery,
  useGetAppointmentsQuery,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
} = apiSlice;