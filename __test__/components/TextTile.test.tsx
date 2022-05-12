import React, { Component } from "react";
import renderer from "react-test-renderer";
import { TextTile } from "../../components/TextTile";

test('renders correctly', () => {
    const tree = renderer.create(<TextTile title="Name: " data="Vijay" />).toJSON();
    expect(tree).toMatchSnapshot();
});