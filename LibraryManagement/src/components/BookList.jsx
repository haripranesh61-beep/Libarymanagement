import BookCard from "./BookCard.jsx";

export default function BookList({ books, onDetails, onBorrow }) {
  if (books.length === 0) return <div className="empty-state"><span aria-hidden="true">⌕</span><h2>No books found</h2><p>Try another search term or choose a different category.</p></div>;
  return <section className="book-grid" aria-label="Book results">{books.map((book) => <BookCard key={book.id} book={book} onDetails={onDetails} onBorrow={onBorrow} />)}</section>;
}
