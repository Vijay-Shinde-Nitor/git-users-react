import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ModelGitUser } from "../types/ModelGitUsers";

export const fetchGitUsers = createAsyncThunk(
    "users/fetchGitUsers",
    async () => {
        return fetch("https://api.github.com/users").then((res) => res.json());

    }
);
export const fetchGitUserDetails = createAsyncThunk(
    "users/fetchGitUserDetails",
    async (username: string) => {
        return fetch(`https://api.github.com/users/${username}`).then((res) => res.json());

    }
);
export const fetchGitFollowers = createAsyncThunk(
    "users/fetchGitFollowers",
    async (username: string) => {
        return fetch(`https://api.github.com/users/${username}/followers`).then((res) => res.json());

    }
);

export const fetchGitFollowings = createAsyncThunk(
    "users/fetchGitFollowings",
    async (username: string) => {
        return fetch(`https://api.github.com/users/${username}/following`).then((res) => res.json());

    }
);

const initState: GitUserState = {
    gitUserList: [],
    gitUserDetails: null,
    followers: [],
    following: [],
    loading: false,
    loadingDetails: false,
    error: ""
};

type GitUserState = {
    gitUserList: Array<ModelGitUser>,
    followers: Array<ModelGitUser>,
    following: Array<ModelGitUser>,
    gitUserDetails: ModelGitUser | null,
    loading: boolean,
    loadingDetails: boolean,
    error: string | any,
}

export const gitUserListSlice = createSlice({
    name: "users",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {

        //User List
        builder.addCase(fetchGitUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.gitUserList = action.payload;
        });
        builder.addCase(fetchGitUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = `${action.payload}`;
        });
        builder.addCase(fetchGitUsers.pending, (state, action) => {
            state.loading = true;
        });

        //User Details
        builder.addCase(fetchGitUserDetails.fulfilled, (state, action) => {
            state.loadingDetails = false;
            state.gitUserDetails = action.payload;
        });
        builder.addCase(fetchGitUserDetails.rejected, (state, action) => {
            state.loadingDetails = false;
            state.error = `${action.payload}`;
        });
        builder.addCase(fetchGitUserDetails.pending, (state, action) => {
            state.loadingDetails = true;
        });

        //User Followers
        builder.addCase(fetchGitFollowers.fulfilled, (state, action) => {
            state.loadingDetails = false;
            state.followers = action.payload;
        });
        builder.addCase(fetchGitFollowers.rejected, (state, action) => {
            state.loadingDetails = false;
            state.error = `${action.payload}`;
        });
        builder.addCase(fetchGitFollowers.pending, (state, action) => {
            state.loadingDetails = true;
        });

        //User Following
        builder.addCase(fetchGitFollowings.fulfilled, (state, action) => {
            state.loadingDetails = false;
            state.following = action.payload;
        });
        builder.addCase(fetchGitFollowings.rejected, (state, action) => {
            state.loadingDetails = false;
            state.error = `${action.payload}`;
        });
        builder.addCase(fetchGitFollowings.pending, (state, action) => {
            state.loadingDetails = true;
        });
    }
});

export default gitUserListSlice.reducer;
