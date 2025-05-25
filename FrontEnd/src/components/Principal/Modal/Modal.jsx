import React, { useState } from 'react';
import { FaImage, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import './modal.scss';

function Modal({ showModal, closeModal, createNewPost }) {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      createNewPost(postContent);
      setPostContent('');
    } else {
      alert('Por favor, escreva algo no post!');
    }
  };

  return (
    <>
      <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={closeModal}></div>
      <div className={`new-post-modal ${showModal ? 'active' : ''}`}>
        <div className="modal-header">
          <div className="modal-title">Criar Novo Post</div>
          <button className="close-modal" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        <form className="post-form" onSubmit={handleSubmit}>
          <textarea 
            id="newPostContent" 
            placeholder="O que você quer reportar ou compartilhar?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          <div className="post-form-actions">
            <div className="upload-options">
              <button type="button" className="upload-btn" title="Adicionar imagem">
                <FaImage />
              </button>
              <button type="button" className="upload-btn" title="Adicionar localização">
                <FaMapMarkerAlt />
              </button>
            </div>
            <button type="submit" className="post-submit">Publicar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Modal;