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
        className="w-full h-20 mb-4 border-b resize-none reply-textarea"
        placeholder="Write a reply..."
        style={{ height: "auto" }}
      />
      <button
        onClick={handleReplySubmit}
        className="absolute bottom-0 right-0 px-1 py-1 mt-1 text-white bg-blue-500 rounded-md hover:bg-blue-700"
        type="submit"
      >
        제출
      </button>
    </div>
  );
}
