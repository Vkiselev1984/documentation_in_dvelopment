
const CategoryFilter = ({ setSelectedCategory }) => {
    return (
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
        </select>
    );
};

export default CategoryFilter;