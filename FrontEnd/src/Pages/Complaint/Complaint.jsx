import { useState, useEffect } from 'react';
import TopNav from '../../components/ComplaintPage/TopNav/TopNav';
import FilterSection from '../../components/ComplaintPage/Search/search';
import Post from '../../components/ComplaintPage/Posts/Post';
import FloatingButtons from '../../components/ComplaintPage/Buttons/Buttons';
import NewPostModal from '../../components/ComplaintPage/Modal/Modal';
import Sidebar from '../../components/ComplaintPage/Sidebar/Sidebar';
import axios from 'axios';
import { useAuth } from '../../contexts/useAuth';
import './Complaint.scss';

function Complaint() {
  const { usuarioId } = useAuth();
  console.log(usuarioId);

  const [activeTab, setActiveTab] = useState('timeline');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('recent');
  const [showModal, setShowModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [posts, setPosts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const filterPosts = (filterType) => setCurrentFilter(filterType);
  const sortPosts = (sortType) => setCurrentSort(sortType);
  const switchTab = (tabId) => setActiveTab(tabId);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
  };
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);
  const closeUserMenu = () => setShowUserDropdown(false);

  const createNewPost = async (formData) => {
  try {
    // Criar o objeto no formato que a API espera
    const novaDenuncia = {
      usuarioId: Number(usuarioId),  // Enviar apenas o ID do usuário
      titulo: formData.titulo,
      descricao: formData.descricao,
      bairro: formData.bairro,
      imagens: formData.imagens || []  // Garante que sempre terá um array, mesmo que vazio
    };

    // Enviar para a API
    await axios.post('http://localhost:3001/denuncias', novaDenuncia);

    closeModal();
    // Atualizar a lista de posts após criar um novo
    fetchPosts(); 
  } catch (error) {
    console.error('Erro ao criar nova denúncia:', error);
    alert('Erro ao enviar denúncia. Tente novamente.');
  }
};

  const addComment = (postId, commentText) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          user: "VC",
          name: "Você",
          time: "agora",
          text: commentText
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [newComment, ...post.commentsList]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Define fetchPosts outside of useEffect so it can be called manually
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/denuncias');
      const data = response.data;

      let filteredPosts = [...data];

      if (activeTab === 'my-posts') {
        // You might need to filter by usuarioId from your auth context here,
        // as filtering by a hardcoded name like 'Você' might not work for all users.
        filteredPosts = filteredPosts.filter(post => post.usuario.id === Number(usuarioId));
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (currentFilter) {
        case 'today':
          filteredPosts = filteredPosts.filter(post => {
            const postDate = new Date(post.date);
            postDate.setHours(0, 0, 0, 0);
            return postDate.getTime() === today.getTime();
          });
          break;
        case 'week': {
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          filteredPosts = filteredPosts.filter(post => {
            const postDate = new Date(post.date);
            postDate.setHours(0, 0, 0, 0);
            return postDate >= oneWeekAgo;
          });
          break;
        }
        case 'month': {
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          filteredPosts = filteredPosts.filter(post => {
            const postDate = new Date(post.date);
            postDate.setHours(0, 0, 0, 0);
            return postDate >= oneMonthAgo;
          });
          break;
        }
        default:
          break;
      }

      filteredPosts.sort((a, b) => {
        const dateA = new Date(a.date || '2020-01-01');
        const dateB = new Date(b.date || '2020-01-01');
        return currentSort === 'recent' ? dateB - dateA : dateA - dateB;
      });

      const mappedPosts = filteredPosts.map(post => ({
        id: post.id,
        user: {
          user_id: post.usuario.id,
          name: post.usuario.nome,
          username: `@${post.usuario.nome.toLowerCase().replace(/\s/g, '')}`
        },
        // It's better to use the actual post.date if available, otherwise fallback.
        date: post.date || new Date().toISOString().split('T')[0], 
        timeAgo: 'recentemente', // This should ideally be calculated based on post.date
        content: post.descricao,
        image: post.imagens?.[0] || '', // Use optional chaining and default to empty string
        comments: post.comments || 0, // Ensure comments default to 0 if not present
        likes: post.likes || 0,     // Ensure likes default to 0 if not present
        commentsList: post.commentsList || [] // Ensure commentsList defaults to empty array
      }));

      setPosts(mappedPosts);
    } catch (error) {
      console.error('Erro ao buscar denúncias:', error);
    }
  };

  // Call fetchPosts when component mounts or dependencies change
  useEffect(() => {
    fetchPosts();
  }, [activeTab, currentFilter, currentSort, usuarioId]); // Added usuarioId to dependencies

  return (
    <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <TopNav
          activeTab={activeTab}
          switchTab={switchTab}
          showUserDropdown={showUserDropdown}
          toggleUserDropdown={toggleUserDropdown}
          closeUserMenu={closeUserMenu}
        />

        <FilterSection
          currentFilter={currentFilter}
          currentSort={currentSort}
          filterPosts={filterPosts}
          sortPosts={sortPosts}
        />

        <div className="tab-content">
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              addComment={addComment}
            />
          ))}
        </div>

        <FloatingButtons
          openModal={openModal}
          currentFilter={currentFilter}
          currentSort={currentSort}
          filterPosts={filterPosts}
          sortPosts={sortPosts}
        />

        <NewPostModal
          showModal={showModal}
          closeModal={closeModal}
          createNewPost={createNewPost}
        />
      </div>
    </div>
  );
}

export default Complaint;