export default function SearchBar({ query, setQuery }) {
  return <div className="search-wrap"><label htmlFor="book-search">Search by title or author</label><div className="search-control"><span aria-hidden="true">⌕</span><input id="book-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “Atomic Habits” or an author name" /></div></div>;
}
