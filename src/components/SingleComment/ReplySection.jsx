import React from "react";

export function ReplySection({
  isReCommentOpen,
  replyTextRef,
  handleReplySubmit,
}) {
  return (
    <div className="border w-[93%] border-[#333] relative ml-4 mt-2 p-1 pb-3 rounded-md">
      <textarea
        ref={replyTextRef}
        className="w-full reply-textarea resize-none border-b mb-4 h-20"
        placeholder="Write a reply..."
        style={{ height: "auto" }}
      />
      <button
        onClick={handleReplySubmit}
        className="absolute bottom-0 right-0 mt-1 py-1 px-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
        type="submit"
      >
        제출
      </button>
    </div>
  );
}
