import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { SingleComment } from "../src/components/SingleComment/SingleComment";

jest.mock("axios");

describe("SingleComment", () => {
  it("should render loading message while fetching comment data", () => {
    render(<SingleComment />);

    expect(screen.getByText("Loading....")).toBeInTheDocument();
  });

  it("should render comment data when fetched successfully", async () => {
    const mockCommentData = {
      _id: "comment_id",
      nickname: "TestUser",
      email: "test@example.com",
      screenshot: "example.png",
      reComments: [],
    };

    axios.get.mockResolvedValueOnce({ data: mockCommentData });

    render(<SingleComment />);

    await waitFor(() => {
      expect(screen.getByText("TestUser")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.getByAltText("Screenshot")).toBeInTheDocument();
      expect(screen.getByText("0 Comments")).toBeInTheDocument();
    });
  });

  it("should handle reply submission", async () => {
    const mockCommentData = {
      _id: "comment_id",
      nickname: "TestUser",
      email: "test@example.com",
      screenshot: "example.png",
      reComments: [],
    };

    axios.get.mockResolvedValueOnce({ data: mockCommentData });
    axios.patch.mockResolvedValueOnce({ status: 200 });

    render(<SingleComment />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText("Reply Text"), {
        target: { value: "Test reply" },
      });
    });

    fireEvent.click(screen.getByText("Submit Reply"));

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledTimes(1);
      expect(axios.patch).toHaveBeenCalledWith(expect.any(String), {
        userId: expect.any(String),
        text: "Test reply",
        postDate: expect.any(Date),
        commentId: "comment_id",
        action: "update",
      });
      expect(screen.getByLabelText("Reply Text").value).toBe("");
    });
  });

  it("should handle reply deletion", async () => {
    const mockCommentData = {
      _id: "comment_id",
      nickname: "TestUser",
      email: "test@example.com",
      screenshot: "example.png",
      reComments: [{ _id: "reply_id", userId: "user_id" }],
    };

    axios.get.mockResolvedValueOnce({ data: mockCommentData });
    axios.patch.mockResolvedValueOnce({ status: 200 });

    render(<SingleComment />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Delete Reply"));
    });

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledTimes(1);
      expect(axios.patch).toHaveBeenCalledWith(expect.any(String), {
        userId: expect.any(String),
        commentId: "comment_id",
        replyId: "reply_id",
        action: "delete",
      });
    });
  });
});
