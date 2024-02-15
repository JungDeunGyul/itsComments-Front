import axios from "axios";
import { useEffect } from "react";

import FriendCard from "../FriendCard";
import useUserStore from "../../store/useUser";
import useFriendsStore from "../../store/useFriends";

function Friends() {
  const { userData } = useUserStore();
  const { friendsList, setFriendsList } = useFriendsStore();

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
        <div className="flex w-full mt-4">
          <div className="flex justify-center w-11/12 max-h-[600px] p-4 grid grid-cols-6 gap-4 overflow-auto bg-green-100 border-8 border-black rounded-lg text-center">
            {listedFriends}
          </div>
        </div>
      </div>
    </>
  );
}

export default Friends;
