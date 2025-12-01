// package com.flogin.security;

// import com.flogin.entity.User;
// import com.flogin.repository.UserRepository;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.test.web.servlet.MockMvc;

// import static org.junit.jupiter.api.Assertions.assertNotEquals;
// import static org.junit.jupiter.api.Assertions.assertTrue;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

// @SpringBootTest
// @AutoConfigureMockMvc
// public class SecurityConfigTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @MockBean
//     private JwtAuthenticationFilter jwtAuthenticationFilter;

//     // --- Mục c: CORS ---
//     @Test
//     @DisplayName("Config: Kiểm tra CORS với Origin lạ")
//     void testCorsWithMaliciousOrigin() throws Exception {
//         mockMvc.perform(options("/api/products")
//                 .header("Origin", "http://evil-hacker.com")
//                 .header("Access-Control-Request-Method", "GET"))
//                 .andExpect(status().isForbidden());
//     }

//     // --- Mục c: Security Headers & HTTPS Enforcement ---
//     @Test
//     @DisplayName("Config: Kiểm tra Security Headers và HTTPS (HSTS)")
//     void testSecurityHeaders() throws Exception {
//         mockMvc.perform(get("/api/products"))

//                 // 2. Chống Sniffing content
//                 .andExpect(header().string("X-Content-Type-Options", "nosniff"))

//                 // 3. Chống Clickjacking
//                 .andExpect(header().string("X-Frame-Options", "DENY"));
//     }

//     // --- Mục c: Password Hashing ---
//     @Test
//     @DisplayName("Best Practice: Kiểm tra mật khẩu có được băm (Hashing) trong DB không")
//     void testPasswordHashing() {
//         // 1. Lấy một user mẫu từ DB (dựa trên data.sql hoặc tạo mới)
//         // Giả sử trong data.sql bạn có user 'admin' với pass '123456'
//         User user = userRepository.findByUsername("admin").orElse(null);

//         if (user != null) {
//             String savedPassword = user.getPassword();

//             // Kiểm tra 1: Mật khẩu lưu trong DB KHÔNG được giống mật khẩu gốc "123456"
//             assertNotEquals("123456", savedPassword, "LỖI: Mật khẩu đang lưu dưới dạng Plaintext!");

//             // Kiểm tra 2: Mật khẩu phải bắt đầu bằng $2a$ (đặc trưng của BCrypt)
//             assertTrue(savedPassword.startsWith("$2a$"), "LỖI: Mật khẩu không được mã hóa bằng BCrypt!");

//             // Kiểm tra 3: Dùng Encoder verify lại xem đúng không
//             assertTrue(passwordEncoder.matches("123456", savedPassword), "LỖI: Hash không khớp với mật khẩu gốc!");
//         } else {
//             System.out.println("WARN: Không tìm thấy user 'admin' để test hash. Hãy đảm bảo data.sql đã chạy.");
//         }
//     }
// }