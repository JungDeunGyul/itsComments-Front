import React from "react";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";

function CommentCard({ data }) {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="bg-red-200 text-red-800 font-bold py-2 px-4 rounded">
        Error: No data provided
      </div>
    );
  }

  const { creator, text, postDate, screenshot } = data;

  if (!creator || !text || !postDate || !screenshot) {
    return (
      <div className="bg-red-200 text-red-800 font-bold py-2 px-4 rounded">
        Error: Incomplete data provided
      </div>
    );
  }

  const commentCreator = creator.nickname;
  const commentID = _id;
  const commentText = text;
  const commentPostDate = new Date(postDate);
  const commentScreenshot = screenshot;
  const formattedDate = formatDate(commentPostDate);

  return (
    <div
      onClick={() => navigateToCommentPage(commentID)}
      className="w-[200px] min-w-[50px] h-[220px] min-h-[55px] mt-4 ml-4 border rounded-md bg-white overflow-hidden shadow-md cursor-pointer"
    >
      <div className="p-2 text-sm font-bold text-center text-white bg-black">
        {commentCreator}
      </div>
      <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
        {commentText}
      </div>
      <img
        className="w-full h-[130px] min-h-[32] object-cover border-t border-b"
        src={commentScreenshot}
        alt="Comment Screenshot"
      />
      <div className="p-2 text-xs text-gray-500">{formattedDate}</div>
    </div>
  );
}

export default CommentCard;
