export default function Borrowing({ loans, onReturn, onRenew }) {
  const activeLoans = loans.filter((loan) => loan.status !== "Returned");
  return <section className="page-container inner-page"><p className="eyebrow">YOUR READING SHELF</p><h1>My borrowing</h1><p className="muted">Keep track of the books you have checked out.</p>
    {loans.length === 0 ? <div className="empty-state"><span aria-hidden="true">▤</span><h2>Your shelf is waiting</h2><p>Borrow a book and it will appear here.</p></div> : <div className="loan-list">{loans.map((loan) => <article className="loan-card" key={loan.id}><div className="loan-icon">▤</div><div className="loan-info"><h3>{loan.title}</h3><p>{loan.author}</p><span className={loan.status === "Returned" ? "availability available" : "availability"}>{loan.status}</span><small>Borrowed: {loan.borrowedOn} · Due: {loan.dueDate}</small></div><div className="loan-actions">{loan.status !== "Returned" && <><button className="button small secondary" onClick={() => onRenew(loan.id)}>Renew</button><button className="button small primary" onClick={() => onReturn(loan.id)}>Return</button></>}</div></article>)}</div>}
    <p className="muted">{activeLoans.length} active loan(s)</p>
  </section>;
}
