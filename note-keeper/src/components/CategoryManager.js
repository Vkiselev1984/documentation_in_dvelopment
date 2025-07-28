import { useState, useEffect } from 'react';
import CategoryService from '../services/CategoryService';

const CategoryManager = ({ categories = [], onCategoryChange }) => {
    const [editingCategory, setEditingCategory] = useState(null);
    const [editName, setEditName] = useState('');
    const [editColor, setEditColor] = useState('#007bff');
    const [editIcon, setEditIcon] = useState('');

    
    const handleEditClick = (cat) => {
        setEditingCategory(cat);
        setEditName(cat.name);
        setEditColor(cat.color);
        setEditIcon(cat.icon || '');
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        if (!editName.trim()) return;
        const updated = { ...editingCategory, name: editName, color: editColor, icon: editIcon };
        await CategoryService.editCategory(updated);
        setEditingCategory(null);
        if (onCategoryChange) onCategoryChange();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this category?')) {
            await CategoryService.deleteCategory(id);
            if (onCategoryChange) onCategoryChange();
        }
    };


    return (
        <div className="mb-3">
            <h5>Manage Categories</h5>
            <ul className="list-group">
                {categories.map(cat => (
                    <li key={cat.id} className="list-group-item d-flex align-items-center justify-content-between">
                        <span style={{ background: cat.color, color: '#fff', borderRadius: '12px', padding: '2px 10px', marginRight: 8 }}>
                            {cat.icon ? cat.icon + ' ' : ''}{cat.name}
                        </span>
                        <div>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditClick(cat)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {editingCategory && (
                <form onSubmit={handleEditSave} className="mt-2">
                    <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="form-control mb-1" required />
                    <input type="color" value={editColor} onChange={e => setEditColor(e.target.value)} className="form-control form-control-color mb-1" />
                    <input type="text" value={editIcon} onChange={e => setEditIcon(e.target.value)} className="form-control mb-1" placeholder="Icon (optional)" />
                    <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingCategory(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default CategoryManager;
