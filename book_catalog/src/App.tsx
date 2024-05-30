import { useEffect, useState } from "react";
import "./App.css";

interface Book {
    _id: string;
    title: string;
    author: string;
    isbn: string;
    pages: number;
    year: number;
    price: number;
}

const PAGE_SIZE = 10;

const PaginationButton = ({ onClick, label, disabled, className }: { onClick: () => void; label: string; disabled: boolean; className?: string }) => (
    <button className={`test ${className}`} disabled={disabled} onClick={onClick}>
        {label}
    </button>
);

const App = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const [booksData, totalData] = await Promise.all([fetchBooks(currentPage), fetchTotalBooks()]);
            setBooks(booksData);
            setTotalBooks(totalData.amount);
            calculateTotalPages(totalData.amount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchBooks = async (page: number): Promise<Book[]> => {
        const response = await fetch(`http://localhost:3001/books/${page}`);
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        return response.json();
    };

    const fetchTotalBooks = async () => {
        const response = await fetch(`http://localhost:3001/len`);
        if (!response.ok) {
            throw new Error("Failed to fetch total books");
        }
        return response.json();
    };

    const calculateTotalPages = (total: number) => {
        const numberOfPages = Math.ceil(total / PAGE_SIZE);
        setTotalPages(numberOfPages);
    };

    const handlePage = (value: number) => {
        setCurrentPage(value);
        setSelectedPage(value); // Definindo o botão de página selecionado
    };

    const renderPageNumbers = () => {
        const totalPagesToShow = Math.min(totalPages, 7);
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PaginationButton
                    key={i}
                    onClick={() => handlePage(i)}
                    label={i.toString()}
                    disabled={i === currentPage}
                    className={i === selectedPage ? "selected" : ""}
                />
            );
        }

        return pageNumbers;
    };

    return (
        <div className="App">
            <h1>Book Catalog</h1>
            <div className="App-table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Pages</th>
                            <th>Year</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book: Book) => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.isbn}</td>
                                <td>{book.pages}</td>
                                <td>{book.year}</td>
                                <td>R${book.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="App-pagination">
                {totalPages > 0 && (
                    <div>
                        Showing from {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                        {currentPage * PAGE_SIZE > totalBooks ? totalBooks : currentPage * PAGE_SIZE} of{" "}
                        {totalBooks} books
                    </div>
                )}
                <PaginationButton
                    onClick={() => setCurrentPage(1)}
                    label="<<"
                    disabled={currentPage <= 1}
                />
                <PaginationButton
                    onClick={() => setCurrentPage(currentPage - 1)}
                    label="<"
                    disabled={currentPage <= 1}
                />
                {renderPageNumbers()}
                <PaginationButton
                    onClick={() => setCurrentPage(currentPage + 1)}
                    label=">"
                    disabled={currentPage >= totalPages}
                />
                <PaginationButton
                    onClick={() => setCurrentPage(totalPages)}
                    label=">>"
                    disabled={currentPage >= totalPages}
                />
            </div>
        </div>
    );
};

export default App;
