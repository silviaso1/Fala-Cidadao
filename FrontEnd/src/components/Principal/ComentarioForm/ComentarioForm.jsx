import React, { useState } from 'react';

function ComentarioForm({ postId, handleAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      handleAddComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div className="comment-form">
      <div className="comment-avatar">VC</div>
      <form className="comment-input" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Adicione um comentário..." 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ComentarioForm;