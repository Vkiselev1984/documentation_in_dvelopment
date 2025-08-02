import { useEffect, useState } from 'react';
import postService from '../services/PostService';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  // Получение списка постов
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts');
      }
    }
    fetchPosts();
  }, []);

  // Добавление поста
  async function handleAddPost(newPost) {
    try {
      const created = await postService.addPost(newPost);
      setPosts(prev => [...prev, created]);
    } catch (err) {
      setError('Failed to add post');
    }
  }

  // Редактирование поста
  async function handleEditPost(updatedPost) {
    try {
      const result = await postService.editPost(updatedPost);
      setPosts(prev => prev.map(p => p.id === result.id ? result : p));
    } catch (err) {
      setError('Failed to edit post');
    }
  }

  // Удаление поста
  async function handleDeletePost(id) {
    try {
      await postService.deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  }

  // Получение изображений для поста
  async function fetchImages(postId) {
    try {
      const images = await postService.getImagesByPost(postId);
      // используйте images по назначению
    } catch (err) {
      setError('Failed to load images');
    }
  }

  // Добавление изображения
  async function handleAddImage(image) {
    try {
      const result = await postService.addImage(image);
      // обновите состояние изображений, если нужно
    } catch (err) {
      setError('Failed to add image');
    }
  }

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          {/* ... */}
        </div>
      ))}
      {/* Здесь формы для добавления/редактирования постов, кнопки и т.д. */}
    </div>
  );
}

export default PostsPage;
