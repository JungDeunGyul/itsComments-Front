import { FriendDelete } from "../Modal/FriendDelete";
import { useDeleteModalStore } from "../../store/useModal";

function FriendCard({ data }) {
  const { isDeleteModalOpen, setIsDeleteModalOpen } = useDeleteModalStore();
  const friendMail = data.email;
  const friendNickname = data.nickname;
  const friendIcon = data.icon;
  const friendId = data._id;

  return (
    <div className="w-[160px] min-w-[160px] h-[180px] min-h-[180px] ml-4 border rounded-md bg-white text-center overflow-hidden shadow-md relative">
      <button
        className="absolute top right-1 text-lg text-red-500 font-bold"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        ×
      </button>
      <div className="p-2 bg-gray-300 text-center text-[#38D431] font-bold text-sm">
        {friendNickname}
      </div>
      <div className="whitespace-nowrap overflow-hidden text-xs overflow-ellipsis">
        {friendMail}
      </div>
      <div className="flex justify-center items-center">
        <img
          className="w-[80px] h-[80px] mt-4 rounded-full object-cover border-t"
          src={friendIcon}
          alt="Friend Icon"
        />
      </div>
      {isDeleteModalOpen && <FriendDelete friendId={friendId} />}
    </div>
  );
}

export default FriendCard;
