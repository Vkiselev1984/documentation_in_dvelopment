import PostItem from './PostItem';

const PostList = ({ posts, onDeletePost, onEditPost, categories }) => {
    return (
        <ul className="list-group">
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    post={post}
                    onDeletePost={onDeletePost}
                    onEditPost={onEditPost}
                    categories={categories}
                />
            ))}
        </ul>
    );
};

export default PostList;
