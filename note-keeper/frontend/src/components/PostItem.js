import { useEffect, useState } from 'react';
import PostService from '../services/PostService';

const PostItem = ({ post, onDeletePost, onEditPost, categories }) => {
    const [images, setImages] = useState([]);
    const category = (categories || []).find(cat => cat.id === post.categoryId);

    useEffect(() => {
        async function fetchImages() {
            setImages(await PostService.getImagesByPost(post.id));
        }
        fetchImages();
    }, [post.id]);

    return (
        <li className="list-group-item">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h2>{post.title}</h2>
                    {images.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                            {images.map(img => (
                                <img key={img.id} src={`http://localhost:4000${img.imageUrl}`} alt="Post" style={{ maxWidth: 200, maxHeight: 200 }} />
                            ))}
                        </div>
                    )}
                    <p>{post.content}</p>
                    {category && (
                        <span style={{
                            background: category.color,
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '2px 10px',
                            marginRight: '8px',
                            fontWeight: 'bold',
                            display: 'inline-block'
                        }}>
                            {category.icon ? category.icon + ' ' : ''}{category.name}
                        </span>
                    )}
                </div>
                <div>
                    <button className="btn btn-danger" onClick={() => onDeletePost(post.id)}>Delete</button>
                    <button className="btn btn-secondary ms-2" onClick={() => onEditPost(post)}>Edit</button>
                </div>
            </div>
        </li>
    );
};

export default PostItem;
