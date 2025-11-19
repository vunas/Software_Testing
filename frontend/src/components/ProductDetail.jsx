import React, { useState, useEffect } from "react";
import * as productService from "../services/productService";

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (productId) {
      setStatus("loading");
      productService
        .getProductById(productId)
        .then((data) => {
          setProduct(data);
          setStatus("success");
        })
        .catch((error) => {
          setMessage(
            `Lỗi khi tải chi tiết sản phẩm: ${error.message || "Không rõ lỗi"}`
          );
          setStatus("error");
        });
    }
  }, [productId]);

  // --- CSS STYLES ---
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#374151",
      padding: "10px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#111827",
      borderBottom: "2px solid #e5e7eb",
      paddingBottom: "15px",
      marginBottom: "20px",
    },
    row: {
      display: "flex",
      marginBottom: "12px",
      alignItems: "baseline",
      fontSize: "16px",
    },
    label: {
      fontWeight: "600",
      minWidth: "100px",
      color: "#6b7280", // Màu xám nhẹ cho nhãn
    },
    value: {
      flex: 1,
      color: "#1f2937",
      fontWeight: "500",
    },
    priceTag: {
      color: "#059669", // Xanh lá đậm
      fontWeight: "700",
      fontSize: "18px",
    },
    categoryTag: {
      backgroundColor: "#dbeafe", // Xanh dương nhạt
      color: "#1e40af",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "600",
      display: "inline-block",
    },
    descriptionBox: {
      marginTop: "10px",
      padding: "15px",
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      border: "1px solid #f3f4f6",
      lineHeight: "1.6",
      color: "#4b5563",
      fontStyle: "italic",
    },
    loading: {
      textAlign: "center",
      color: "#6b7280",
      fontSize: "16px",
      padding: "20px",
    },
    error: {
      padding: "15px",
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      borderRadius: "8px",
      border: "1px solid #fca5a5",
      textAlign: "center",
      fontWeight: "500",
    },
  };

  if (status === "loading") {
    return (
      <p style={styles.loading} data-testid="loading-message">
        ⏳ Đang tải chi tiết sản phẩm...
      </p>
    );
  }

  if (status === "error") {
    return (
      <div style={styles.error} className="alert alert-danger">
        {message}
      </div>
    );
  }

  if (!product) {
    return <p style={styles.loading}>Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div style={styles.container} data-testid="product-detail-view">
      <h2 style={styles.header}>Chi tiết Sản phẩm</h2>
      
      <div style={styles.row}>
        <span style={styles.label}>Tên SP:</span>
        <span style={{...styles.value, fontSize: '18px', fontWeight: 'bold'}}>{product.name}</span>
      </div>

      <div style={styles.row}>
        <span style={styles.label}>ID:</span>
        <span style={styles.value}>#{product.id}</span>
      </div>

      <div style={styles.row}>
        <span style={styles.label}>Giá:</span>
        <span style={styles.value}>
          <span style={styles.priceTag} data-testid="product-price">
            {product.price.toLocaleString("vi-VN")} VNĐ
          </span>
        </span>
      </div>

      <div style={styles.row}>
        <span style={styles.label}>Số lượng:</span>
        <span style={styles.value}>{product.quantity}</span>
      </div>

      <div style={styles.row}>
        <span style={styles.label}>Danh mục:</span>
        <span style={styles.value}>
          <span style={styles.categoryTag}>{product.category}</span>
        </span>
      </div>

      <div style={{ marginTop: "20px" }}>
        <span style={styles.label}>Mô tả:</span>
        <div style={styles.descriptionBox}>
          {product.description || "Không có mô tả cho sản phẩm này."}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;