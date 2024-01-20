import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/'}),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query:(User) =>{
                return {
                    url: 'users/register/',
                    method: 'POST',
                    body: User,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),
        otpVerify: builder.mutation({
            query:(User) => {
                return {
                    url: 'users/verify-otp/',
                    method: 'POST',
                    body: User,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),
        loginUser: builder.mutation({
            query:(User) => {
                return {
                    url: 'users/login/',
                    method: 'POST',
                    body: User,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),
        sendEmailResetPassword: builder.mutation({
            query: (user) => {
                return{
                    url: 'users/send_reset_password_email/',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        resetPasswordByEmail: builder.mutation({
            query: ({actualData,uid,token}) => {
                return {
                    url: `users/reset_password/${uid}/${token}/`,
                    method: 'POST',
                    body: actualData,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useOtpVerifyMutation,
    useResetPasswordByEmailMutation,
    useSendEmailResetPasswordMutation,
} = UserApi
