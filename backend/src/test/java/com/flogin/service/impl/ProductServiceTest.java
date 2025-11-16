package com.flogin.service.impl;
// package com.flogin.service;

// import com.flogin.dto.ProductDto;
// import com.flogin.entity.Product; // Giả định lớp Product Entity
// import com.flogin.repository.ProductRepository;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;

// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;

// @ExtendWith(MockitoExtension.class)
// @DisplayName("Product Service Unit Tests (CRUD)")
// class ProductServiceTest {

//     @Mock
//     private ProductRepository productRepository; // Mock lớp Data Access Layer
    
//     @InjectMocks
//     private ProductService productService; // Lớp cần test

//     @Test
//     @DisplayName("TC1: Tao san pham moi thanh cong")
//     void testCreateProductSuccess() {
//         // ARRANGE
//         ProductDto productDto = new ProductDto("Laptop ABC", 15000000L, 10, "Electronics");
//         Product productToSave = new Product(null, "Laptop ABC", 15000000L, 10, "Electronics"); // ID là null khi tạo
//         Product savedProduct = new Product(1L, "Laptop ABC", 15000000L, 10, "Electronics"); // ID đã được generate
        
//         // Mocking: Khi Repository.save() được gọi với bất kỳ Product nào, nó sẽ trả về Product đã có ID
//         when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

//         // ACT
//         ProductDto result = productService.createProduct(productDto);

//         // ASSERT
//         assertNotNull(result);
//         assertEquals(1L, result.getId());
//         assertEquals("Laptop ABC", result.getName());
        
//         // VERIFY: Đảm bảo Repository.save() đã được gọi 1 lần
//         verify(productRepository, times(1)).save(any(Product.class));
//     }
    
//     @Test
//     @DisplayName("TC2: Lay san pham theo ID ton tai")
//     void testGetProductByIdFound() {
//         // ARRANGE
//         Long productId = 1L;
//         Product mockProduct = new Product(productId, "Mouse XYZ", 200000L, 50, "Peripherals");
        
//         // Mocking: Khi findById được gọi, nó trả về Optional chứa mockProduct
//         when(productRepository.findById(productId)).thenReturn(Optional.of(mockProduct));

//         // ACT
//         ProductDto result = productService.getProductById(productId);

//         // ASSERT
//         assertNotNull(result);
//         assertEquals("Mouse XYZ", result.getName());
        
//         // VERIFY
//         verify(productRepository, times(1)).findById(productId); // Bắt buộc verify theo yêu cầu bài tập
//     }

//     // Sinh viên cần viết thêm các test cases cho: 
//     // - Lấy sản phẩm không tồn tại (ném ra exception).
//     // - Update sản phẩm (Mock findById, sau đó Mock save).
//     // - Delete sản phẩm.
//     // - getAll() với Pagination.
// }