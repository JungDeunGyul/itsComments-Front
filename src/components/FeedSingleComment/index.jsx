import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useState, useRef } from "react";

import axios from "axios";

import useUserStore from "../../store/useUser";
import fetchFeedComment from "../../../fetchers/fetchFeedSingleComment";
import formatDate from "../../utils/formatDate";
import ReComments from "../ReComments";
import { CommentDelete } from "../Modal/CommentDelete";

function FeedSingleComment() {
  const { commentId } = useParams();
  const { userData } = useUserStore();
  const replyTextRef = useRef(null);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(["comment", commentId], () =>
    fetchFeedComment(commentId, userData._id),
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [isReCommentOpen, setReComment] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    navigate("/");
  };

  const handleReComment = () => {
    if (isReCommentOpen) {
      setReComment(false);
    } else {
      setReComment(true);
    }
  };

  const handleReplySubmit = async () => {
    const replyCommentTime = new Date();
    try {
      const replyData = {
        userId: userData._id,
        text: replyTextRef.current.value,
        postDate: replyCommentTime,
        commentId,
        action: "update",
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/comments/recomments`,
        replyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to post reply");
      }

      replyTextRef.current.value = "";
    } catch (error) {
      console.error("Error posting reply:", error.message);
    }
  };

  const handleDeleteReply = async (replyUserId, replyId) => {
    try {
      if (
        (data.creator._id !== replyUserId && replyUserId !== userData._id) ||
        !userData
      ) {
        throw new Error("You can't delete");
      }

      const requestData = {
        userId: userData._id,
        commentId,
        replyId,
        action: "delete",
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/comments/recomments`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete reply");
      }
    } catch (error) {
      console.error("Error deleting reply:", error.message);
    }
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error fetching comment</div>;
  }

  const commentDate = formatDate(new Date(data.postDate));

  const listedReComments =
    isReCommentOpen &&
    data.reComments.map((reComment) => (
      <ReComments
        key={reComment._id}
        reComment={reComment}
        onDelete={handleDeleteReply}
      />
    ));

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg relative flex items-start">
            <div className="flex-shrink-0"></div>
            <div className="ml-3">
              <p className="font-bold">{data.nickname}</p>
              <p className="text-gray-500">{data.email}</p>
            </div>
            <div className="flex-grow ml-8">
              <img
                src={data.screenshot}
                className="[w-700px] h-[600px]"
                alt="Screenshot"
              />
            </div>
            <div className="flex-grow">
              <button
                className="absolute top-4 right-4 text-gray-500"
                onClick={closeModal}
              >
                X
              </button>
              <p className="ml-4">{data.reComments.length} Comments</p>
              <div className="border m-4 p-1">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full border"
                    src={data.creator.icon}
                    alt="User Icon"
                  />
                  <span className="ml-1">{data.creator.nickname}</span>
                  {data.creator.email === userData.email ? (
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="ml-2 border border-black rounded-md bg-red-400 hover:bg-red-500 text-white"
                    >
                      삭제
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="border p-1">
                  <p className="mt-4">{data.text}</p>
                  <p className="text-xs text-gray-500">{commentDate}</p>
                  <a
                    href={data.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs"
                  >
                    <div className="truncate">{data.postUrl}</div>
                  </a>

                  <div className="border-t">
                    <button onClick={handleReComment}>reply</button>
                  </div>
                </div>
              </div>
              {isReCommentOpen && listedReComments}
              {isReCommentOpen && (
                <div className="border border-black relative pt-1 pb-4 rounded-md">
                  <textarea
                    ref={replyTextRef}
                    className="reply-textarea resize-none w-full px-3 py-2 border-b-2 border-black mb-4 h-20"
                    placeholder="Write a reply..."
                    style={{ height: "auto" }}
                  />
                  <button
                    onClick={handleReplySubmit}
                    className="reply-button absolute bottom-0 right-0 mb-1 py-1 px-2 rounded-md bg-blue-500 text-white"
                    type="submit"
                  >
                    Submit Reply
                  </button>
                </div>
              )}
            </div>
          </div>
          {isDeleteModalOpen && (
            <CommentDelete
              commentId={commentId}
              onClose={setIsDeleteModalOpen}
            />
          )}
        </div>
      )}
    </>
  );
}

export default FeedSingleComment;
