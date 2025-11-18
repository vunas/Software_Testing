package com.flogin.service;

import com.flogin.dto.ProductDto;
import java.util.List;

import org.springframework.data.domain.Page;

public interface ProductService {
    ProductDto createProduct(ProductDto dto);

    List<ProductDto> getAll();

    public Page<ProductDto> getAll(int page, int size);

    ProductDto getProductById(Long id);

    ProductDto updateProduct(Long id, ProductDto dto);

    void deleteProduct(Long id);
}
