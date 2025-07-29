# NoteKeeper Documentation

## 1. Overview

NoteKeeper is a web application for creating, editing, deleting, and searching notes with user-defined categories. It consists of a React frontend and a Node.js (Express) backend API with SQLite database. Notes and categories are stored persistently in the database and accessed via REST API.

## 2. Main Features

The main features of the application are:

- Manage notes: Users can add new notes, edit existing ones, and delete them. Each note contains a title, content, and belongs to a certain category.

- Categories: The application allows you to create and manage categories to which notes can be assigned. Each category has a unique name, color, and (optionally) an icon.

- Filter notes: Users can filter notes by category, making it easier to find and organize information.

- Upload images: When creating or editing a note, users can upload images to be associated with a specific note.

- Database management: The application provides an interface for managing data in the database, including viewing and editing records in tables such as notes, categories, and images.

- Navigation: The application uses React Router to organize navigation between different pages, such as adding a note, managing categories, and browsing the database.

### Technologies

1. React: The main library for building user interfaces. React allows you to break the interface into components, making it easier to develop and maintain code.

2. React DOM: A library that allows React to interact with the DOM (Document Object Model) of the browser.

3. React Router: Used to manage the routing in the application, allowing users to navigate between different pages, such as adding a note, managing categories, and browsing a database.

4. Bootstrap: A CSS framework that provides ready-made styles and components for quickly creating a responsive and beautiful interface.

5. Express: A web framework for Node.js that is used to create a server and handle requests to RESTful APIs.

6. CORS (Cross-Origin Resource Sharing): A package for setting up CORS on the server, allowing browsers to make requests to resources from other domains.

7. Multer: Middleware for handling multipart/form-data, which allows you to upload files to the server (for example, images for notes).

8. @testing-library: A suite of tools for testing React components. Lets you write tests that simulate user interactions with the UI.

9. web-vitals: A library for measuring the performance of web applications, including important metrics like load time, time to first render, and more.

10. React Scripts: A set of scripts that makes it easy to set up and run React applications, including commands for building, testing, and running the application.

## User Scenarios (Use Cases)

### Add and edite Note

- The user clicks the Add note button, after which a special form for filling in the required post details is displayed on the screen

![add post](./img/add_post.png)

- The user enters the title and content in the form
- The user clicks the add image button, after which a dialog box opens for selecting an image from the user's computer

![add image](./img/add_image.png)

- The user selects the post category
- The user clicks "Add note".
- The post appears in the posts section

![posts](./img/posts.png)

- The user can edit the post by clicking the Edit button on the Posts page or the Database page
- The user changes the title, content, and image.
- The user clicks the Save or Cancel button to save or discard the changes

### Add Category

- The user selects the Categories section

![add category](./img/add_category.png)

- The user enters the name, color, and icon
- The user clicks the Create Category button and the added category is displayed on the page.
- In the Manage Categories block, the user can edit the desired category by clicking the Edit button opposite its name. Editing fields will be displayed under all categories.

![edit category](./img/edit_category.png)

- After making changes to the category being edited, the user clicks the Save button to save the changes or the Cancel button to cancel them. The changes will be displayed in the edited category.
- The user can delete a category by clicking the Delete button opposite its name. The category will be removed from the list of categories.

### Database manager

- The user presses the Database button, the active tab with the table of posts will be displayed on the screen

![database manager](./img/database.png)

- The user selects a tab (posts, categories, images), the corresponding table will be displayed on the screen

![database categories](./img/database_categories.png)

- The user presses the edit button opposite the table name, the row becomes editable
- The user makes changes to the corresponding fields and presses the Save or Cancel button to save or cancel the changes

## Application Architecture

- **Frontend:** React (App, NoteForm, NoteList, NoteItem, CategoryManager, etc.)
- **Backend:** Node.js + Express + SQLite (server.js)
- **Data storage:** SQLite database (`note-keeper.db`)
- **Communication:** REST API (JSON)

