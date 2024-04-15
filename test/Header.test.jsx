import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../src/components/Header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("renders all buttons with default active button", () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    const dashboardButton = screen.getByText("Dashboard");
    const singleViewButton = screen.getByText("SingleView");
    const friendsButton = screen.getByText("Friends");

    expect(dashboardButton).toBeInTheDocument();
    expect(singleViewButton).toBeInTheDocument();
    expect(friendsButton).toBeInTheDocument();

    expect(dashboardButton).toHaveClass("text-blue-500");
    expect(singleViewButton).not.toHaveClass("text-blue-500");
    expect(friendsButton).not.toHaveClass("text-blue-500");
  });

  it("changes active button when clicked", () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    const singleViewButton = screen.getByText("SingleView");

    fireEvent.click(singleViewButton);

    expect(singleViewButton).toHaveClass("text-blue-500");
  });

  it("navigates to correct paths when buttons are clicked", () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>,
    );

    const dashboardButton = screen.getByText("Dashboard");
    const singleViewButton = screen.getByText("SingleView");
    const friendsButton = screen.getByText("Friends");

    fireEvent.click(dashboardButton);
    fireEvent.click(singleViewButton);
    fireEvent.click(friendsButton);

    expect(container.innerHTML).toContain("/single");
    expect(container.innerHTML).toContain("/friend");
  });
});
