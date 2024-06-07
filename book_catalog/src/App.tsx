import { useEffect, useState } from "react";
import "./App.css";

interface Book {
    _id: string;
    titulo: string;
    autor: string;
    isbn: string;
    paginas: number;
    ano: number;
    valor: number;
}

const PAGE_SIZE = 10;

const PaginationButton = ({ onClick, label, disabled, className }: { onClick: () => void; label: string; disabled: boolean; className?: string }) => (
    <button className={`test ${className}`} disabled={disabled} onClick={onClick} style={{ cursor: disabled ? "not-allowed" : "pointer", backgroundColor: disabled ? "#777777" : "grey" }}>
        {label}
    </button>
);

const App = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
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
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage;
        let endPage;
    
        if (currentPage === 1) {
            startPage = 1;
            endPage = Math.min(totalPages, startPage + 3);
        } else if (currentPage === 2) {
            startPage = 1;
            endPage = Math.min(totalPages, startPage + 4);
        } else if (currentPage === 3) {
            startPage = 1;
            endPage = Math.min(totalPages, startPage + 5);
        } else {
            startPage = Math.max(1, currentPage - 3);
            endPage = Math.min(totalPages, startPage + 6);
        }
    
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PaginationButton
                    key={i}
                    onClick={() => handlePage(i)}
                    label={i.toString()}
                    disabled={i === currentPage}
                    className={i === currentPage ? "selected" : ""}
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
                                <td>{book.titulo}</td>
                                <td>{book.autor}</td>
                                <td>{book.isbn}</td>
                                <td>{book.paginas}</td>
                                <td>{book.ano}</td>
                                <td>R${book.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="App-pagination">
                Showing from {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, totalBooks)} books
            </div>
            <div className="App-pagination">
                <>
                    <PaginationButton
                        onClick={() => setCurrentPage(1)}
                        label="<<"
                        disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "disabled" : ""}
                    />
                    <PaginationButton
                        onClick={() => setCurrentPage(currentPage - 1)}
                        label="<"
                        disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "disabled" : ""}
                    />
                </>
                {renderPageNumbers()}
                <>
                    <PaginationButton
                        onClick={() => setCurrentPage(currentPage + 1)}
                        label=">"
                        disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "disabled" : ""}
                    />
                    <PaginationButton
                        onClick={() => setCurrentPage(totalPages)}
                        label=">>"
                        disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "disabled" : ""}
                    />
                </>
            </div>
        </div>
    );
};

export default App;