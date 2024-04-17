import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../src/components/Dashboard";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockedComments = [
  { _id: "1", text: "First comment" },
  { _id: "2", text: "Second comment" },
];

jest.mock("../src/store/useComments", () => ({
  __esModule: true,
  default: () => ({
    userComments: {
      createdComments: mockedComments,
      receivedComments: [],
    },
  }),
}));

describe("Dashboard component", () => {
  it("renders My Comments by default", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(screen.getByText("My Comments")).toBeInTheDocument();
    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("Second comment")).toBeInTheDocument();
  });

  it("renders Received Comments when clicked", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText("Received Comments"));
    expect(screen.getByText("Received Comments")).toBeInTheDocument();
  });

  it("navigates to comment page when comment is clicked", () => {
    const { container } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText("First comment"));
    expect(container.innerHTML).toMatch("/comments/1");
    fireEvent.click(screen.getByText("Second comment"));
    expect(container.innerHTML).toMatch("/comments/2");
  });
});
