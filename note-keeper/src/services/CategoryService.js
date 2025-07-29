const API_URL = 'http://localhost:4000/api/categories';

class CategoryService {
    async getCategories() {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch categories');
        return await res.json();
    }

    async addCategory(category) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });
        if (!res.ok) throw new Error('Failed to add category');
        return await res.json();
    }

    async editCategory(category) {
        const res = await fetch(`${API_URL}/${category.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });
        if (!res.ok) throw new Error('Failed to edit category');
        return await res.json();
    }

    async deleteCategory(id) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete category');
    }
}

const instance = new CategoryService();
Object.freeze(instance);
export default instance;
