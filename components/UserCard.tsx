import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Text, ListRenderItemInfo, Image, TouchableHighlight } from "react-native";
import { ModelGitUser } from "../types/ModelGitUsers";
export type RootStackParamList = {
    UserDetails: { username: string };
};
export const UserCard = ({ item, clickable = true }: { item: ModelGitUser, clickable: boolean }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => {
                if (clickable) {
                    navigation.navigate("UserDetails", { username: item.login });
                }
            }}
                underlayColor="#eee">
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    padding: 8,
                }}>
                    <View style={styles.col1}>
                        <Image
                            style={styles.img}
                            source={{ uri: item.avatar_url }}></Image>
                    </View>
                    <View style={styles.col2}>
                        <Text style={styles.title}>{item.login}</Text>

                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        // height: window.screen.availWidth*0.3
    }, col1: {
        flex: 0.2,
        padding: 8,
    },
    col2: {
        flex: 0.8,
        padding: 8,
    }, title: {
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 5
    },
    img: {
        resizeMode: "cover",
        flex: 1,
        backgroundColor: "#eee",
    }
});