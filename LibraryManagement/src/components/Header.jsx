export default function Header({ page, setPage }) {
  const links = [["home", "Home"], ["books", "Books"], ["borrowing", "My Borrowing"], ["member", "Member Profile"]];
  return <header className="header">
    <button className="brand" onClick={() => setPage("home")} aria-label="LibraryHub home"><span className="brand-mark">L</span><span>Library<span className="brand-light">Hub</span></span></button>
    <nav aria-label="Main navigation">
      {links.map(([key, label]) => <button key={key} className={page === key ? "nav-link active" : "nav-link"} aria-current={page === key ? "page" : undefined} onClick={() => setPage(key)}>{label}</button>)}
    </nav>
  </header>;
}