The application is built on top of React components and uses an architectural approach based on separation into layers and components. The main layers include:

User Interface (UI) Components: These are the visual elements that are displayed to the user. They are responsible for displaying data and interacting with the user. Examples of such components:

- PostForm: A form for adding or editing notes.
- PostList: A list of notes displayed to the user.
- CategoryForm: A form for adding a new category.
- CategoryManager: A component for managing existing categories.

### Services

These are the layers that deal with interaction with the API and data management. They provide an abstraction for working with data, allowing components to focus on display and interaction. Examples of services:

- PostService: Handles requests to the notes API (getting, creating, editing, and deleting notes).
- CategoryService: Handles requests to the categories API.

### Routing

Used to manage navigation around the application. react-router-dom allows you to define routes and render the appropriate components based on the URL. For example, when navigating to /add-post, a form for adding a post is displayed.

### How classes and components interact

Now let's look at how the different components and services interact with each other:

1. Getting data

When the application loads (in the App component), the fetchAll method is called, which calls the PostService and CategoryService services to get all the posts and categories. This data is stored in the component's state using useState.

2. Adding a post

When the user fills out the add post form (PostForm) and submits it, the handleAddPost function is called, which uses the PostService to add the new post to the server. After the post is successfully added, the data is updated, causing all the posts to be fetched again.

3. Editing and deleting posts

When editing a post (via the "Edit" button in the PostList), the editingPost state is set, which is passed to the PostForm. When the form is submitted, the handleEditPost method is called, which updates the note via the PostService.

To delete a note, handleDeletePost is called, which uses the PostService to delete the note and updates the list of notes.

4. Managing Categories

The user can add new categories via CategoryForm. Once a category is added, handleCategoryChange is called, which updates the list of categories by retrieving them again from the CategoryService.
In CategoryManager, users can edit and delete existing categories using the same methods as for notes.

5. Filtering Notes:

PostList implements the ability to filter notes by category. When the user selects a category, the categoryFilter state is set and the list of notes is updated with the selected category.

### Architecture Decisions

1. Component-Based Approach: The application is broken down into small, reusable components, making it easier to maintain and test.

2. State and Data Management: Use useState and useEffect to manage the state and lifecycle of components. This allows components to respond to data changes and update the UI.

3. API Services: Services abstract the logic of interacting with the API, making the component code cleaner and more understandable.

4. Routing: Using react-router-dom to manage navigation, allowing users to easily navigate between different parts of the application.

5. Error Handling: The application implements basic error handling when interacting with the API, which helps users understand if something went wrong.

### Using SQL in the application

The application uses SQLite as a database to store notes and categories data. SQLite is a lightweight, embedded database, ideal for small applications and development.
API for working with the database:

The application implements a RESTful API that allows you to interact with the database via HTTP requests. Server routes handle requests for creating, reading, updating, and deleting (CRUD) records in the database.

For example, the following routes can be used to work with notes:

- GET /api/posts — get all notes.
- POST /api/posts — add a new note.
- PUT /api/posts/:id — update an existing note.
- DELETE /api/posts/:id — delete a note.

### Services for working with the database

Services such as PostService and CategoryService implement methods that send requests to the API. These methods can be implemented using SQL queries on the server that interact with the database.

For example, the getPosts method in the PostService might send an HTTP request to the GET /api/posts route, which on the server executes the SQL query SELECT \* FROM posts; to retrieve all posts.

### Server-side logic

The server-side portion of the application, written in Node.js using Express, processes requests from the client and executes the corresponding SQL queries to the database.
For example, when a request is received to add a new post, the server might execute the SQL query INSERT INTO posts (title, content, categoryId) VALUES (?, ?, ?); to save the new post to the database.

### Working with images

Uploading images for posts can also use SQL queries to save links to the images in the database. For example, after an image is uploaded to the server, its URL can be stored in an images table associated with a specific post.
Example of interaction with the database

**Getting all notes**

