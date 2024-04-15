import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ReplySection } from "../src/components/SingleComment/ReplySection";

describe("ReplySection Component", () => {
  const mockHandleReplySubmit = jest.fn();
  let replyTextRef;

  beforeEach(() => {
    replyTextRef = React.createRef();
    render(
      <ReplySection
        isReCommentOpen={false}
        replyTextRef={replyTextRef}
        handleReplySubmit={mockHandleReplySubmit}
      />,
    );
  });

  it("renders textarea for reply input", () => {
    expect(screen.getByPlaceholderText("Write a reply...")).toBeInTheDocument();
  });

  it("calls handleReplySubmit when submit button is clicked", () => {
    const replyText = "This is a test reply";
    fireEvent.change(replyTextRef.current, { target: { value: replyText } });
    fireEvent.click(screen.getByText("제출"), { button: 0 });

    expect(mockHandleReplySubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleReplySubmit).toHaveBeenCalledWith(expect.any(Object));
  });
});
