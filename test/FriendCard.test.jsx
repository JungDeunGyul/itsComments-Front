import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FriendCard } from "../src/components/FriendCard";

describe("FriendCard component", () => {
  it("renders friend card with correct information", () => {
    const friend = {
      _id: "friend_id",
      email: "friend@example.com",
      nickname: "Friend",
      icon: "friend_icon.jpg",
    };

    render(<FriendCard data={friend} />);

    expect(screen.getByText("Friend")).toBeInTheDocument();
    expect(screen.getByText("friend@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("Friend Icon")).toHaveAttribute(
      "src",
      "friend_icon.jpg",
    );
  });

  it("closes friend delete modal when modal close button is clicked", () => {
    const friend = {
      _id: "friend_id",
      email: "friend@example.com",
      nickname: "Friend",
      icon: "friend_icon.jpg",
    };

    render(<FriendCard data={friend} />);

    fireEvent.click(screen.getByText("×"));

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.getByText("삭제")).toBeInTheDocument();
  });
});
