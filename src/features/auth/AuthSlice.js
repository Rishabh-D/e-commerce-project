import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, updateUser } from "./AuthAPI";

const initialState = {
    loggedInUser: null,
    status: "idle",
    error: null,
};

// The function below is called a thunk and allows us to perform async logic.Thunks are
// typically used to make async requests.
export const createUserAsync = createAsyncThunk(
    "auth/createUser",
    async (userData) => {
        const response = await createUser(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const checkUserAsync = createAsyncThunk(
    "auth/checkUserAsync",
    async (loginInfo) => {
        const response = await checkUser(loginInfo);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    "auth/updateUser",
    async (update) => {
        const response = await updateUser(update);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = action.payload;
            })
            .addCase(checkUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = action.payload;
            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUser = action.payload;
            });
    },
});

export const { increment } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state.
export const selectLoggedInUser = (state) => state.auth.loggedInUser;

export default authSlice.reducer;
