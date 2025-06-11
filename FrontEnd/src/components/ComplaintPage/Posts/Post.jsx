import { useState } from 'react';
import { useAuth } from '../../../contexts/useAuth';
import axios from 'axios';
import PostActions from '../Actions/Actions';
import CommentForm from '../FormComment/FormComment';
import Comment from '../Comment/Comment';
import './posts.scss';

function Post({ post, addComment, onDelete }) {
  const { usuarioId } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [likedByUser, setLikedByUser] = useState(post.likedByUser || false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = (commentText) => {
    addComment(post.id, commentText);
  };

  const toggleLike = async () => {
    try {
      await axios.post(
        `http://localhost:3001/denuncias/${post.id}/like/toggle?usuarioId=${usuarioId}`
      );
      setLikedByUser((prev) => !prev);
      setLikes((prevLikes) => (likedByUser ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error('Erro ao alternar like:', error);
      alert('Erro ao curtir denúncia. Tente novamente.');
    }
  };

  const deletarDenuncia = async () => {
    const confirmar = window.confirm('Deseja realmente excluir esta denúncia?');
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3001/denuncias/${post.id}`, {
        data: { usuarioId }, 
      });
      alert('Denúncia excluída com sucesso!');
      if (onDelete) {
        onDelete(post.id);
      }
    } catch (error) {
      console.error('Erro ao excluir denúncia:', error);
      if (error.response?.status === 403) {
        alert('Você não tem permissão para excluir esta denúncia.');
      } else if (error.response?.status === 404) {
        alert('Denúncia não encontrada.');
      } else {
        alert('Erro ao excluir denúncia. Tente novamente.');
      }
    }
  };

  const getInitial = (name) => name?.charAt(0).toUpperCase();

  return (
    <div className="post-card" data-user={post.user.name} data-date={post.date}>
      <div className="post-header">
        <div className="post-avatar">{getInitial(post.user.name)}</div>
        <div className="post-user-info">
          <h3 className="post-user">{post.user.name}</h3>
          <span className="post-time">
            {new Date(post.date).toLocaleDateString('pt-BR')} · {post.timeAgo}
          </span>
        </div>
      </div>

      <h4 className="post-title">{post.title}</h4>
      <p className="post-content">{post.content}</p>

      <PostActions
        post={{ ...post, likes, comments: post.commentsList.length }}
        toggleComments={toggleComments}
        showComments={showComments}
        toggleLike={toggleLike}
        isLiked={likedByUser}
      />

      <button className="btn-excluir" onClick={deletarDenuncia}>
        Excluir Denúncia
      </button>

      <div className={`comments-section ${showComments ? 'expanded' : ''}`}>
        <CommentForm postId={post.id} handleAddComment={handleAddComment} />
        <div className="comments-list">
          {post.commentsList.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
