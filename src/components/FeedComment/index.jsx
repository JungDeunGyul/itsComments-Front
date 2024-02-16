import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useState, useRef } from "react";

import axios from "axios";

import useUserStore from "../../store/useUser";
import fetchFeedComment from "/Users/wantchurros/Desktop/itsComments-Front/fetchers/fetchFeedComment";
import formatDate from "../../utils/formatDate";
import ReComments from "../ReComments";

function FeedComment() {
  const { commentId } = useParams();
  const { userData } = useUserStore();
  const replyTextRef = useRef(null);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(["comment", commentId], () =>
    fetchFeedComment(commentId),
  );

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
        userData,
        text: replyTextRef.current.value,
        postDate: replyCommentTime,
        commentId,
      };

      const response = await axios.post(
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
      };

      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/comments/recomments/${commentId}/${replyId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: requestData,
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
              <p>{data.reComments.length} Comments</p>
              <div className="border m-4 ">
                <img
                  className="h-8 w-8 rounded-full border"
                  src={data.creator.icon}
                  alt="User Icon"
                />
                <div className="border">
                  <p className="mt-4">{data.text}</p>
                  <p className="text-xs text-gray-500">{commentDate}</p>
                  <a
                    href={data.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500"
                  >
                    {data.postUrl}
                  </a>
                  <div className="border-t">
                    <button onClick={handleReComment}>reply</button>
                  </div>
                </div>
              </div>
              {isReCommentOpen &&
                data.reComments.map((reComment) => {
                  return (
                    <ReComments
                      key={reComment._id}
                      reComment={reComment}
                      onDelete={handleDeleteReply}
                    />
                  );
                })}
              {isReCommentOpen && (
                <>
                  <textarea
                    ref={replyTextRef}
                    className="reply-textarea"
                    placeholder="Write a reply..."
                  />
                  <button
                    onClick={handleReplySubmit}
                    className="reply-button"
                    type="submit"
                  >
                    Submit Reply
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FeedComment;
