
import { FaRegComment, FaComment, FaRegHeart, FaHeart } from 'react-icons/fa';

function Actions({ post, toggleComments, showComments, toggleLike, isLiked }) {
  return (
    <div className="post-actions">
      <div
        className={`post-action ${showComments ? 'active' : ''}`}
        onClick={toggleComments}
      >
        {showComments ? <FaComment /> : <FaRegComment />}
        <span>{post.comments}</span>
      </div>

      <div
        className={`post-action ${isLiked ? 'active' : ''}`}
        onClick={toggleLike}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        <span>{post.likes}</span>
      </div>



    </div>
  );
}

export default Actions;