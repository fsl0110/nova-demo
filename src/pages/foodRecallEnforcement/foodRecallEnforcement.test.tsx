import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { FoodRecallEnforcement } from "./foodRecallEnforcement";

it("renders without crashing", () => {
  shallow(<FoodRecallEnforcement />);
});

it("renders toMatchSnapshot", () => {
  const mock = shallow(<FoodRecallEnforcement />);
  expect(toJson(mock)).toMatchSnapshot();
});