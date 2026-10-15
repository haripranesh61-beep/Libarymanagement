export default function BookCard({ book, onDetails, onBorrow }) {
  return <article className="book-card">
    <button className="cover-button" onClick={() => onDetails(book)} aria-label={`View details for ${book.title}`}><img src={book.cover} alt={`Cover artwork for ${book.title}`} loading="lazy" decoding="async" /></button>
    <div className="book-card-body"><span className="book-category">{book.category}</span><h3>{book.title}</h3><p className="book-author">by {book.author}</p><div className="book-meta"><span>{book.year}</span><span className={book.available ? "availability available" : "availability unavailable"}>{book.available ? "Available" : "On loan"}</span></div><div className="card-actions"><button className="button small secondary" onClick={() => onDetails(book)}>Details</button><button className="button small primary" disabled={!book.available} onClick={() => onBorrow(book)}>{book.available ? "Borrow" : "Unavailable"}</button></div></div>
  </article>;
}
