import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CommentDetail } from "../src/components/SingleComment/CommentDetail";
import "@testing-library/jest-dom";

jest.mock("../src/store/useUser", () => ({
  __esModule: true,
  default: () => ({
    userData: {
      email: "test@example.com",
    },
  }),
}));

describe("CommentDetail Component", () => {
  const mockCommentData = {
    creator: {
      icon: "user-icon-url",
      nickname: "TestUser",
      email: "test@example.com",
    },
    postDate: "2022-03-02T12:34:56.789Z",
    text: "Test comment text",
    postUrl: "https://example.com/post/1",
  };

  const mockSetIsDeleteModalOpen = jest.fn();
  const mockScrollCoordinate = 123;
  const mockTruncateString = jest.fn();
  const mockHandleReComment = jest.fn();

  it("renders CommentDetail component with proper data", () => {
    render(
      <CommentDetail
        feedCommentData={mockCommentData}
        setIsDeleteModalOpen={mockSetIsDeleteModalOpen}
        scrollCoordinate={mockScrollCoordinate}
        truncateString={mockTruncateString}
        handleReComment={mockHandleReComment}
      />,
    );

    expect(screen.getByAltText("User Icon")).toBeInTheDocument();
    expect(screen.getByText("TestUser")).toBeInTheDocument();
    expect(screen.getByText("Test comment text")).toBeInTheDocument();
    expect(screen.getByText("2022-03-02 21:34")).toBeInTheDocument();

    const replyButton = screen.getByText("reply");
    fireEvent.click(replyButton);
    expect(mockHandleReComment).toHaveBeenCalled();
  });

  it("renders delete button if the comment creator is the same as the logged-in user", () => {
    render(
      <CommentDetail
        feedCommentData={mockCommentData}
        setIsDeleteModalOpen={mockSetIsDeleteModalOpen}
        scrollCoordinate={mockScrollCoordinate}
        truncateString={mockTruncateString}
        handleReComment={mockHandleReComment}
      />,
    );

    const deleteButton = screen.getByText("🗑️");
    fireEvent.click(deleteButton);
    expect(mockSetIsDeleteModalOpen).toHaveBeenCalledWith(true);
  });

  it("does not render delete button if the comment is not from the current user", () => {
    render(
      <CommentDetail
        feedCommentData={{
          ...mockCommentData,
          creator: {
            ...mockCommentData.creator,
            email: "other@example.com",
          },
        }}
        setIsDeleteModalOpen={mockSetIsDeleteModalOpen}
        scrollCoordinate={mockScrollCoordinate}
        truncateString={mockTruncateString}
        handleReComment={mockHandleReComment}
      />,
    );

    expect(screen.queryByText("🗑️")).not.toBeInTheDocument();
  });
});
