import { useState, useEffect } from 'react';
import api from '../api';

function OrderPage() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [customersRes, productsRes, ordersRes] = await Promise.all([
        api.get('/customers'),
        api.get('/products'),
        api.get('/orders'),
      ]);
      setCustomers(customersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/orders', {
        customerId: parseInt(customerId),
        productId: parseInt(productId),
        quantity: parseInt(quantity),
      });
      setCustomerId('');
      setProductId('');
      setQuantity('');
      fetchAll();
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).join(', '));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to place order.');
      }
    }
  };

  return (
    <div>
      <h2>Order</h2>

      <form onSubmit={handlePlaceOrder}>
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — ${p.price.toFixed(2)}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button type="submit">Place Order</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Order History</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.customer.name} ordered {order.quantity} × {order.product.name} = $
            {order.totalPrice.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderPage;