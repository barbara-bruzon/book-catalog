# Book Catalogue

## Requirements
- Node.js
- npm (Node Package Manager)
- MongoDB
- Python (for the `insert_books.py` script)

## Setting up the MongoDB database
> **Note:** For this project, a database is necessary. Be sure to have MongoDB up and running on your machine before proceeding.

Step-by-step to set up the database:
1. Create a MongoDB database and a collection to save the data from `books.csv`. I chose to call them `books` and `book`, respectively.
2. Run `insert_books.py`.

If you encounter any trouble with the Python script, make sure you have installed the required `pymongo` library by typing `pip install pymongo` in the terminal. Also, ensure that you are in the correct directory.


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

## Troubleshooting
If you have any issues during setup or execution, make sure to check the following:
1. MongoDB is running on your machine.
2. The database and collection names in the code match the ones you created.
3. Required dependencies are installed (`pymongo` for Python, and Node.js dependencies via `npm install`).