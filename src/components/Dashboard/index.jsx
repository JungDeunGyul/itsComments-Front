import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCommentsStore from "../../store/useComments";
import CommentCard from "../CommentCard";

function Dashboard() {
  const { userComments } = useCommentsStore();
  const [isMyComment, setIsMyComment] = useState(true);
  const navigate = useNavigate();

  const commentsList = isMyComment
    ? userComments.createdComments
    : userComments.feedComments;

  function navigateToCommentPage(commentId) {
    navigate(`/comments/${commentId}`);
  }

  const listedComments = commentsList.map((comment) => (
    <div key={comment._id} onClick={() => navigateToCommentPage(comment._id)}>
      <CommentCard data={comment} />
    </div>
  ));

  return (
    <section className="relative w-full h-full">
      <nav className="mt-4 mb-4 h-100">
        <button
          onClick={() => setIsMyComment(true)}
          className={`ml-4 md:ml-8 text-${isMyComment ? "blue-500" : "black"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded`}
        >
          My Comments
        </button>
        <span className="px-2 py-1 ml-1 mr-1 text-lg font-bold rounded md:ml-2 md:mr-2 md:text-2xl md:py-2 md:px-4">
          |
        </span>
        <button
          onClick={() => setIsMyComment(false)}
          className={`ml-1 md:ml-2 mr-1 md:mr-2 text-${!isMyComment ? "blue-500" : "black"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded`}
        >
          Received Comments
        </button>
      </nav>
      <div className="flex grid flex-wrap justify-between w-full grid-cols-6 gap-4 px-20 overflow-auto text-center bg-gray-300 border-8 border-black rounded-lg h-5/6">
        {listedComments}
      </div>
    </section>
  );
}

export default Dashboard;
