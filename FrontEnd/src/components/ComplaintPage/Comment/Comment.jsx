function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="comment-avatar">{comment.user}</div>
      <div className="comment-content">
        <div className="comment-user">{comment.name} <span className="post-time">· {comment.time}</span></div>
        <div className="comment-text">{comment.text}</div>
      </div>
    </div>
  );
}

export default Comment;