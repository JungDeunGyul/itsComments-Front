import axios from "axios";
import { useRef, useState } from "react";

import useUserStore from "../../store/useUser";
import useFriendsStore from "../../store/useFriends";

export function FriendAdd({ onClose }) {
  const friendMail = useRef("");
  const { userData } = useUserStore();
  const { setFriendsList } = useFriendsStore();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAddFriend(userId, friendMail) {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/friends/addition`,
        {
          userId,
          friendMail,
        },
        { withCredentials: true },
      );

      setFriendsList(res.data.friends);
      onClose(false);
    } catch (error) {
      switch (error.response.data.message) {
        case "friend not found.":
          setErrorMessage("해당 이메일을 가진 유저가 없습니다.");
          break;
        case "Friend already exists.":
          setErrorMessage("이미 있는 친구입니다.");
          break;
        case "You can't add yourself as a friend.":
          setErrorMessage("자신을 친구로 등록할 수 없습니다.");
          break;
        default:
          setErrorMessage("친구 추가에 실패하였습니다.");
          break;
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="bg-white w-[300px] p-4 rounded-md">
        <h2 className="mb-4 text-xl font-bold">친구 추가</h2>
        <input
          type="text"
          placeholder="이메일 주소 입력"
          defaultValue={friendMail.current}
          className="w-full p-2 mb-4 border"
          onChange={(e) => (friendMail.current = e.target.value)}
        />
        <p className="text-red-400">{errorMessage}</p>
        <div className="flex justify-end">
          <button
            onClick={() => handleAddFriend(userData._id, friendMail.current)}
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            추가
          </button>
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
