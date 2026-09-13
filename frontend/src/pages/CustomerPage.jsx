import { useState, useEffect } from 'react';
import api from '../api';

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err) {
      console.error('Failed to fetch customers', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/customers', { name, phone });
      setName('');
      setPhone('');
      fetchCustomers();
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).join(', '));
      } else {
        setError('Failed to add customer.');
      }
    }
  };

  return (
    <div>
      <h2>Customer</h2>

      <form onSubmit={handleAddCustomer}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Create Customer</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} — {customer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerPage;