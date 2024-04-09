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
          className="w-8 h-8 border rounded-full"
          src={feedCommentData.creator.icon}
          alt="User Icon"
        />
        <span className="ml-1">{feedCommentData.creator.nickname}</span>
        {feedCommentData.creator.email === userData.email ? (
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="items-end ml-2"
          >
            🗑️
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="p-1 border">
        <p className="mt-2">{feedCommentData.text}</p>
        <p className="text-xs text-gray-500">{commentDate}</p>
        <a
          href={`${feedCommentData.postUrl}?scroll=${scrollCoordinate}`}
          rel="noopener noreferrer"
          className="block max-w-xs overflow-hidden text-xs text-blue-500 whitespace-nowrap overflow-ellipsis"
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
