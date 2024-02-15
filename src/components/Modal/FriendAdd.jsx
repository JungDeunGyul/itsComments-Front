import axios from "axios";
import { useState } from "react";

import useUserStore from "../../store/useUser";
import useFriendsStore from "../../store/useFriends";
import { useAddModalStore } from "../../store/useModal";

export function FriendAdd() {
  const { userData } = useUserStore();
  const { setIsAddModalOpen } = useAddModalStore();
  const { setFriendsList } = useFriendsStore();
  const [friendMail, setFriendMail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAddFriend(userId, friendMail) {
    try {
      const res = await axios.patch(
        "http://localhost:3000/friends/addition",
        {
          userId,
          friendMail,
        },
        { withCredentials: true },
      );
      setFriendsList(res.data.friends);
    } catch (error) {
      if (error.response.data.message === "friend not found.") {
        setErrorMessage("해당 이메일을 가진 유저가 없습니다.");
      } else {
        setErrorMessage("친구 추가에 실패하였습니다.");
      }
      return;
    }

    setIsAddModalOpen(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[300px] p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">친구 추가</h2>
        <input
          type="text"
          placeholder="이메일 주소 입력"
          value={friendMail}
          className="border p-2 mb-4 w-full"
          onChange={(e) => setFriendMail(e.target.value)}
        />
        <p className="text-red-400">{errorMessage}</p>
        <div className="flex justify-end">
          <button
            onClick={() => handleAddFriend(userData._id, friendMail)}
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
