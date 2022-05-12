import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_USER_DATA = "USER_DATA";


function LoginScreen({ navigation }: { navigation: any }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    let timeout: any = useRef();
    // AsyncStorage.clear();

    const checkAlreadyLogin = async () => {
        setLoading(true);
        const result = await AsyncStorage.getItem(KEY_USER_DATA);
        console.log(`Data = ${result}`);
        timeout.current = setTimeout(() => {

            setLoading(false);
            if (result != null) {
                navigation.replace("UserList");
            }
            clearTimeout(timeout.current)

        }, 2000);
    }

    useEffect(() => {
        checkAlreadyLogin();

        // return(()=> clearTimeout(timeout.current))
    }, []);

    const handleSubmit = () => {
        if (userName.length <= 0) {
            Alert.alert("Invalid", "Please enter valid Username");
        } else if (password.length <= 0) {
            Alert.alert("Invalid", "Please enter valid Password");
        } else {
            handleLogin();
        }
    }


    const handleLogin = async () => {
        setLoading(true);
        timeout.current = setTimeout(async () => {
            setLoading(false);
            if (userName !== password || userName !== "admin") {
                Alert.alert("Message",
                    "Invalid credentials");
            } else {
                try {
                    await AsyncStorage.setItem(KEY_USER_DATA, JSON.stringify({ username: userName, password: password }));
                    navigation.replace("UserList");
                } catch (error) {
                    alert(`Something went wrong. ${error}`);
                }
            }
            clearTimeout(timeout.current);
        }, 2000);

    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.rootContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome</Text>
                    <TextInput style={styles.input}
                        value={userName}
                        placeholder="Enter Username"
                        keyboardType="email-address"
                        maxLength={10}
                        returnKeyType="next"
                        onChangeText={uname => {
                            setUserName(uname);
                        }}
                    />
                    <TextInput style={styles.input}
                        value={password}
                        placeholder="Enter Password"
                        keyboardType="visible-password"
                        maxLength={10}

                        onChangeText={pass => {
                            setPassword(pass);
                        }}
                    />
                    {isLoading ?
                        (<View style={{ ...styles.button, flexDirection: "row", justifyContent: "center" }}>
                            <Text style={styles.buttonText}>Please wait... </Text>
                            <ActivityIndicator size="small" />
                        </View>) :
                        <TouchableHighlight
                            testID="loginButton"
                            style={styles.button}
                            underlayColor="#78bbcc"
                            onPress={handleSubmit} >
                            <Text style={styles.buttonText}>Login </Text>
                        </TouchableHighlight>}
                </View>
            </View>
        </SafeAreaView>
    );
}


export default LoginScreen;


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#ededed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: "99%",
        justifyContent: "center",
        backgroundColor: "#fff",
        margin: 10,
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 5
    },
    input: {
        fontSize: 17,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        borderColor: "#deffff",
        borderWidth: 1.5,
        backgroundColor: "#ededed"
    },
    button: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        borderColor: "#78bbcc",
        borderWidth: 1,
        backgroundColor: "#aef",
    },
    buttonText: { fontSize: 18, alignSelf: "center", fontWeight: "700" }
});

