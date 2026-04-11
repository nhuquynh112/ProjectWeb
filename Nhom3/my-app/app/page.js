async function getProducts() {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shirts",
    {
      cache: "no-store", // SSR mỗi lần F5
    }
  );

  const data = await res.json();
  return data.products;
}

export default async function Home() {
  const products = await getProducts();

  // random 1 sản phẩm
  const randomIndex = Math.floor(Math.random() * products.length);
  const product = products[randomIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
        <h1 className="text-xl font-bold mb-4">
          Fashion Trending 2026
        </h1>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg"
        />

        <p className="text-gray-500 mt-2 text-sm">
          New Arrival
        </p>

        <h2 className="font-semibold mt-1">
          {product.title}
        </h2>

        <p className="text-red-500 font-bold mt-2">
          ${product.price}
        </p>

        <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg w-full">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}