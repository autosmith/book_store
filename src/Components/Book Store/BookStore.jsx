import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './BookStore.css';

const BookStore = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookData, setBookData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLogoutClicked, setIsLogoutClicked] = useState(false); // <-- State to trigger animation
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Fetch books data from the API for each book
  useEffect(() => {
    const fetchBooks = async () => {
      const promises = [];
      for (let i = 1; i <= 12; i++) {
        const url = `https://2jairybsc9.execute-api.us-east-1.amazonaws.com/stage_1/books?book_id=${i}`;
        promises.push(fetch(url).then(response => response.json()));
      }
      const books = await Promise.all(promises);
      setBookData(books);
    };
    fetchBooks();
  }, []);

  // Function to handle card click (open popup)
  const handleCardClick = (book) => {
    setSelectedBook(book);
    setIsPopupVisible(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedBook(null);
  };

  // Function to handle logout and redirect to login/signup page with animation
  const handleLogout = () => {
    console.log('User logged out');
    setIsLogoutClicked(true); // Trigger animation

    // Delay redirect to match animation duration (0.6s)
    setTimeout(() => {
      navigate('/loginsignup');
    }, 600); // 600ms = 0.6s
  };

  return (
    <div className="book-store">
      <h1>Online Book Archives</h1>

      {/* Logout button with animation */}
      <button
        onClick={handleLogout}
        className={`logout-button ${isLogoutClicked ? 'clicked' : ''}`} // Add 'clicked' class if logout is triggered
      >
        Logout
      </button>

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
    </div>
  );
};

export default BookStore;
