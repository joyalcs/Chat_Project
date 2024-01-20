import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null
}

export const AuthSlice = createSlice({
    name: 'auth_token',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload.token
        },
        unSetUserToken: (state, action) => {
            state.token = action.payload.token
        }
    }
})
export const { setUserToken, unSetUserToken } = AuthSlice.actions

export default AuthSlice.reducer
