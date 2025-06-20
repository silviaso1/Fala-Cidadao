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
    rua: '',
    numero: '',
    bairro: '',
  });
  const [mapCenter, setMapCenter] = useState(null);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const fetchLatLng = async (form) => {
const fullAddress = `${form.rua} ${form.numero}, ${form.bairro}, Cidade, Rio de Janeiro, ${form.cep}, Brasil`;    console.log("fullAddress", fullAddress);
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: fullAddress,
          key: GOOGLE_API_KEY,
        },
      });

      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry.location;
        return { lat, lng };
      } else {
        console.error('Endereço não encontrado na API Google.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas na API Google:', error);
      return null;
    }
  };

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
      const { latitude: lat, longitude: lng, rua, bairro, numero } = response.data;

      if (!isFinite(lat) || !isFinite(lng)) throw new Error('Coordenadas inválidas');

      updateField('rua', rua || '');
      updateField('bairro', bairro || '');
      updateField('numero', numero || '');
      setMapCenter({ lat, lng });
    } catch (error) {
      console.error('Erro ao buscar coordenadas do CEP:', error);
      alert('CEP inválido ou falha na busca.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    for (const key of ['cep', 'rua', 'numero', 'bairro', 'titulo', 'descricao']) {
      if (!form[key]?.trim()) errors[key] = 'Campo obrigatório';
    }
    if (Object.keys(errors).length > 0) return setFormErrors(errors);

    // Aqui chamamos a API do Google para pegar lat/lng do endereço
    const location = await fetchLatLng(form);
    if (!location) {
      alert('Falha ao localizar o endereço. Verifique os campos.');
      return;
    }

    // Prepara os dados para enviar pro backend, incluindo lat e lng
    const postData = {
      ...form,
      latitude: location.lat,
      longitude: location.lng,
    };

    createNewPost(postData);

    // Resetar form e erros após envio
    setForm({ titulo: '', descricao: '', cep: '', rua: '', numero: '', bairro: '' });
    setFormErrors({});
  };

  const renderInput = (label, id, placeholder, type = 'text') => (
    <fieldset className="mt-2 flex-fill">
      <label htmlFor={id}>{label}</label>
      <div className='d-flex gap-4'>
        <input
          id={id}
          type={type}
          placeholder={type !== 'file' ? placeholder : ''}
          value={form[id]}
          onChange={(e) => updateField(id, e.target.value)}
        />
        {
          id === 'cep' &&
          <button type="button" onClick={handleCepSearch} className="btn btn-primary cep">
            Buscar CEP
          </button>
        }
      </div>
      {formErrors[id] && <span className="text-danger">{formErrors[id]}</span>}
    </fieldset>
  );

  return (
    <>
      <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={closeModal}></div>
      <div className={`new-post-modal ${showModal ? 'active' : ''}`}>
        <div className="modal-header">
          <div className="modal-title">Nova Denúncia</div>
          <button className="close-modal" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <Map
            externalPanTo={mapCenter}
            onLocationSelect={() => { }}
            setCep={(value) => updateField('cep', value)}
            setRua={(value) => updateField('rua', value)}
            setNumero={(value) => updateField('numero', value)}
            setBairro={(value) => updateField('bairro', value)}
          />

          <form className="post-form pt-3" onSubmit={handleSubmit}>
            <div className="d-flex gap-3">
              {renderInput('CEP', 'cep', 'Insira o CEP')}
            </div>

            <div className="d-flex gap-4 mb-4">
              {renderInput('Bairro', 'bairro', 'Insira o bairro')}
              {renderInput('Rua', 'rua', 'Insira a rua')}
              {renderInput('Número', 'numero', 'Insira o número', 'number')}
            </div>

            <hr className='pb-2' />

            {renderInput('Assunto', 'titulo', 'Insira o Título da sua denúncia')}

            <fieldset className="d-flex flex-column mt-3">
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
