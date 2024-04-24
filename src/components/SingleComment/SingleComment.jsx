import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useUserStore from "../../store/useUser";
import ReComments from "../ReComments";
import { CommentDelete } from "../Modal/CommentDelete";
import fetchFeedSingleComment from "../../../fetchers/fetchFeedSingleComment";
import { ReplySection } from "./ReplySection";
import { CommentDetail } from "./CommentDetail";

export function SingleComment() {
  const { commentId } = useParams();
  const { userData } = useUserStore();
  const replyTextRef = useRef(null);
  const navigate = useNavigate();

  const [feedCommentData, setFeedCommentData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [isReCommentOpen, setReComment] = useState(false);
  const [scrollCoordinate, setScrollCoordinate] = useState(null);

  useEffect(() => {
    if (feedCommentData) {
      setScrollCoordinate(parseInt(feedCommentData.postCoordinate.y, 10) - 200);
    }
  }, [feedCommentData]);

  const closeModal = () => {
    setModalOpen(false);
    navigate(-1);
  };

  const handleReComment = () => {
    if (isReCommentOpen) {
      setReComment(false);
    } else {
      setReComment(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentData = await fetchFeedSingleComment(
          commentId,
          userData._id,
        );
        setFeedCommentData(commentData);
      } catch (error) {
        console.error("Error fetching comment:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_SERVER_URL}/comments/recomments/comments-recomments-stream/${commentId}`,
    );

    eventSource.addEventListener("message", (event) => {
      const commentDataUpdate = JSON.parse(event.data);
      setFeedCommentData(commentDataUpdate);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const handleReplySubmit = async () => {
    const replyCommentTime = new Date();
    try {
      const replyData = {
        userId: userData._id,
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
        (feedCommentData.creator._id !== replyUserId &&
          replyUserId !== userData._id) ||
        !userData
      ) {
        throw new Error("You can't delete");
      }

      const requestData = {
        userId: userData._id,
        commentId,
        replyId,
      };

      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/comments/recomments`,
        {
          data: requestData,
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

  if (!feedCommentData) {
    return <div>Loading....</div>;
  }

  const listedReComments =
    isReCommentOpen &&
    feedCommentData.reComments.map((reComment) => (
      <ReComments
        key={reComment._id}
        reComment={reComment}
        onDelete={handleDeleteReply}
      />
    ));

  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  }

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
          <div className="relative flex items-start w-3/4 p-4 bg-white rounded-lg h-3/4">
            <div className="w-5/6">
              <div className="ml-2">
                <p className="font-bold">{feedCommentData.nickname}</p>
                <p className="text-gray-500">{feedCommentData.email}</p>
              </div>
              <div className="flex flex-grow ml-2">
                <img
                  src={feedCommentData.screenshot}
                  className="w-auto h-full max-h-[600px] border rounded-md"
                  alt="Screenshot"
                />
              </div>
            </div>
            <div className="w-1/4 p-1 overflow-y-auto h-5/6">
              <button
                className="absolute text-gray-500 top-4 right-4"
                onClick={closeModal}
              >
                X
              </button>
              <p className="ml-4">
                {feedCommentData.reComments.length} Comments
              </p>
              <CommentDetail
                feedCommentData={feedCommentData}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                scrollCoordinate={scrollCoordinate}
                truncateString={truncateString}
                handleReComment={handleReComment}
              />
              {isReCommentOpen && listedReComments}
              {isReCommentOpen && (
                <ReplySection
                  isReCommentOpen={isReCommentOpen}
                  replyTextRef={replyTextRef}
                  handleReplySubmit={handleReplySubmit}
                />
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
