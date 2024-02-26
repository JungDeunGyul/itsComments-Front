import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import useCommentsStore from "../../store/useComments";
import CommentCard from "../CommentCard";

function SingleView() {
  const { createdComments, receivedComments } = useCommentsStore().userComments;

  const commentsList = useMemo(() => {
    return [...createdComments, ...receivedComments].sort(
      (a, b) => new Date(b.postDate) - new Date(a.postDate),
    );
  }, [createdComments, receivedComments]);

  const [selectComment, setSelectComment] = useState(commentsList[0]);
  const [scrollCoordinate, setScrollCoordinate] = useState(
    parseInt(selectComment.postCoordinate.y, 10) - 200,
  );

  useEffect(() => {
    setScrollCoordinate(parseInt(selectComment.postCoordinate.y, 10) - 200);
  }, [selectComment]);

  const listedComments = commentsList.map((comment) => (
    <div key={comment._id} onClick={() => setSelectComment(comment)}>
      <CommentCard data={comment} />
    </div>
  ));

  return (
    <section className="flex flex-wrap">
      {commentsList.length === 0 ? (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ textAlign: "center" }}
        >
          <div className="font-bold">표시할 댓글이 없습니다.</div>
        </div>
      ) : (
        <>
          <div className="mt-2 ml-[10px] w-full sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6">
            <p className="text-xl">작성자: {selectComment.creator.nickname}</p>
            <div className="text-2xl">댓글내용: {selectComment.text}</div>
            <a href={`${selectComment.postUrl}?scroll=${scrollCoordinate}`}>
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
              className="w-[97%] h-auto mb-2 border-2 border-black rounded-lg"
              src={selectComment.screenshot}
              alt="Comment Screenshot"
            ></img>
          </div>
          <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 h-[93%] flex flex-col fixed right-0 overflow-auto pl-5 pb-2 border rounded-md bg-gray-300">
            {listedComments}
          </div>
        </>
      )}
    </section>
  );
}

export default SingleView;
