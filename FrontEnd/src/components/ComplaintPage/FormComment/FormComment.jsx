import { useState } from 'react';

function FormComment({ handleAddComment }) {
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

export default FormComment;