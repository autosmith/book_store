import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookStore.css';
import Loader from './Loader'; // Import the Loader component

const BookStore = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookData, setBookData] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const booksPerPage = 50;
  const totalPages = 5;
  const navigate = useNavigate();

  // Fetch books data from the API for the current page
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Show the loader before the API call
      try {
        const offset = (currentPage - 1) * booksPerPage;
        const url = `https://2jairybsc9.execute-api.us-east-1.amazonaws.com/stage_1/books?offset=${offset}&limit=${booksPerPage}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Assuming the API returns the books directly in an array
        if (Array.isArray(data)) {
          setBookData(data);
          setTotalBooks(data.length);
        } else {
          console.error('Unexpected data structure:', data);
          setBookData([]);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setBookData([]);
      } finally {
        setLoading(false); // Hide the loader after the data is fetched
      }
    };

    fetchBooks();
  }, [currentPage]);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedBook(null);
  };

  const handleLogout = () => {
    setIsLogoutClicked(true);
    setTimeout(() => {
      navigate('/login');
    }, 600);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="book-store">
      <h1>Online Book Archives</h1>

      {/* Logout button with animation */}
      <button
        onClick={handleLogout}
        className={`logout-button ${isLogoutClicked ? 'clicked' : ''}`}
      >
        Logout
      </button>

      {loading ? (
        <Loader /> // Show Loader when data is being fetched
      ) : (
        <>
          <div className="book-grid">
            {bookData.map((book) => (
              <div key={book._id} className="book-card" onClick={() => handleCardClick(book)}>
                <img src={book.imageUrl} alt={book.bookName} />
                <h3>{book.bookName}</h3>
              </div>
            ))}
          </div>

          {isPopupVisible && selectedBook && (
            <div className="popup-container" onClick={handleClosePopup}>
              <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <img src={selectedBook.imageUrl} alt={selectedBook.bookName} />
                <div className="popup-details">
                  <ul>
                    <li><h2>{selectedBook.bookName}</h2></li>
                    <li><p><strong>Author:</strong> {selectedBook.author}</p></li>
                    <li><p><strong>Rating:</strong> {selectedBook.rating}</p></li>
                    <li><p><strong>Genre:</strong> {selectedBook.genre}</p></li>
                    <li><p><strong>Description:</strong> {selectedBook.description}</p></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}

            <button onClick={handleNextPage} disabled={totalBooks < booksPerPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookStore;
