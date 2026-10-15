export default function CategoryFilter({ categories, category, setCategory }) {
  return <div className="category-row"><label htmlFor="category-filter">Category</label><select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item} value={item}>{item === "All" ? "All categories" : item}</option>)}</select></div>;
}
