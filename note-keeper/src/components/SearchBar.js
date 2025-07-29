const SearchBar = ({ setSearchTerm }) => {
    return (
        <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes"
        />
    );
};

export default SearchBar;
