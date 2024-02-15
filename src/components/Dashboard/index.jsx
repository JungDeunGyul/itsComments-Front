import { useState } from "react";
import useUserStore from "../../store/useUser";
import CommentCard from "../CommentCard";

function Dashboard() {
  const { userData } = useUserStore();
  const [isMyComment, setIsMyComment] = useState(true);

  const commentsList = isMyComment
    ? userData.createdComments
    : userData.receivedComments;

  const listedComments = commentsList.map((comment) => {
    return <CommentCard key={comment._id} data={comment} />;
  });

  return (
    <div className="w-full h-full">
      <button
        onClick={() => setIsMyComment(true)}
        className="ml-[100px] mr-1 text-black text-2xl font-bold py-2 px-4 rounded"
      >
        My Comments
      </button>
      <span className="mr-1 text-black text-2xl font-bold py-2 px-4 rounded">
        |
      </span>
      <button
        onClick={() => setIsMyComment(false)}
        className="mr-1 text-black text-2xl font-bold py-2 px-4 rounded"
      >
        Received Comments
      </button>
      <div className="flex w-full h-full justify-center mt-4">
        <div className="flex justify-center w-11/12 h-[600px] grid grid-cols-6 overflow-auto border-8 border-black rounded-lg bg-green-100 text-center">
          {listedComments}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
