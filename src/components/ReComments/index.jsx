/* eslint-disable react/prop-types */
import formatDate from "../../utils/formatDate";

function ReComments({ reComment, onDelete }) {
  const reCommentCreatorId = reComment.creator[0]._id;
  const reCommentId = reComment._id;
  const reCommentCreatorIcon = reComment.creator[0].icon;
  const reCommentText = reComment.text;
  const reCommentDate = formatDate(new Date(reComment.postDate));

  return (
    <div>
      <div>
        <button
          onClick={() => onDelete(reCommentCreatorId, reCommentId)}
          type="submit"
        >
          Delete
        </button>
        <img
          className="h-8 w-8 rounded-full border"
          src={reCommentCreatorIcon}
          alt="reCommentUserIcon"
        />
        <p>{reCommentText}</p>
        <p>{reCommentDate}</p>
      </div>
    </div>
  );
}

export default ReComments;
