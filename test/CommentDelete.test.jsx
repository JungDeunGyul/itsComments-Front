import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { CommentDelete } from "../src/components/Modal/CommentDelete";
import useUserStore from "../src/store/useUser";
import useCommentsStore from "../src/store/useComments";

jest.mock("axios");
jest.mock("../src/store/useUser");
jest.mock("../src/store/useComments");

describe("CommentDelete component", () => {
  beforeEach(() => {
    useUserStore.mockReturnValue({ userData: { _id: "user_id" } });
    useCommentsStore.mockReturnValue({ setUserComments: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays confirmation message and handles comment deletion on 'Delete' button click", async () => {
    const onClose = jest.fn();

    axios.delete.mockResolvedValueOnce({ data: { allComments: [] } });

    render(<CommentDelete commentId="comment_id" onClose={onClose} />);

    expect(screen.getByText("댓글을 삭제하시겠습니까?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("삭제"));

    expect(axios.delete).toHaveBeenCalledWith(
      `${import.meta.env.VITE_SERVER_URL}/comments/comment_id`,
      {
        data: { userId: "user_id" },
        withCredentials: true,
      },
    );

    await waitFor(() => {
      expect(useCommentsStore().setUserComments).toHaveBeenCalledWith([]);
    });

    expect(
      screen.queryByText("댓글을 삭제하시겠습니까?"),
    ).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it("displays error message on comment deletion failure", async () => {
    const onClose = jest.fn();

    axios.delete.mockRejectedValueOnce(new Error("Deletion failed"));

    render(<CommentDelete commentId="comment_id" onClose={onClose} />);

    fireEvent.click(screen.getByText("삭제"));

    await waitFor(() => {
      expect(screen.getByText("삭제에 실패하였습니다.")).toBeInTheDocument();
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes the modal on 'Cancel' button click", () => {
    const onClose = jest.fn();

    render(<CommentDelete commentId="comment_id" onClose={onClose} />);

    fireEvent.click(screen.getByText("취소"));

    expect(onClose).toHaveBeenCalledWith(false);
  });
});
