import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReComments from "../src/components/ReComments";
import "@testing-library/jest-dom";

describe("ReComments Component", () => {
  const mockReComment = {
    creator: {
      _id: "1",
      icon: "user-icon-url",
      nickname: "TestUser",
    },
    text: "Test recomment text",
    postDate: new Date().toISOString(),
  };

  it("renders recomment with correct data", () => {
    render(<ReComments reComment={mockReComment} onDelete={() => {}} />);

    expect(screen.getByText("TestUser")).toBeInTheDocument();
    expect(screen.getByText("Test recomment text")).toBeInTheDocument();
  });

  it("calls onDelete callback when delete button is clicked", () => {
    const onDeleteMock = jest.fn();
    render(<ReComments reComment={mockReComment} onDelete={onDeleteMock} />);

    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
