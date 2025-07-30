import { useEffect, useState } from 'react';
import Note from '../models/Note';
import PostService from '../services/PostService';

const PostForm = ({ onAddPost, editingPost, onEditPost, categories }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setContent(editingPost.content);
            setSelectedCategoryId(editingPost.categoryId || null);
        } else {
            setTitle('');
            setContent('');
            setSelectedCategoryId(null);
        }
        setError('');
    }, [editingPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '' || content.trim() === '') return;
        if (!selectedCategoryId) {
            setError('Please select a category!');
            return;
        }
        setError('');

        const postId = editingPost ? editingPost.id : Date.now().toString();

        const post = new Note(postId, title, content, selectedCategoryId);

        if (editingPost) {
            await onEditPost(post);
        } else {
            await onAddPost(post);
        }


        if (imageFiles.length > 0) {
            for (let file of imageFiles) {
                const formData = new FormData();
                formData.append('image', file);
                const res = await fetch('http://localhost:4000/api/upload', {
                    method: 'POST',
                    body: formData
                });
                if (res.ok) {
                    const data = await res.json();
                    await PostService.addImage({
                        id: Date.now().toString() + Math.random(),
                        postId,
                        imageUrl: data.imageUrl
                    });
                }
            }
        }

        setTitle('');
        setContent('');
        setSelectedCategoryId(null);
        setImageFiles([]);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    placeholder="Title"
                    required
                />
            </div>
            <div className="mb-3">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                    placeholder="Content"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Category:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {categories.map(cat => (
                        <button
                            type="button"
                            key={cat.id}
                            style={{
                                background: cat.color,
                                color: '#fff',
                                border: selectedCategoryId === cat.id ? '2px solid #000' : '1px solid #ccc',
                                borderRadius: '20px',
                                padding: '4px 12px',
                                cursor: 'pointer',
                                fontWeight: selectedCategoryId === cat.id ? 'bold' : 'normal',
                                outline: 'none'
                            }}
                            onClick={() => setSelectedCategoryId(cat.id)}
                        >
                            {cat.icon ? cat.icon + ' ' : ''}{cat.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Images:</label>
                <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    multiple
                    onChange={e => setImageFiles(Array.from(e.target.files))}
                />
            </div>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <button type="submit" className="btn btn-primary me-2">
                {editingPost ? 'Save Changes' : 'Add Post'}
            </button>
            {editingPost && (
                <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default PostForm;
