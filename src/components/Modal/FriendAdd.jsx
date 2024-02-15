import axios from "axios";
import { useRef, useState } from "react";

import useUserStore from "../../store/useUser";
import useFriendsStore from "../../store/useFriends";
import { useAddModalStore } from "../../store/useModal";

export function FriendAdd() {
  const friendMail = useRef("");
  const { userData } = useUserStore();
  const { setIsAddModalOpen } = useAddModalStore();
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
      setIsAddModalOpen(false);
    } catch (error) {
      if (error.response.data.message === "friend not found.") {
        setErrorMessage("해당 이메일을 가진 유저가 없습니다.");
      } else {
        setErrorMessage("친구 추가에 실패하였습니다.");
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[300px] p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">친구 추가</h2>
        <input
          type="text"
          placeholder="이메일 주소 입력"
          defaultValue={friendMail.current}
          className="border p-2 mb-4 w-full"
          onChange={(e) => (friendMail.current = e.target.value)}
        />
        <p className="text-red-400">{errorMessage}</p>
        <div className="flex justify-end">
          <button
            onClick={() => handleAddFriend(userData._id, friendMail.current)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
          >
            추가
          </button>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
