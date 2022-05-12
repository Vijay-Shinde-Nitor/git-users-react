import { configureStore } from "@reduxjs/toolkit";
import GitUserListSlice from "./userListSlice";

const store = configureStore({
    reducer: { app: GitUserListSlice }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type GitUsersDispatch = typeof store.dispatch;