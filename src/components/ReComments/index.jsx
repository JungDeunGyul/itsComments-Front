/* eslint-disable react/prop-types */
import React from "react";
import formatDate from "../../utils/formatDate";

function ReComments({ reComment, onDelete }) {
  const reCommentCreatorId = reComment.creator._id;
  const reCommentId = reComment._id;
  const reCommentCreatorIcon = reComment.creator.icon;
  const reCommentNickName = reComment.creator.nickname;
  const reCommentText = reComment.text;
  const reCommentDate = formatDate(new Date(reComment.postDate));

  return (
    <div className="w-[93%] border-2 border-[#333] rounded-md m-4 p-1">
      <div>
        <div className="flex items-center">
          <img
            className="w-8 h-8 border rounded-full"
            src={reCommentCreatorIcon}
            alt="reCommentUserIcon"
          />
          <span className="ml-1">{reCommentNickName}</span>
          <button
            className="items-end ml-2"
            onClick={() => onDelete(reCommentCreatorId, reCommentId)}
            type="submit"
          >
            🗑️
          </button>
        </div>
        <div className="p-1 border">
          <p className="mt-2">{reCommentText}</p>
          <p className="text-xs text-gray-500">{reCommentDate}</p>
        </div>
      </div>
    </div>
  );
}

export default ReComments;
