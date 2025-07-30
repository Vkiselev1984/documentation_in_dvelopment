import { useState } from 'react';
import CategoryService from '../services/CategoryService';

const CategoryForm = ({ onCategoryAdded }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#007bff');
    const [icon, setIcon] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Category name is required');
            return;
        }
        setError('');
        const newCategory = {
            id: Date.now().toString(),
            name,
            color,
            icon
        };
        await CategoryService.addCategory(newCategory);
        setName('');
        setColor('#007bff');
        setIcon('');
        if (onCategoryAdded) onCategoryAdded();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h5>Add Category</h5>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Category name"
                className="form-control mb-1"
                required
            />
            <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="form-control form-control-color mb-1"
                title="Choose category color"
            />
            <input
                type="text"
                value={icon}
                onChange={e => setIcon(e.target.value)}
                placeholder="Icon (optional)"
                className="form-control mb-1"
            />
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <button type="submit" className="btn btn-success btn-sm">Create Category</button>
        </form>
    );
};

export default CategoryForm;
