import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const usePosts = (usuarioId, activeTab, currentFilter, currentSort) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/denuncias');
        let filtered = [...data];

        if (activeTab === 'my-posts') {
          filtered = filtered.filter(p => p.usuario.id === Number(usuarioId));
        }

        filtered = applyDateFilter(filtered, currentFilter);
        filtered = applySort(filtered, currentSort);

        const mapped = await Promise.all(
          filtered.map(async (post) => {
            const { data: comentarios } = await axios.get(`http://localhost:3001/denuncias/${post.id}/comentarios`);
            const commentsList = comentarios.map(c => ({
              name: c.usuario.nome,
              time: dayjs(c.dataCriacao).fromNow(),
              text: c.texto
            }));

            return {
              id: post.id,
              user: {
                user_id: post.usuario.id,
                name: post.usuario.nome,
                username: `@${post.usuario.nome.toLowerCase().replace(/\s/g, '')}`
              },
              date: post.date || new Date().toISOString(),
              timeAgo: dayjs(post.date || new Date()).fromNow(),
              title: post.titulo,
              content: post.descricao,
              image: post.imagens?.[0] || '',
              comments: commentsList.length,
              likes: post.likes || 0,
              status: post.status,
              commentsList
            };
          })
        );

        setPosts(mapped);
      } catch (err) {
        console.error('Erro ao buscar denúncias:', err);
      }
    };

    fetchPosts();
  }, [usuarioId, activeTab, currentFilter, currentSort]);

  return [posts, setPosts];
};

const applyDateFilter = (posts, filter) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (filter) {
    case 'today':
      return posts.filter(p => new Date(p.date).setHours(0, 0, 0, 0) === today.getTime());
    case 'week': {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      return posts.filter(p => new Date(p.date) >= weekAgo);
    }
    case 'month': {
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      return posts.filter(p => new Date(p.date) >= monthAgo);
    }
    default:
      return posts;
  }
};

const applySort = (posts, sort) =>
  posts.sort((a, b) => new Date(sort === 'recent' ? b.date : a.date) - new Date(sort === 'recent' ? a.date : b.date));
