import React from "react";

import useUserStore from "../../store/useUser";
import formatDate from "../../utils/formatDate";

export function CommentDetail({
  feedCommentData,
  setIsDeleteModalOpen,
  scrollCoordinate,
  truncateString,
  handleReComment,
}) {
  const { userData } = useUserStore();

  const commentDate = formatDate(new Date(feedCommentData.postDate));

  return (
    <div className="border w-[93%] border-[#333] relative ml-4 mt-2 p-1 pb-3 rounded-md">
      <div className="flex items-center">
        <img
          className="h-8 w-8 rounded-full border"
          src={feedCommentData.creator.icon}
          alt="User Icon"
        />
        <span className="ml-1">{feedCommentData.creator.nickname}</span>
        {feedCommentData.creator.email === userData.email ? (
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="ml-2 items-end"
          >
            🗑️
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="border p-1">
        <p className="mt-2">{feedCommentData.text}</p>
        <p className="text-xs text-gray-500">{commentDate}</p>
        <a
          href={`${feedCommentData.postUrl}?scroll=${scrollCoordinate}`}
          rel="noopener noreferrer"
          className="text-xs text-blue-500 block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs"
        >
          {truncateString(feedCommentData.postUrl, 20)}
        </a>
        <div className="border-t">
          <button onClick={handleReComment}>reply</button>
        </div>
      </div>
    </div>
  );
}
