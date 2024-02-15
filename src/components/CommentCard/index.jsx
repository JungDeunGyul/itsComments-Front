import formatDate from "../../utils/formatDate";

function CommentCard({ data }) {
  const { creator, text, postDate, screenshot } = data;
  const commentCreator = creator.nickname;
  const commentText = text;
  const commentPostDate = new Date(postDate);
  const commentScreenshot = screenshot;
  const formattedDate = formatDate(commentPostDate);

  return (
    <div className="w-[200px] min-w-[200px] h-[220px] min-h-[220px] mt-4 ml-4 border rounded-md bg-white overflow-hidden shadow-md">
      <div className="p-2 bg-black text-center text-[#38D431] font-bold text-sm">
        {commentCreator}
      </div>
      <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        {commentText}
      </div>
      <img
        className="w-full h-[130px] object-cover border-t"
        src={commentScreenshot}
        alt="Comment Screenshot"
      />
      <div className="p-2 text-gray-500 text-xs">{formattedDate}</div>
    </div>
  );
}

export default CommentCard;
