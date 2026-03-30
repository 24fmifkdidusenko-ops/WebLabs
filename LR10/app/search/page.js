export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const res = await fetch("https://fakestoreapi.com/products");
  const allProducts = await res.json();

  const results = allProducts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Search results for "{query}"</h1>
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}