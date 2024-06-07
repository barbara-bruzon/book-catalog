import pymongo
import random
import time

# Connection parameters
conn_uri = "mongodb://localhost:27017/"
db_name = "livros"

try:
    start = time.time()

    # Connect to MongoDB
    conn_mongo = pymongo.MongoClient(conn_uri)
    # Select the database and collection
    collection_mongo = conn_mongo[db_name]
    collection = collection_mongo["livro"]

    # Open the CSV file
    with open('books.csv', 'r', newline='', encoding='utf-8') as file:
        line = file.readline()

        while line:
            book_info = line.split(';')
            if (len(book_info) == 5):
                title = book_info[0]
                title = title.replace("'", "")
                author = book_info[1]
                isbn = book_info[2]
                pages = book_info[3]
                year = book_info[4]
                price = round(random.uniform(40, 100), 2)

                product = {
                    "titulo": title,
                    "autor": author,
                    "isbn": isbn,
                    "pagina": int(pages),
                    "ano": int(year.replace('\n', '')),
                    "valor": price
                }
                
                # Insert the book in the collection
                collection.insert_one(product)
            line = file.readline()

    end = time.time()

    # Prints the execution time
    time_taken = end - start
    print("Time taken:", time_taken, "seconds")

except Exception as e:
    print("An error has occurred:", e)