// // backend/src/test/java/com/flogin/securitytest/InputValidationTest.java
// package com.flogin.security;

// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;

// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// @SpringBootTest
// @AutoConfigureMockMvc
// public class InputValidationTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @Test
//     @DisplayName("Validation: Test gửi dữ liệu rỗng (Empty JSON)")
//     void testEmptyLoginInput() throws Exception {
//         // Gửi JSON rỗng
//         String emptyJson = "{}";

//         // Mong đợi: 400 Bad Request hoặc server tự xử lý trả về false
//         // Code AuthServiceImpl của bạn trả về 200 OK kèm message lỗi -> vẫn chấp nhận được
//         mockMvc.perform(post("/api/auth/login")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(emptyJson))
//                 .andExpect(status().isOk()); 
//     }

//     @Test
//     @DisplayName("Validation: Test Buffer Overflow - Gửi chuỗi cực dài")
//     void testHugeInputString() throws Exception {
//         // Tạo chuỗi dài 5000 ký tự
//         String hugeString = "A".repeat(5000);
//         String payload = String.format("{\"username\": \"%s\", \"password\": \"123\"}", hugeString);

//         // Mong đợi: Server không được chết (500). Nên là 400 hoặc 200 với thông báo lỗi.
//         mockMvc.perform(post("/api/auth/login")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(payload))
//                 .andExpect(status().isOk()); // Hiện tại controller bạn đang trả về OK cho mọi tình huống
//     }
    
//     @Test
//     @DisplayName("Validation: Test Malformed JSON - Sai định dạng")
//     void testMalformedJson() throws Exception {
//         String brokenJson = "{username: ...quên đóng ngoặc";

//         // Mong đợi: 400 Bad Request (Spring Boot tự handle cái này)
//         mockMvc.perform(post("/api/auth/login")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(brokenJson))
//                 .andExpect(status().isBadRequest());
//     }
// }