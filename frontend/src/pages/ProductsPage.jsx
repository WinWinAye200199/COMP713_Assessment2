import { useState, useEffect } from 'react';
import api from '../api';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/products', { name, price: parseFloat(price) });
      setName('');
      setPrice('');
      fetchProducts();
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).join(', '));
      } else {
        setError('Failed to add product.');
      }
    }
  };

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} — ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;