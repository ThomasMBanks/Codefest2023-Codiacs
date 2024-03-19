import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("renders app", () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByTestId("app")).toBeTruthy;
  });
});
