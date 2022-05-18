import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "../components/UserCard";
import { GitUsersDispatch, RootState } from "../store/store";
import { fetchGitUsers } from "../store/userListSlice";

const UserListScreen = () => {
    const dispatch: GitUsersDispatch = useDispatch();
    const { gitUserList, loading } = useSelector((state: RootState) => ({ ...state.app }));
    useEffect(() => {
        dispatch(fetchGitUsers());
    }, []);

    if (loading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center"
            }}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (
        <FlatList
            data={gitUserList}
            keyExtractor={itm => `${itm.id}`}
            renderItem={(item) => (<UserCard clickable={true} item={item.item} />)} />
    );
};
export default UserListScreen;