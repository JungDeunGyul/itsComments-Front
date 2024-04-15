import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { FriendAdd } from "../src/components/Modal/FriendAdd";

jest.mock("axios");

describe("FriendAdd", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render input field and buttons", () => {
    render(<FriendAdd onClose={() => {}} />);

    expect(screen.getByPlaceholderText("이메일 주소 입력")).toBeInTheDocument();
    expect(screen.getByText("추가")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
  });

  it("should display error message if friend not found", async () => {
    axios.patch.mockRejectedValueOnce({
      response: { data: { message: "friend not found." } },
    });

    render(<FriendAdd onClose={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("이메일 주소 입력"), {
      target: { value: "nonexistent@example.com" },
    });

    fireEvent.click(screen.getByText("추가"));

    await waitFor(() => {
      expect(
        screen.getByText("해당 이메일을 가진 유저가 없습니다."),
      ).toBeInTheDocument();
    });
  });

  it("should display error message if friend already exists", async () => {
    axios.patch.mockRejectedValueOnce({
      response: { data: { message: "Friend already exists." } },
    });

    render(<FriendAdd onClose={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("이메일 주소 입력"), {
      target: { value: "existing@example.com" },
    });

    fireEvent.click(screen.getByText("추가"));

    await waitFor(() => {
      expect(screen.getByText("이미 있는 친구입니다.")).toBeInTheDocument();
    });
  });

  it("should display error message if trying to add self as friend", async () => {
    axios.patch.mockRejectedValueOnce({
      response: { data: { message: "You can't add yourself as a friend." } },
    });

    render(<FriendAdd onClose={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("이메일 주소 입력"), {
      target: { value: "user@example.com" },
    });

    fireEvent.click(screen.getByText("추가"));

    await waitFor(() => {
      expect(
        screen.getByText("자신을 친구로 등록할 수 없습니다."),
      ).toBeInTheDocument();
    });
  });

  it("should call handleAddFriend function with correct parameters when adding friend", async () => {
    const onClose = jest.fn();
    axios.patch.mockResolvedValueOnce({ data: { friends: ["friend_id"] } });

    render(<FriendAdd onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText("이메일 주소 입력"), {
      target: { value: "newfriend@example.com" },
    });

    fireEvent.click(screen.getByText("추가"));

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        expect.any(String),
        { userId: expect.any(String), friendMail: "newfriend@example.com" },
        { withCredentials: true },
      );
      expect(onClose).toHaveBeenCalledWith(false);
    });
  });
});
