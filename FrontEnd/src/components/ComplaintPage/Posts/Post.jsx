import { useState } from 'react';
import PostActions from '../Actions/Actions';
import CommentForm from '../FormComment/FormComment';
import Comment from '../Comment/Comment';
import './posts.scss';

function Post({ post, addComment }) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = (commentText) => {
    addComment(post.id, commentText);
  };

  return (
    <div className="post-card" data-user={post.user.name} data-date={post.date}>
      <div className="post-header">
        {/* <div className="post-avatar">{post.avatar}</div> */}
        <div className="post-user-info">
          <h4 className="post-user">{post.user.name}</h4>
          {/* <span className="post-username">{post.username}</span> */}
          <span className="post-time">{new Date(post.date).toLocaleDateString('pt-BR')} · {post.timeAgo}</span>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      {/* {post.image && (
        <img src={post.image} className="post-image" alt="Post" />
      )} */}
      
      <PostActions 
        post={post}
        toggleComments={toggleComments}
        showComments={showComments}
      />
      
      <div className={`comments-section ${showComments ? 'expanded' : ''}`}>
        <CommentForm 
          postId={post.id}
          handleAddComment={handleAddComment}
        />
        
        <div className="comments-list">
          {post.commentsList.map((comment, index) => (
            <Comment 
              key={index}
              comment={comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;