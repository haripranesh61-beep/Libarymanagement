export default function Home({ setPage }) {
  return <>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h1>Stories open<br />new <em>worlds.</em></h1><p className="hero-description">Discover thoughtful reads, borrow your favourites, and keep your reading life in one simple place.</p><button className="button primary" onClick={() => setPage("books")}>Explore books <span aria-hidden="true">↗</span></button><div className="hero-stats"><div><strong>2,400+</strong><span>Books to discover</span></div><div><strong>Easy</strong><span>Borrowing tracking</span></div></div></div>
      <div className="hero-art" aria-label="Decorative book illustration"><div className="sun"></div><div className="book book-one"><span>THE ART OF<br/>SLOW LIVING</span></div><div className="book book-two"><span>WILD<br/>MINDS</span></div><div className="book book-three"><span>THE<br/>GARDEN<br/>WITHIN</span></div><div className="plant">✳</div></div>
    </section>
    <section className="home-bottom"><div><p className="eyebrow">A LITTLE MORE YOU</p><h2>Make room for a good book.</h2></div><button className="button secondary" onClick={() => setPage("member")}>View member profile <span aria-hidden="true">→</span></button></section>
  </>;
}
