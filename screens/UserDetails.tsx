import { RouteProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TextTile } from "../components/TextTile";
import { RootStackParamList, UserCard } from "../components/UserCard";
import { GitUsersDispatch, RootState } from "../store/store";
import { fetchGitFollowers, fetchGitFollowings, fetchGitUserDetails } from "../store/userListSlice";
import { ModelGitUser } from "../types/ModelGitUsers";

export const UserDetailsScreen = ({ route }: { route: RouteProp<RootStackParamList, 'UserDetails'> }) => {
    const { gitUserDetails, loadingDetails, error, followers, following } = useSelector((state: RootState) => ({ ...state.app }));
    const { username } = route.params;
    const dispath: GitUsersDispatch = useDispatch();

    useEffect(() => {
        dispath(fetchGitUserDetails(username)).then(() => {
            dispath(fetchGitFollowers(username)).then(() => {
                dispath(fetchGitFollowings(username))
            })

        });
    }, []);




    if (loadingDetails || gitUserDetails == null) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center"
            }}><ActivityIndicator size="large" color="#00ff00" /></View>
        );
    }

    if (error !== "") {
        return (<View style={styles.container}>
            <Text>error</Text>
        </View>);
    }

    const userDetails: ModelGitUser = gitUserDetails as ModelGitUser;

    return (<View style={styles.container}>
        <View style={styles.row1}>
            <View style={styles.col1}>
                <TextTile title="Name" data={userDetails.name} />
                <TextTile title="Location" data={userDetails.location ?? "NA"} />
                <TextTile title="Email" data={userDetails.email ?? "NA"} />
            </View>

            <Image style={styles.col2} source={{ uri: userDetails.avatar_url }} />


        </View>

        <Text style={{
            marginVertical: 8,
            paddingLeft:8,
            fontSize: 22,
            fontWeight: "700",
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: "#9c9",
            color:"#fff"
        }}>User Details</Text>
        <ScrollView style={{
            backgroundColor: "#f5f5f5"

        }}>
            <View style={styles.row2}>


                <TextTile title="Login" data={username} />
                <TextTile title="Bio" data={userDetails.bio ?? " NA "} />
                <TextTile title="Twitter Username" data={userDetails.twitter_username ?? " NA "} />
                <TextTile title="Type" data={userDetails.type ?? " NA "} />
                <TextTile title="Company" data={userDetails.company ?? " NA "} />
                <TextTile title="Blog" data={userDetails.blog ?? " NrA "} />
                <TextTile title="Public Repos" data={`${userDetails.public_repos ?? 0}`} />
                <TextTile title="Private Gists" data={`${userDetails.public_gists ?? 0}`} />

            </View>
            <View style={styles.listContainer}>
                <TextTile title="Followers" data={`${followers.length}`} />
                <FlatList
                    nestedScrollEnabled
                    horizontal
                    style={{ flex: 1 }}
                    data={followers}
                    keyExtractor={itm => `${itm.id}`}
                    // ItemSeparatorComponent={() => (<View style={{
                    //     width: 2,
                    //     backgroundColor: "grey"
                    // }}></View>)}
                    renderItem={(itm) => (
                        <UserCard clickable={false} item={itm.item}/>

                    )} />
            </View>
            <View style={styles.listContainer}>
                <TextTile title="Following" data={`${following.length}`} />
                <FlatList
                    nestedScrollEnabled
                    horizontal
                    data={following}
                    keyExtractor={itm => `${itm.id}`}
                    // ItemSeparatorComponent={() => (<View style={{
                    //     height: 2,
                    //     backgroundColor: "black"
                    // }}></View>)}
                    renderItem={(itm) => (
                        <UserCard clickable={false} item={itm.item} />

                    )} />
            </View>
        </ScrollView>

    </View>);


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        margin: 8,
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    row1: {
        flexDirection: "row",
        // flex:1,
        height: "20%",
        marginBottom: 16
    },
    col1: {
        flex: 0.8,
    },
    col2: {
        flex: 0.3,
        borderRadius: 20,
        borderColor: "#9c9",
        borderWidth: 1,
        overflow: "hidden"
    },
    row2: {
        // height: "50%",
    },
    listContainer: {
        width:"100%"
        // height: "10%",
    }
});