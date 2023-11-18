import React from "react";
import { render, waitFor } from "@testing-library/react";
import Chartdata from "./Chartdata";

test("renders Chartdata component snapshot", async () => {
  await waitFor(() => {
    render(<Chartdata />);
  });
});