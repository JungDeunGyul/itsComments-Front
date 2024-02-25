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
      <section className="flex flex-col items-start justify-center px-4 md:px-10 w-full">
        <div className="flex justify-start items-center mt-4 mb-2 rounded-lg overflow-hidden bg-gray-200 p-4 border-4 border-black">
          <p className="flex-grow">
            {userData.nickname}님의 친구 수는 {listedFriends.length} 명입니다.
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 text-white ml-4 px-2 py-1 rounded hover:bg-blue-700"
            >
              친구 추가
            </button>
          </p>
        </div>
        <div className="flex w-full mt-4 overflow-hidden">
          <div className="flex justify-center w-full max-h-[600px] p-2 md:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 overflow-auto bg-gray-300 border-8 border-black rounded-lg text-center">
            {listedFriends}
          </div>
        </div>
      </section>
      {isAddModalOpen && <FriendAdd onClose={setIsAddModalOpen} />}
    </>
  );
}

export default Friends;
