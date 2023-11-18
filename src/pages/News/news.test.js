import React from "react";
import { render } from "@testing-library/react";
import News from "../News/News";

it("renders without crashing", function() {
  render(<News/>);
});