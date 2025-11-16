package com.flogin.service.impl;

import com.flogin.dto.ProductDto;
import com.flogin.entity.Product;
import com.flogin.repository.ProductRepository;
import com.flogin.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repo;

    public ProductServiceImpl(ProductRepository repo) {
        this.repo = repo;
    }

    @Override
    public ProductDto createProduct(ProductDto dto) {
        Product p = Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .quantity(dto.getQuantity())
                .build();
        Product saved = repo.save(p);
        return new ProductDto(saved.getId(), saved.getName(), saved.getPrice(), saved.getQuantity());
    }

    @Override
    public List<ProductDto> getAll() {
        return repo.findAll().stream()
                .map(p -> new ProductDto(p.getId(), p.getName(), p.getPrice(), p.getQuantity()))
                .collect(Collectors.toList());
    }
}
