import axios from "axios";
import { useEffect, useState } from "react";

import useUserStore from "../../store/useUser";
import useFriendsStore from "../../store/useFriends";
import FriendCard from "../FriendCard";
import { FriendAdd } from "../Modal/FriendAdd";

function Friends() {
  const { userData } = useUserStore();
  const { friendsList, setFriendsList } = useFriendsStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    async function getFriends() {
      const user = { id: userData._id };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/friends`,
          {
            params: user,
          },
          { withCredentials: true },
        );

        setFriendsList(res.data.friends);
      } catch (error) {
        console.log(error);
      }
    }

    getFriends();
  }, []);

  const listedFriends = friendsList.map((friend) => {
    return <FriendCard key={friend._id} data={friend} />;
  });

  return (
    <>
      <div className="flex flex-col items-start justify-center px-10 w-screen">
        <div className="flex justify-start items-center mt-4 mb-1 rounded-lg overflow-hidden bg-violet-200 p-4 border-4 border-black">
          <p className="flex-grow ">
            {userData.nickname}님의 친구수는 {listedFriends.length} 명입니다.
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 text-white ml-4 px-2 py-1 rounded hover:bg-blue-700"
            >
              친구추가
            </button>
          </p>
        </div>
        <div className="flex w-full mt-4">
          <div className="flex justify-center w-11/12 max-h-[600px] p-4 grid grid-cols-6 gap-4 overflow-auto bg-green-100 border-8 border-black rounded-lg text-center">
            {listedFriends}
          </div>
        </div>
      </div>
      {isAddModalOpen && <FriendAdd onClose={setIsAddModalOpen} />}
    </>
  );
}

export default Friends;
