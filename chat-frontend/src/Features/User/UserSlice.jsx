import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    full_name: '',
}

export const UserSlice = createSlice({
    name: 'user_info',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.email = action.payload.email;
            state.full_name = action.payload.full_name;
        },
        unsetUserInfo: (state) => {
            state.email = "";
            state.full_name = "";
        },
    }
})
export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default UserSlice.reducer
