import { lazy, Suspense, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import BookList from "./components/BookList.jsx";
import Borrowing from "./components/Borrowing.jsx";
import Footer from "./components/Footer.jsx";
import { initialBooks } from "./data/books.js";

const BookDetails = lazy(() => import("./components/BookDetails.jsx"));
const MemberProfile = lazy(() => import("./components/MemberProfile.jsx"));

export default function App() {
  const [page, setPage] = useState("home");
  const [books, setBooks] = useState(initialBooks);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedBook, setSelectedBook] = useState(null);
  const [member, setMember] = useState({ name: "Alex Morgan", email: "alex@example.com", memberId: "LIB-1042" });
  const [loans, setLoans] = useState([]);
  const [notice, setNotice] = useState("");

  const categories = useMemo(() => ["All", ...new Set(books.map((book) => book.category))], [books]);
  const filteredBooks = useMemo(() => books.filter((book) => {
    const search = query.trim().toLowerCase();
    const matchesText = book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search);
    return matchesText && (category === "All" || book.category === category);
  }), [books, query, category]);

  function borrowBook(book) {
    if (!book.available) {
      setNotice("This book is currently unavailable.");
      return;
    }
    setBooks((current) => current.map((item) => item.id === book.id ? { ...item, available: false } : item));
    setLoans((current) => [...current, { ...book, borrowedOn: new Date().toLocaleDateString(), dueDate: "In 14 days", status: "Borrowed" }]);
    setNotice(`“${book.title}” has been borrowed successfully.`);
    setPage("borrowing");
  }

  function returnBook(id) {
    setLoans((current) => current.map((loan) => loan.id === id ? { ...loan, status: "Returned" } : loan));
    setBooks((current) => current.map((book) => book.id === id ? { ...book, available: true } : book));
    setNotice("Book returned successfully.");
  }

  function renewBook(id) {
    setLoans((current) => current.map((loan) => loan.id === id && loan.status === "Borrowed" ? { ...loan, dueDate: "Extended by 14 days", status: "Renewed" } : loan));
    setNotice("Borrowing period renewed.");
  }

  return (
    <div className="app-shell">
      <Header page={page} setPage={setPage} />
      {notice && <div className="notice" role="status">{notice}<button aria-label="Dismiss notification" onClick={() => setNotice("")}>×</button></div>}
      {page === "home" && <Home setPage={setPage} />}
      {page === "books" && <main className="page-container">
        <div className="page-heading"><p className="eyebrow">THE COLLECTION</p><h1>Explore the library</h1><p>Find your next great read.</p></div>
        <SearchBar query={query} setQuery={setQuery} />
        <CategoryFilter categories={categories} category={category} setCategory={setCategory} />
        <p className="result-count" aria-live="polite">{filteredBooks.length} book(s) found</p>
        <BookList books={filteredBooks} onDetails={(book) => { setSelectedBook(book); setPage("details"); }} onBorrow={borrowBook} />
      </main>}
      {page === "details" && <main className="page-container"><Suspense fallback={<p role="status">Loading book details…</p>}><BookDetails book={selectedBook} onBack={() => setPage("books")} onBorrow={borrowBook} /></Suspense></main>}
      {page === "borrowing" && <main className="page-container"><Borrowing loans={loans} onReturn={returnBook} onRenew={renewBook} /></main>}
      {page === "member" && <main className="page-container"><Suspense fallback={<p role="status">Loading member profile…</p>}><MemberProfile member={member} setMember={setMember} /></Suspense></main>}
      <Footer />
    </div>
  );
}
