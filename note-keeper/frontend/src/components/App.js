import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Note from '../models/Note';
import categoryService from '../services/CategoryService';
import postService from '../services/PostService';
import CategoryForm from './CategoryForm';
import CategoryManager from './CategoryManager';
import DatabasePage from './DatabasePage';
import PostForm from './PostForm';
import PostList from './PostList';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setPosts(await postService.getPosts());
        setCategories(await categoryService.getCategories());
    };

    const handleAddPost = async (post) => {
        await postService.addPost(post);
        setPosts(await postService.getPosts());
        setSuccessMessage('Post added successfully!');
        setTimeout(() => setSuccessMessage(''), 2500);
    };

    const handleDeletePost = async (id) => {
        await postService.deletePost(id);
        setPosts(await postService.getPosts());
        if (editingPost && editingPost.id === id) setEditingPost(null);
        setSuccessMessage('Post deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 2500);
    };

    const handleEditStart = (post) => {
        setEditingPost(new Note(post.id, post.title, post.content, post.categoryId));
        navigate('/add-post');
    };

    const handleEditPost = async (updatedPost) => {
        await postService.editPost(updatedPost);
        setPosts(await postService.getPosts());
        setEditingPost(null);
        setSuccessMessage('Post updated successfully!');
        setTimeout(() => setSuccessMessage(''), 2500);
    };

    const handleCategoryChange = async () => {
        setCategories(await categoryService.getCategories());
        const updatedCategories = await categoryService.getCategories();
        if (categoryFilter && !updatedCategories.find(cat => cat.id === categoryFilter)) {
            setCategoryFilter(null);
        }
        if (editingPost && !updatedCategories.find(cat => cat.id === editingPost.categoryId)) {
            setEditingPost(null);
        }
    };

    const filteredPosts = posts.filter(p => {
        const matchesCategory = categoryFilter ? p.categoryId === categoryFilter : true;
        const matchesSearch = searchQuery.trim() === '' ? true : p.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCancelEdit = () => {
        setEditingPost(null);
        navigate('/posts');
    };

    return (
        <div className="container">
            {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                </div>
            )}
            <h1 className="mt-4">NoteKeeper</h1>
            <nav className="mb-4 d-flex align-items-center justify-content-between">
                <div>
                    <NavLink to="/add-post" className={({ isActive }) => isActive ? "btn btn-primary me-2 active" : "btn btn-primary me-2"}>Add Post</NavLink>
                    <NavLink to="/posts" className={({ isActive }) => isActive ? "btn btn-outline-primary me-2 active" : "btn btn-outline-primary me-2"}>Posts</NavLink>
                    <NavLink to="/categories" className={({ isActive }) => isActive ? "btn btn-outline-primary me-2 active" : "btn btn-outline-primary me-2"}>Categories</NavLink>
                    <NavLink to="/database" className={({ isActive }) => isActive ? "btn btn-outline-secondary active" : "btn btn-outline-secondary"}>Database</NavLink>
                </div>
                <input
                    type="text"
                    className="form-control ms-3"
                    style={{ maxWidth: 250 }}
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </nav>
            <Routes>
                <Route path="/add-post" element={
                    <PostForm
                        onAddPost={handleAddPost}
                        editingPost={editingPost}
                        onEditPost={handleEditPost}
                        onCancelEdit={handleCancelEdit}
                        categories={categories}
                    />
                } />
                <Route path="/posts" element={
                    <>
                        <div className="mb-3">
                            <button onClick={() => setCategoryFilter(null)} className={`btn btn-outline-secondary btn-sm me-2${categoryFilter === null ? ' active' : ''}`}>All</button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategoryFilter(cat.id)}
                                    className={`btn btn-sm me-2 ${categoryFilter === cat.id ? 'btn-primary' : 'btn-outline-primary'}`}
                                    style={{ background: categoryFilter === cat.id ? cat.color : '', color: categoryFilter === cat.id ? '#fff' : '' }}
                                >
                                    {cat.icon ? cat.icon + ' ' : ''}{cat.name}
                                </button>
                            ))}
                        </div>
                        <PostList
                            posts={filteredPosts}
                            onDeletePost={handleDeletePost}
                            onEditPost={handleEditStart}
                            categories={categories}
                        />
                    </>
                } />
                <Route path="/categories" element={
                    <>
                        <CategoryForm onCategoryAdded={handleCategoryChange} />
                        <CategoryManager categories={categories} onCategoryChange={handleCategoryChange} />
                    </>
                } />
                <Route path="/database" element={<DatabasePage />} />
                <Route path="*" element={
                    <>
                        <div className="mb-3">
                            <button onClick={() => setCategoryFilter(null)} className={`btn btn-outline-secondary btn-sm me-2${categoryFilter === null ? ' active' : ''}`}>All</button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategoryFilter(cat.id)}
                                    className={`btn btn-sm me-2 ${categoryFilter === cat.id ? 'btn-primary' : 'btn-outline-primary'}`}
                                    style={{ background: categoryFilter === cat.id ? cat.color : '', color: categoryFilter === cat.id ? '#fff' : '' }}
                                >
                                    {cat.icon ? cat.icon + ' ' : ''}{cat.name}
                                </button>
                            ))}
                        </div>
                        <PostList
                            posts={filteredPosts}
                            onDeletePost={handleDeletePost}
                            onEditPost={handleEditStart}
                            categories={categories}
                        />
                    </>
                } />
            </Routes>
        </div>
    );
};

export default App;
