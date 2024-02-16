import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import useUserStore from "../../store/useUser";
import CommentCard from "../CommentCard";

function SingleView() {
  const { createdComments, receivedComments } = useUserStore().userData;

  const commentsList = useMemo(() => {
    return [...createdComments, ...receivedComments].sort(
      (a, b) => new Date(b.postDate) - new Date(a.postDate),
    );
  }, [createdComments, receivedComments]);
  const [selectComment, setSelectComment] = useState(commentsList[0]);

  const listedComments = commentsList.map((comment) => (
    <div key={comment._id} onClick={() => setSelectComment(comment)}>
      <CommentCard data={comment} />
    </div>
  ));

  return (
    <div className="flex">
      <div className="ml-[10px]">
        <p>작성자: {selectComment.creator.nickname}</p>
        <div>댓글내용: {selectComment.text}</div>
        <a href={selectComment.postUrl}>
          <button className="bg-green-500 text-white mt-1 mb-1 px-2 py-1 rounded hover:bg-green-700">
            url로 이동
          </button>
        </a>
        <Link to={`/comments/${selectComment._id}`}>
          <button className="bg-blue-500 text-white ml-2 mt-1 mb-1 px-2 py-1 rounded hover:bg-blue-700">
            댓글로 이동
          </button>
        </Link>
        <img
          className="[w-700px] h-[600px] border-2 border-black rounded-lg"
          src={selectComment.screenshot}
          alt="Comment Screenshot"
        ></img>
      </div>
      <div className="w-[230px] h-[700px] fixed right-0 overflow-auto mt-[10px] mr-[10px] border-2 rounded-md border-gray-300 bg-gray-200">
        {listedComments}
      </div>
    </div>
  );
}

export default SingleView;
