import React from "react";
import { render, screen } from "@testing-library/react";
import CommentCard from "../src/components/CommentCard";
import "@testing-library/jest-dom";

describe("CommentCard Component", () => {
  const mockCommentData = {
    creator: {
      nickname: "TestUser",
    },
    text: "Test comment text",
    postDate: "2022-03-02T12:34:56.789Z",
    screenshot: "test-screenshot-url",
  };

  it("renders CommentCard component with proper data", () => {
    render(<CommentCard data={mockCommentData} />);

    expect(screen.getByText("TestUser")).toBeInTheDocument();
    expect(screen.getByText("Test comment text")).toBeInTheDocument();
    expect(screen.getByAltText("Comment Screenshot")).toBeInTheDocument();
    expect(screen.getByText("2022-03-02 21:34")).toBeInTheDocument();
  });

  it("renders error message when no data is provided", () => {
    render(<CommentCard />);
    expect(screen.getByText("Error: No data provided")).toBeInTheDocument();
  });

  it("renders error message when incomplete data is provided", () => {
    const incompleteData = {
      creator: {
        nickname: "TestUser",
      },
    };

    render(<CommentCard data={incompleteData} />);
    expect(
      screen.getByText("Error: Incomplete data provided"),
    ).toBeInTheDocument();
  });
});
