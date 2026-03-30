import StockCounter from "../../components/StockCounter";


async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    
    return <h1>Product Not Found</h1>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      {/* Interactive Stock */}
      <StockCounter initialStock={5} />
    </div>
  );
}