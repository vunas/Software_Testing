import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import ProductForm from "./ProductForm";
import ProductDetail from "./ProductDetail";

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewingId, setViewingId] = useState(null);

  // --- Pagination State ---
  const [page, setPage] = useState(0); // Trang hiện tại (bắt đầu từ 0)
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const pageSize = 2; // Số lượng sản phẩm mỗi trang

  // Load lại khi page thay đổi
  useEffect(() => {
    loadProducts();
  }, [page]); 

  const loadProducts = () => {
    // Truyền page và size xuống API
    getProducts(page, pageSize)
      .then((res) => {
        // Xử lý response từ Spring Page
        console.log("res: ", res)
        if (res && Array.isArray(res.content)) {
          setItems(res.content);
          setTotalPages(res.totalPages || 0);
        } else if (Array.isArray(res)) {
           // Fallback nếu API trả về list thuần (không phân trang)
           setItems(res);
           setTotalPages(1); 
        } else {
          setItems([]);
        }
      })
      .catch(() => setError("Không thể tải danh sách sản phẩm"));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await deleteProduct(id);
      // Load lại trang hiện tại để cập nhật danh sách
      loadProducts(); 
      setSuccessMsg("Xóa thành công!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Lỗi khi xóa sản phẩm.");
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSuccess = () => {
    loadProducts(); // Tải lại trang hiện tại
    setEditingId(null);
  };

  // --- Pagination Handlers ---
  const handlePrev = () => {
    if (page > 0) setPage(p => p - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(p => p + 1);
  };

  // --- STYLES ---
  const styles = {
    // ... (Giữ nguyên các style cũ) ...
    wrapper: { maxWidth: "800px", margin: "40px auto", fontFamily: "'Segoe UI', sans-serif" },
    container: { padding: "20px", backgroundColor: "#f9fafb", borderRadius: "12px", minHeight: "400px", marginTop: "30px" },
    header: { textAlign: "center", color: "#1f2937", fontSize: "28px", marginBottom: "30px", fontWeight: "700" },
    list: { listStyle: "none", padding: 0, margin: 0 },
    item: { display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", padding: "20px", marginBottom: "15px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", borderLeft: "4px solid #3b82f6" },
    info: { display: "flex", flexDirection: "column", gap: "5px" },
    name: { fontSize: "18px", fontWeight: "600", color: "#111827" },
    price: { color: "#059669", fontWeight: "500", fontSize: "16px" },
    actions: { display: "flex", gap: "8px" },
    btn: { border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "white", transition: "opacity 0.2s" },
    viewBtn: { backgroundColor: "#8b5cf6" },
    editBtn: { backgroundColor: "#f59e0b" },
    deleteBtn: { backgroundColor: "#ef4444" },
    alert: { padding: "12px 16px", borderRadius: "6px", marginBottom: "20px", textAlign: "center" },
    alertError: { backgroundColor: "#fee2e2", color: "#991b1b" },
    alertSuccess: { backgroundColor: "#d1fae5", color: "#065f46" },
    emptyState: { textAlign: "center", color: "#6b7280", marginTop: "40px" },
    modalBackdrop: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" },
    modalContent: { backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)", width: "90%", maxWidth: "500px", position: "relative", animation: "fadeIn 0.3s ease-out" },
    closeModalBtn: { position: "absolute", top: "10px", right: "15px", background: "none", border: "none", fontSize: "28px", cursor: "pointer", color: "#9ca3af", fontWeight: "bold" },

    // --- STYLE MỚI CHO PAGINATION ---
    pagination: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        marginTop: "20px",
        paddingTop: "20px",
        borderTop: "1px solid #e5e7eb"
    },
    pageBtn: {
        padding: "8px 16px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        cursor: "pointer",
        fontWeight: "600",
        color: "#374151",
        transition: "all 0.2s"
    },
    pageBtnDisabled: {
        opacity: 0.5,
        cursor: "not-allowed",
        backgroundColor: "#f3f4f6"
    },
    pageInfo: {
        fontWeight: "500",
        color: "#4b5563"
    }
  };

  return (
    <div style={styles.wrapper}>
      <ProductForm productIdToEdit={editingId} onSuccess={handleFormSuccess} />

      {/* Modal */}
      {viewingId && (
        <div style={styles.modalBackdrop} onClick={() => setViewingId(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeModalBtn} onClick={() => setViewingId(null)}>&times;</button>
            <ProductDetail productId={viewingId} />
          </div>
        </div>
      )}

      <div style={styles.container}>
        <h2 style={styles.header}>Danh sách Sản phẩm</h2>

        {error && <div data-testid="error-message" style={{...styles.alert, ...styles.alertError}}>{error}</div>}
        {successMsg && <div data-testid="success-message" style={{...styles.alert, ...styles.alertSuccess}}>{successMsg}</div>}

        <ul data-testid="product-list" style={styles.list}>
          {items.map((p) => (
            <li key={p.id} data-testid="product-item" style={styles.item}>
              <div style={styles.info}>
                <span style={styles.name}>{p.name}</span>
                <span style={styles.price}>{p.price ? p.price.toLocaleString() : 0} VNĐ</span>
              </div>
              <div style={styles.actions}>
                 <button onClick={() => setViewingId(p.id)} data-testid={`view-btn-${p.id}`} style={{...styles.btn, ...styles.viewBtn}}>Chi tiết</button>
                 <button onClick={() => handleEdit(p.id)} data-testid={`edit-btn-${p.id}`} style={{...styles.btn, ...styles.editBtn}}>Sửa</button>
                 <button onClick={() => handleDelete(p.id)} data-testid={`delete-btn-${p.id}`} style={{...styles.btn, ...styles.deleteBtn}}>Xóa</button>
              </div>
            </li>
          ))}
        </ul>
        
        {items.length === 0 && <p style={styles.emptyState}>Chưa có sản phẩm nào.</p>}

        {/* --- THANH PHÂN TRANG --- */}
        {totalPages > 1 && (
            <div style={styles.pagination} data-testid="pagination-controls">
                <button 
                    style={{...styles.pageBtn, ...(page === 0 ? styles.pageBtnDisabled : {})}}
                    onClick={handlePrev}
                    disabled={page === 0}
                >
                    &laquo; Trước
                </button>
                
                <span style={styles.pageInfo}>
                    Trang {page + 1} / {totalPages}
                </span>
                
                <button 
                    style={{...styles.pageBtn, ...(page >= totalPages - 1 ? styles.pageBtnDisabled : {})}}
                    onClick={handleNext}
                    disabled={page >= totalPages - 1}
                    data-testid="next-btn"
                >
                    Sau &raquo;
                </button>
            </div>
        )}

      </div>
    </div>
  );
}