The user opens the page with the list of notes.
The PostList component calls the getPosts method from PostService.
PostService sends a GET request to the API (/api/posts).
The server processes the request, executes the SELECT \* FROM posts; SQL query, and returns the data to the client.
The component updates its state and displays the received notes.

**Adding a new note**

The user fills out the form and clicks the "Add" button.
PostForm calls the addPost method from PostService.
PostService sends a POST request to the API (/api/posts) with the note data.
The server executes the INSERT INTO posts (title, content, categoryId) VALUES (?, ?, ?); SQL query, adding a new note to the database.
After successfully adding a note, the component updates the list of notes.

## 3. Data Model & Database Structure

### Note

The Note model is the core entity of the application, containing information about each note created by the user. Notes can contain text, images, and belong to a specific category. The main fields of the Note model are:

- id: A unique identifier for the note. Typically generated automatically (e.g. using a UUID or timestamp).
- title: The title of the note. This field is required and should be descriptive so that users can quickly understand the content of the note.
- content: The main content of the note. This is a text field that stores the information the user wants to record.
- categoryId: The identifier of the category the note belongs to. This field associates the note with a specific category, allowing users to filter notes by category.
- createdAt: The date and time the note was created. This field allows you to track when the note was last created.
- updatedAt: The date and time the note was last updated. This field is useful for displaying to the user when the note was last modified.

### Category

The Category model is an entity that organizes notes into logical groups. Each category can have unique attributes, such as color and icon, which helps users visually distinguish between categories. The main fields of the Category model are:

- id: Unique identifier of the category. Generated automatically, similar to the note ID.
- name: Name of the category. This is a required field and should be informative and descriptive, such as "Work", "Personal", "Study".
- color: Color of the category, which can be represented in HEX format. This field allows users to visually distinguish between categories, which makes the interface more convenient.
- icon: Category icon (optional). This field can contain a symbol or image representing the category, which also helps in visualization.
- description: Category description (optional). This field can contain additional information about the category, which can be useful for users.

### Image

The Image model is used to store information about uploaded images associated with posts. The main fields of the Image model are:

- id: Unique image identifier (TEXT type). This field is used as a primary key and must be unique for each image.
- postId: The ID of the post to which the image belongs (TEXT type). This field is a foreign key referencing the posts table. If a post is deleted, all images associated with it will also be deleted due to the ON DELETE CASCADE.
- imageUrl: Image URL (TEXT type). This is a required field that stores a link to the uploaded image.

### SQLite Table Definitions

- The SQLite database file is named **`note-keeper.db`** and is located in the root directory of your project.
- This file is created and managed automatically by the backend server (`server.js`). You do not need to create it manually.

1. Categories table

```sql
CREATE TABLE IF NOT EXISTS categories (
id TEXT PRIMARY KEY,
name TEXT NOT NULL,
color TEXT NOT NULL,
icon TEXT,
description TEXT
);
```

- id: Unique category identifier (TEXT).
- name: Category name (TEXT, required).
- color: Category color (TEXT, required).
- icon: Category icon (TEXT, optional).
- description: Category description (TEXT, optional).

2. Posts table

