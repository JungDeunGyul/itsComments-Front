import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCommentsStore from "../../store/useComments";
import CommentCard from "../CommentCard";

function Dashboard() {
  const { userComments } = useCommentsStore();
  const [isMyComment, setIsMyComment] = useState(true);
  const navigate = useNavigate();

  const commentsList = isMyComment
    ? userComments.createdComments
    : userComments.receivedComments;

  function navigateToCommentPage(commentId) {
    navigate(`/comments/${commentId}`);
  }

  const listedComments = commentsList.map((comment) => (
    <div key={comment._id} onClick={() => navigateToCommentPage(comment._id)}>
      <CommentCard data={comment} />
    </div>
  ));

  return (
    <section className="w-full h-full relative">
      <nav className="h-100 mt-4 mb-4">
        <button
          onClick={() => setIsMyComment(true)}
          className={`ml-4 md:ml-8 text-${isMyComment ? "blue-500" : "black"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded`}
        >
          My Comments
        </button>
        <span className="ml-1 md:ml-2 mr-1 md:mr-2 text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded">
          |
        </span>
        <button
          onClick={() => setIsMyComment(false)}
          className={`ml-1 md:ml-2 mr-1 md:mr-2 text-${!isMyComment ? "blue-500" : "black"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded`}
        >
          Received Comments
        </button>
      </nav>
      <div className="flex w-full h-5/6 justify-center mt-4 mb-20 py-30 overflow-auto bg-gray-300 border-8 border-black rounded-lg text-center flex-wrap grid grid-cols-6 gap-4">
        {listedComments}
      </div>
    </section>
  );
}

export default Dashboard;
