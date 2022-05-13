import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import UserListScreen from "../../screens/Users";


describe("User List Screen", () => {
    const navigation = { navigate: () => { } };
    jest.spyOn(navigation, "navigate");
    let page: any;


    test("changing username and password and pressing login button", async () => {
        page = render(<UserListScreen />);

        // page.getAll

    });
});