```sql
CREATE TABLE IF NOT EXISTS posts (
id TEXT PRIMARY KEY,
title TEXT NOT NULL,
content TEXT NOT NULL,
categoryId TEXT NOT NULL,
FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

- id: Unique ID of the post (TEXT).
- title: Post title (TEXT, required).
- content: Post content (TEXT, required).
- categoryId: Category ID (TEXT, required), foreign key referencing categories(id).

3. Images table

```sql
CREATE TABLE IF NOT EXISTS images (
id TEXT PRIMARY KEY,
postId TEXT NOT NULL,
imageUrl TEXT NOT NULL,
FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

- id: Unique ID of the image (TEXT).
- postId: Post ID (TEXT, required), foreign key referencing posts(id).
- imageUrl: Image URL (TEXT, required).

#### **How to View, Edit, and Manage the Database**

##### **In the Browser (Recommended)**

- Go to the **Database** page in the app (see navigation menu).
- You can:
  - **View**: See all records in `posts`, `categories`, and `images` tables.
  - **Edit**: Click "Edit" next to a record, modify fields (except `id`), and click "Save".
  - **Delete**: Click "Delete" to remove a record. Deletion is immediate after confirmation.
  - **Switch tables**: Use the buttons at the top to switch between posts, categories, and images.
  - **All changes are reflected instantly in the SQLite file.**

##### **Using DB Browser for SQLite**

- [Download DB Browser for SQLite](https://sqlitebrowser.org/)
- Open `note-keeper.db` to:
  - Browse, edit, add, or delete records visually.
  - Export tables to CSV, JSON, or SQL.
  - Run custom SQL queries.
  - View table structure and relationships.

##### **Using SQLiteStudio**

- [Download SQLiteStudio](https://sqlitestudio.pl/)
- Similar features to DB Browser for SQLite.

##### **Using VS Code SQLite Extensions**

- Install extensions like "SQLite Viewer" or "SQLite" in VS Code.
- Open `note-keeper.db` directly in the editor.
- Browse, edit, and run queries without leaving your IDE.

##### **Using Command Line (CLI)**

```sh
sqlite3 note-keeper.db
.tables
.schema posts
SELECT * FROM posts;
SELECT * FROM categories;
SELECT * FROM images;
.exit
```

- Use `.headers on` and `.mode column` for better output formatting.
- Use `.schema` to see table definitions.

## 4. API Documentation

See [openapi.yaml](./openapi.yaml) for the full OpenAPI/Swagger specification.

Server exposes several API endpoints for working with categories, notes, and images. Here is a brief description of some of them:

#### **API Endpoints for Database Access and Management**

- **Read (GET):**

  - `/api/db/posts` — get all posts
  - `/api/db/categories` — get all categories
  - `/api/db/images` — get all images

- **Delete (DELETE):**

  - `/api/db/:table/:id` — delete a record by id from the specified table (`posts`, `categories`, `images`)

- **Update (PUT):**

  - `/api/db/:table/:id` — update a record by id in the specified table.  
    Send a JSON object with the fields to update (except `id`).

- **Create (POST):**

  - Posts, categories, and images are created via their respective API endpoints in the app (see openapi.yaml for details).

- **Advanced:**
  - You can add your own endpoints for custom queries, batch operations, or analytics.

#### **Data Relationships and Integrity**

- **Each post must belong to a category** (`categoryId` is a foreign key).
- **Each image must belong to a post** (`postId` is a foreign key).
- **Deleting a category will delete all related posts and their images.**
- **Deleting a post will delete all related images.**

#### **Best Practices**

- Always back up your `note-keeper.db` file before making bulk changes.
- Use the browser interface for quick edits and the desktop tools for advanced operations.
- Use unique string IDs (e.g., `Date.now().toString()` or UUID) for all records.

#### **Troubleshooting**

- **No tables?**  
  Make sure the server has run at least once and you are in the correct folder.
- **Failed to fetch table?**  
  Check that the backend server is running and the endpoints are available.
- **Foreign key errors?**  
  Make sure referenced records exist (e.g., don't delete a category that is still used by posts).
- **Data not updating?**  
  Refresh the browser page or restart the server after making changes outside the app.

#### **Extending Functionality**

- Add new tables for tags, comments, or user accounts.
- Implement full-text search or filtering in the browser.
- Add export/import features for backup and migration.
- Integrate with cloud storage for images.

## 5. How to Run

### Backend

1. Install dependencies:
   ```
   npm install express cors sqlite3
   ```
2. Start the server:
   ```
   node server.js
   ```
   Server runs on http://localhost:4000

### Frontend

1. Install dependencies:
   ```
   npm install
   ```
2. Start the app:
   ```
   npm start
   ```
   App runs on http://localhost:3000
