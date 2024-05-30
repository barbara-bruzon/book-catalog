<h1 align="center">Book Catalog📘</h1>

> **Note:** For this project, a database is necessary. Be sure to have MongoDB up and running on your machine before proceeding.

## Project tree
```shell
.
├── book_catalogue
    ├── node_modules
        └── ...
    ├── src
        ├── App.css
        ├── App.tsx
        └── main.html
    └── package.json
├── node_modules
    └── ...
├── set_database
    ├── books.csv
    └── insert_books.py
├── package.json
└── server.js
```

## Requirements
- Node.js
- npm (Node Package Manager)
- MongoDB
- Python (for the `insert_books.py` script)

## Getting started
### Clone the repository:
```bash
git clone https://github.com/barbara-bruzon/catalogo-livros.git
```
### Set up the MongoDB database
Step-by-step:
1. Create a MongoDB database and a collection to save the data from `books.csv`. I chose to call them `books` and `book`, respectively.
2. Run the script by typing `python set_database/insert_books.py` in the terminal.

## Executing the backend
Begin by running `npm install` to install the project dependencies. This will create a new directory named `node_modules` with everything necessary.

To run the project backend, just type the following command in the terminal:
```
node server.js
```

The expected output is `Server running on port 3001`.

### Testing the Routes

After starting the server, you can test the following routes in your browser:

- `GET /books/:page`: fetches a list of books for the specified page.
- `GET /len`: returns the total number of books.

Examples:
```
http://localhost:3001/books/1
http://localhost:3001/len
```

## Executing the frontend
The directory named `book_catalog` is the project frontend, be sure to be inside it when running `npm install` again, creating another `node_modules` directory - but this time for the frontend.

To execute it, just type the following command in the terminal:
```bash
npm run dev
```

You will be able to see it running in your browser by going to `http://localhost:8080`

## Troubleshooting
If you have any issues during setup or execution, make sure to check the following:
-  MongoDB is up and running on your machine.
-  The database and collection names in the `server.js` script match the ones created - they should be `books` and `book` respectively.
- Required dependencies are installed (`pymongo` for Python, and Node.js dependencies via `npm install`).
- You are running the commands inside the right directories.
- Both the project backend and frontend are running.