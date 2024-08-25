import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/${id}`);
          setName(response.data.name);
          setEmail(response.data.email);
        } catch (error) {
          console.error('Erro ao buscar usuário:', error.response.data);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/users/${id}`, { name, email });
      } else {
        await api.post('/users', { name, email });
      }
      navigate('/users');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Editar Usuário' : 'Criar Usuário'}</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
    </form>
  );
};

export default UserForm;