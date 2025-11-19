import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productService';

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProducts()
      .then(res => {
        setItems(Array.isArray(res) ? res : []);
      })
      .catch(() => setError('Không thể tải danh sách sản phẩm'));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa?')) return;

    try {
      await deleteProduct(id);
      setItems(items.filter(item => item.id !== id));
      setSuccessMsg('Xóa thành công');
      setError('');
    } catch (err) {
      setError('Lỗi khi xóa sản phẩm');
      setSuccessMsg('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách Sản phẩm</h2>

      {error && <div data-testid="error-message" style={{color: 'red', marginBottom: 10}}>{error}</div>}
      {successMsg && <div data-testid="success-message" style={{color: 'green', marginBottom: 10}}>{successMsg}</div>}

      {/* Danh sách sản phẩm */}
      <ul data-testid="product-list">
        {items.map(p => (
          <li key={p.id} data-testid="product-item" style={{marginBottom: 10, padding: 5, borderBottom: '1px solid #eee'}}>
            <strong>{p.name}</strong> - {p.price.toLocaleString()} VNĐ

            <button
              onClick={() => handleDelete(p.id)}
              data-testid={`delete-btn-${p.id}`}
              style={{marginLeft: 15, color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer'}}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>

      {items.length === 0 && <p>Chưa có sản phẩm nào.</p>}
    </div>
  );
}