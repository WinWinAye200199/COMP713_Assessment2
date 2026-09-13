import { useState } from 'react';
import ProductsPage from './pages/ProductsPage';
import CustomerPage from './pages/CustomerPage';
import OrderPage from './pages/OrderPage';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('products');

  return (
    <div className="app">
      <nav className="nav">
        <button onClick={() => setActivePage('products')}>Products</button>
        <button onClick={() => setActivePage('customer')}>Customer</button>
        <button onClick={() => setActivePage('order')}>Order</button>
      </nav>

      <main className="content">
        {activePage === 'products' && <ProductsPage />}
        {activePage === 'customer' && <CustomerPage />}
        {activePage === 'order' && <OrderPage />}
      </main>
    </div>
  );
}

export default App;