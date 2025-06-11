import { FaRegComment, FaComment, FaRegHeart, FaHeart } from 'react-icons/fa';

function Actions({ post, toggleComments, showComments, toggleLike, isLiked }) {
  return (
    <div className="post-actions">
      <div
        className={`post-action ${showComments ? 'active' : ''}`}
        onClick={toggleComments}
        title="Ver comentários"
      >
        {showComments ? <FaComment /> : <FaRegComment />}
        <span>{post.comments}</span>
      </div>

      <div
        className={`post-action ${isLiked ? 'liked' : ''}`}
        onClick={toggleLike}
        title="Curtir denúncia"
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        <span>{post.likes}</span>
      </div>
    </div>
  );
}

export default Actions;
