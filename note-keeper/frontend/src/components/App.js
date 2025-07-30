import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
    const [categoryFilter, setCategoryFilter] = useState(null);

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
    };

    const handleDeletePost = async (id) => {
        await postService.deletePost(id);
        setPosts(await postService.getPosts());
        if (editingPost && editingPost.id === id) setEditingPost(null);
    };

    const handleEditStart = (post) => {
        setEditingPost(post);
    };

    const handleEditPost = async (updatedPost) => {
        await postService.editPost(updatedPost);
        setPosts(await postService.getPosts());
        setEditingPost(null);
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

    const filteredPosts = categoryFilter ? posts.filter(p => p.categoryId === categoryFilter) : posts;

    return (
        <Router>
            <div className="container">
                <h1 className="mt-4">NoteKeeper</h1>
                <nav className="mb-4">
                    <Link to="/add-post" className="btn btn-primary me-2">Add Post</Link>
                    <Link to="/posts" className="btn btn-outline-primary me-2">Posts</Link>
                    <Link to="/categories" className="btn btn-outline-primary me-2">Categories</Link>
                    <Link to="/database" className="btn btn-outline-secondary">Database</Link>
                </nav>
                <Routes>
                    <Route path="/add-post" element={
                        <PostForm
                            onAddPost={handleAddPost}
                            editingPost={editingPost}
                            onEditPost={handleEditPost}
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
        </Router>
    );
};

export default App;
