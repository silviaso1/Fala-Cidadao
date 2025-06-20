import { useState } from 'react';
import { useAuth } from '../../../contexts/useAuth';
import axios from 'axios';
import PostActions from '../Actions/Actions';
import CommentForm from '../FormComment/FormComment';
import Comment from '../Comment/Comment';
import './posts.scss';

function Post({ post, addComment, /*onDelete, */ searchQuery }) {
  const { usuarioId } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [likedByUser, setLikedByUser] = useState(post.likedByUser || false);
  // const [showMenu, setShowMenu] = useState(false);

  const matchesSearch = () => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.user.name.toLowerCase().includes(query)
    );
  };

  if (!matchesSearch()) {
    return null;
  }

  const toggleComments = () => setShowComments(!showComments);

  const handleAddComment = async (commentText) => {
  try {
    await axios.post(
      `http://localhost:3001/denuncias/${post.id}/comentarios?usuarioId=${usuarioId}`,
      { texto: commentText }
    );

    addComment(post.id, commentText); 
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    alert('Erro ao enviar comentário. Tente novamente.');
  }
};


  const toggleLike = async () => {
    try {
      await axios.post(`http://localhost:3001/denuncias/${post.id}/like/toggle?usuarioId=${usuarioId}`);
      setLikedByUser((prev) => !prev);
      setLikes((prevLikes) => (likedByUser ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error('Erro ao alternar like:', error);
      alert('Erro ao curtir denúncia. Tente novamente.');
    }
  };

  // const deletarDenuncia = async () => {
  //   const confirmar = window.confirm('Deseja realmente excluir esta denúncia?');
  //   if (!confirmar) return;

  //   try {
  //     await axios.delete(`http://localhost:3001/denuncias/${post.id}`, {
  //       data: { usuarioId },
  //     });
  //     alert('Denúncia excluída com sucesso!');
  //     if (onDelete) onDelete(post.id);
  //   } catch (error) {
  //     console.error('Erro ao excluir denúncia:', error);
  //     alert(error.response?.status === 403
  //       ? 'Você não tem permissão para excluir esta denúncia.'
  //       : error.response?.status === 404
  //         ? 'Denúncia não encontrada.'
  //         : 'Erro ao excluir denúncia. Tente novamente.');
  //   }
  // };

  const formatStatus = (status) => {
    switch (status) {
      case 'EM_ANDAMENTO':
        return 'Em Andamento';
      case 'RESOLVIDO':
        return 'Resolvido';
      case 'INVALIDO':
        return 'Inválido';
      case 'DENUNCIADO':
        return 'Denunciado';
      default:
        return 'Status Desconhecido';
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
        <div className="post-menu">
          <p className={`post-status status-${post.status.toLowerCase()}`}>
            {formatStatus(post.status)}
          </p>
          {/* <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {showMenu && (
            <div className="menu-dropdown">
              <button onClick={deletarDenuncia} className="delete-button">
                Excluir Denúncia
              </button>
            </div>
          )} */}
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