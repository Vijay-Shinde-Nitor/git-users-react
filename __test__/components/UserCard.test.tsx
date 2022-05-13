import React, { Component } from "react";
import renderer from "react-test-renderer";
import { TextTile } from "../../components/TextTile";
import { UserCard } from "../../components/UserCard";
import { ModelGitUser } from "../../types/ModelGitUsers";

const model: ModelGitUser = {
    name: "Vijay SHinde",
    id: 1,
    login: "vijay",
    followers: 2,
    following: 3
}

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

test('renders correctly', () => {
    const tree = renderer.create(<UserCard item={model} clickable={false} />).toJSON();
    expect(tree).toMatchSnapshot();
});