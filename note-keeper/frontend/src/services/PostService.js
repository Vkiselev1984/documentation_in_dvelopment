const API_POSTS = 'http://localhost:4000/api/posts';
const API_IMAGES = 'http://localhost:4000/api/images';

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : '';
};

class PostService {
    async getPosts() {
        const res = await fetch(API_POSTS, {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        if (!res.ok) throw new Error('Failed to fetch posts');
        return await res.json();
    }

    async addPost(post) {
        const res = await fetch(API_POSTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(post)
        });
        if (!res.ok) throw new Error('Failed to add post');
        return await res.json();
    }

    async editPost(post) {
        const res = await fetch(`${API_POSTS}/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(post)
        });
        if (!res.ok) throw new Error('Failed to edit post');
        return await res.json();
    }

    async deletePost(id) {
        const res = await fetch(`${API_POSTS}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        if (!res.ok) throw new Error('Failed to delete post');
    }

    async getImagesByPost(postId) {
        const res = await fetch(`${API_IMAGES}/${postId}`, {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        if (!res.ok) throw new Error('Failed to fetch images');
        return await res.json();
    }

    async addImage(image) {
        const res = await fetch(API_IMAGES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(image)
        });
        if (!res.ok) throw new Error('Failed to add image');
        return await res.json();
    }
}

const instance = new PostService();
Object.freeze(instance);
export default instance;
