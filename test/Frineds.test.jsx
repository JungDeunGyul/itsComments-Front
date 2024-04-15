import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Friends from "../src/components/Friends";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("Friends component", () => {
  it("renders user's friends and displays friend count", async () => {
    const mockedFriends = [
      { _id: "1", name: "Friend 1" },
      { _id: "2", name: "Friend 2" },
    ];

    axios.get.mockResolvedValueOnce({ data: { friends: mockedFriends } });

    const userData = { _id: "user_id", nickname: "User" };

    render(<Friends />, { initialState: { user: { userData } } });

    expect(
      screen.getByText(
        `${userData.nickname}님의 친구 수는 ${mockedFriends.length} 명입니다.`,
      ),
    ).toBeInTheDocument();

    await waitFor(() => {
      mockedFriends.forEach((friend) => {
        expect(screen.getByText(friend.name)).toBeInTheDocument();
      });
    });
  });

  it("opens friend add modal when '친구 추가' button is clicked", async () => {
    const userData = { _id: "user_id", nickname: "User" };

    render(<Friends />, { initialState: { user: { userData } } });

    act(() => {
      fireEvent.click(screen.getByText("친구 추가"));
    });

    expect(screen.getByText("Add Friend Modal Content")).toBeInTheDocument();
  });
});
