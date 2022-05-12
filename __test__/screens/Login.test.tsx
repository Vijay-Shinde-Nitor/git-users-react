import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import LoginScreen from "../../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";


describe("Login Screen", () => {
    const navigation = { replace: () => { } };
    jest.spyOn(navigation, "replace");
    let page: any;

    beforeEach(() => {
        page = render(<LoginScreen navigation={navigation} />);

    });

    test("checks if user has logged in previously", () => {
        expect(AsyncStorage.getItem).toBeCalled();
    });

    test("checks if login form shown correctly", async () => {



        expect(page.getAllByText("Welcome").length).toBe(1);

        await new Promise((r) => setTimeout(r, 3000));

        const username = page.getAllByPlaceholderText("Enter Username");
        expect(username.length).toBe(1);

        const password = page.getAllByPlaceholderText("Enter Password");
        expect(password.length).toBe(1);

        const loginButton = page.getAllByTestId("loginButton");
        expect(loginButton.length).toBe(1);

    });

    test("changing username and password and pressing login button", async () => {

        await new Promise((r) => setTimeout(r, 3000));

        const username = page.getByPlaceholderText("Enter Username");
        fireEvent.changeText(username, "admin");

        expect(username.props.value).toBe("admin");

        const password = page.getByPlaceholderText("Enter Password");
        fireEvent.changeText(password, "admin");

        expect(password.props.value).toBe("admin");


        const loginButton = page.getByTestId("loginButton");



        act(() => {

            fireEvent.press(loginButton);

            // expect(navigation.replace).toBeCalled();
        });
    });
});
