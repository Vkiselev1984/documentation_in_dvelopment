// src/models/Category.js

class Category {
    constructor(id, name, color, icon = '', description = '') {
        this.id = id;
        this.name = name;
        this.color = color;
        this.icon = icon;
        this.description = description;
    }
}

export default Category;
