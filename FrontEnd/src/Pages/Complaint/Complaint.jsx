import { useState } from 'react';
import TopNav from '../../components/ComplaintPage/TopNav/TopNav';
import Post from '../../components/ComplaintPage/Posts/Post';
import FloatingButtons from '../../components/ComplaintPage/Buttons/Buttons';
import NewPostModal from '../../components/ComplaintPage/Modal/Modal';
import Sidebar from '../../components/ComplaintPage/Sidebar/Sidebar';
import { useAuth } from '../../contexts/useAuth';
import { usePosts } from '../../contexts/usePosts';
import axios from 'axios';
import './Complaint.scss';

function Complaint() {
  const { usuarioId } = useAuth();

  const [activeTab, setActiveTab] = useState('timeline');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('recent');
  const [showModal, setShowModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a busca

  const [posts, setPosts] = usePosts(usuarioId, activeTab, currentFilter, currentSort);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };



  const createNewPost = async (formData) => {
  try {
    await axios.post('http://localhost:3001/denuncias', {
      usuarioId: Number(usuarioId),
      titulo: formData.titulo,
      descricao: formData.descricao,
      bairro: formData.bairro,
      imagens: formData.imagens || [],
      endereco: `${formData.rua}, ${formData.numero}, ${formData.bairro}`,
      latitude: formData.latitude,
      longitude: formData.longitude
    });
    setShowModal(false);
  } catch (error) {
    console.error('Erro ao criar nova denúncia:', error);
    alert('Erro ao enviar denúncia. Tente novamente.');
  }
};

  const addComment = (postId, commentText) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
            ...post,
            comments: post.comments + 1,
            commentsList: [
              { name: 'Você', time: 'agora', text: commentText },
              ...post.commentsList
            ]
          }
          : post
      )
    );
  };

  return (
    <div className="app-container">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onSearch={handleSearch} // Passando a função de busca para o Sidebar
      />
      <div className="main-content">
        <TopNav
          activeTab={activeTab}
          switchTab={setActiveTab}
          showUserDropdown={showUserDropdown}
          toggleUserDropdown={toggleUserDropdown}
          closeUserMenu={() => setShowUserDropdown(false)}
        />
        <div className="tab-content">
          {posts
            .filter(post => {
              if (post.status === 'RESOLVIDO') return false;

              if (!searchQuery) return true;
              const query = searchQuery.toLowerCase();
              return (
                post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.user.name.toLowerCase().includes(query)
              );
            })
            .map(post => (
              <Post
                key={post.id}
                post={post}
                addComment={addComment}
                refreshPosts={() => { }}
                searchQuery={searchQuery}
              />
            ))
          }

        </div>
        <FloatingButtons
          openModal={() => setShowModal(true)}
          currentFilter={currentFilter}
          currentSort={currentSort}
          filterPosts={setCurrentFilter}
          sortPosts={setCurrentSort}
        />
        <NewPostModal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          createNewPost={createNewPost}
        />
      </div>
    </div>
  );
}

export default Complaint;