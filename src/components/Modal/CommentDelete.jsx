import axios from "axios";
import { useState } from "react";

import useUserStore from "../../store/useUser";
import useCommentsStore from "../../store/useComments";
import { useNavigate } from "react-router-dom";

export function CommentDelete({ commentId, onClose }) {
  const { userData } = useUserStore();
  const { setUserComments } = useCommentsStore();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDeleteComment = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/comments/${commentId}`,
        {
          data: {
            userId: userData._id,
          },
          withCredentials: true,
        },
      );

      setUserComments(response.data.allComments);

      navigate("/");
      onClose(false);
    } catch (error) {
      setErrorMessage("삭제에 실패하였습니다.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md text-center">
        <p>댓글을 삭제하시겠습니까?</p>
        <p>{errorMessage}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleDeleteComment()}
            className="bg-red-500 text-white px-4 py-2 mr-2 border border-red-700 rounded-md"
          >
            삭제
          </button>
          <button
            onClick={() => onClose(false)}
            className="bg-black text-[#38D431] px-4 py-2 border border-black rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
