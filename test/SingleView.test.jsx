import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SingleView from "../src/components/SingleView";
import "@testing-library/jest-dom";

describe("SingleView Component", () => {
  const mockComments = [
    {
      _id: "1",
      creator: { nickname: "TestUser1" },
      text: "Test comment text 1",
      postUrl: "https://example.com",
      screenshot: "screenshot-url-1",
      postCoordinate: { x: "100", y: "100" },
    },
    {
      _id: "2",
      creator: { nickname: "TestUser2" },
      text: "Test comment text 2",
      postUrl: "https://example.com",
      screenshot: "screenshot-url-2",
      postCoordinate: { x: "200", y: "200" },
    },
  ];

  beforeEach(() => {
    render(<SingleView />);
  });

  it("renders 'No comments to display' message when there are no comments", () => {
    expect(screen.queryAllByText("표시할 댓글이 없습니다.")).toHaveLength(1);
  });
});
