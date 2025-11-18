import React, { useState, useEffect } from "react";
import * as productService from "../services/productService";
import { validateProduct } from "../utils/productValidation";

const CATEGORIES = ["Electronics", "Books", "Clothing"];

const initialProductState = {
  name: "",
  price: 0,
  quantity: 0,
  description: "",
  category: CATEGORIES[0] || "",
};

const ProductForm = ({ productIdToEdit = null }) => {
  const [product, setProduct] = useState(initialProductState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // 'loading', 'success', 'error'
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (productIdToEdit) {
      setStatus("loading");
      productService
        .getProductById(productIdToEdit)
        .then((data) => {
          setProduct({
            ...data,
            price: data.price || 0,
            quantity: data.quantity || 0,
          });
          setStatus("");
        })
        .catch(() => {
          setMessage("Lỗi khi tải dữ liệu sản phẩm.");
          setStatus("error");
        });
    }
  }, [productIdToEdit]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "number" || name === "price" || name === "quantity"
        ? value === ""
          ? null
          : parseFloat(value)
        : value;

    setProduct((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProduct(product);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setMessage("Vui lòng kiểm tra lại các trường bị lỗi.");
      return;
    }

    setStatus("loading");
    setErrors({});
    setMessage("");

    try {
      if (productIdToEdit) {
        await productService.updateProduct(productIdToEdit, product);
        setMessage("Cập nhật sản phẩm thành công");
      } else {
        await productService.createProduct(product);
        setMessage("Thêm sản phẩm thành công");
        setProduct(initialProductState);
      }
      setStatus("success");
    } catch (error) {
      setMessage(error.message || "Đã xảy ra lỗi trong quá trình xử lý API.");
      setStatus("error");
    }
  };

  const formTitle = productIdToEdit ? "Cập nhật Sản phẩm" : "Thêm Sản phẩm mới";

  return (
    <div className="product-form-container">
      <h2>{formTitle}</h2>

      {message && (
        <p
          className={`alert ${
            status === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
            data-testid="product-name-input"
          />
          {errors.name && (
            <p className="error-message" data-testid="error-name">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá (VNĐ)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={errors.price ? "input-error" : ""}
            data-testid="product-price-input"
          />
          {errors.price && (
            <p className="error-message" data-testid="error-price">
              {errors.price}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Số lượng</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className={errors.quantity ? "input-error" : ""}
            data-testid="product-quantity-input"
          />
          {errors.quantity && (
            <p className="error-message" data-testid="error-quantity">
              {errors.quantity}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className={errors.category ? "select-error" : ""}
            data-testid="product-category-select"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="error-message" data-testid="error-category">
              {errors.category}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className={errors.description ? "input-error" : ""}
            maxLength="500"
            data-testid="product-description-input"
          />
          {errors.description && (
            <p className="error-message" data-testid="error-description">
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          data-testid="submit-btn"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
