import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Map from '../Map/Map';
import './modal.scss';

function Modal({ showModal, closeModal, createNewPost }) {
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
  });
  const [mapCenter, setMapCenter] = useState(null);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (value.trim()) removeError(field);
  };

  const removeError = (field) => {
    setFormErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handleCepSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3001/geo', { endereco: form.cep });
      const { latitude: lat, longitude: lng, enderecoCompleto, bairro } = response.data;

      if (!isFinite(lat) || !isFinite(lng)) throw new Error('Coordenadas inválidas');

      updateField('endereco', enderecoCompleto);
      updateField('bairro', bairro);
      updateField('numero', '');
      setMapCenter({ lat, lng });
    } catch (error) {
      console.error('Erro ao buscar coordenadas do CEP:', error);
      alert('CEP inválido ou falha na busca.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    for (const key of ['cep', 'endereco', 'numero', 'bairro', 'titulo', 'descricao']) {
      if (!form[key]?.trim()) errors[key] = 'Campo obrigatório';
    }
    if (Object.keys(errors).length > 0) return setFormErrors(errors);

    createNewPost(form);
    setForm({ titulo: '', descricao: '', cep: '', endereco: '', numero: '', bairro: '' });
    setFormErrors({});
  };

  const renderInput = (label, id, type = 'text') => (
    <fieldset className="d-flex flex-column mt-2">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={label}
        value={form[id]}
        onChange={(e) => updateField(id, e.target.value)}
      />
      {formErrors[id] && <span className="text-danger">{formErrors[id]}</span>}
    </fieldset>
  );

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

        <div className="modal-body">
          <Map
            externalPanTo={mapCenter}
            onLocationSelect={() => {}}
            setCep={(value) => updateField('cep', value)}
            setEndereco={(value) => updateField('endereco', value)}
            setNumero={(value) => updateField('numero', value)}
            setBairro={(value) => updateField('bairro', value)}
          />

          <form className="post-form pt-3" onSubmit={handleSubmit}>
            <fieldset className="d-flex flex-column">
              <label htmlFor="cep">CEP</label>
              <div className="d-flex gap-2">
                <input
                  id="cep"
                  type="text"
                  placeholder="Digite o CEP"
                  value={form.cep}
                  onChange={(e) => updateField('cep', e.target.value)}
                  className="flex-fill"
                />
                <button type="button" onClick={handleCepSearch} className="btn btn-primary">
                  Buscar CEP
                </button>
              </div>
              {formErrors.cep && <span className="text-danger">{formErrors.cep}</span>}
            </fieldset>

            <div className='flexRender'>
              {renderInput('Endereço', 'endereco')}
              {renderInput('Número', 'numero')}
              {renderInput('Bairro', 'bairro')}
            </div>
            
            {renderInput('Assunto', 'titulo')}
            
            <fieldset className="d-flex flex-column mt-4">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                placeholder="O que você quer reportar ou compartilhar?"
                value={form.descricao}
                onChange={(e) => updateField('descricao', e.target.value)}
              />
              {formErrors.descricao && <span className="text-danger">{formErrors.descricao}</span>}
            </fieldset>

            <button type="submit" className="post-submit mt-3">Publicar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
