package com.flogin.service.impl;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.security.JwtUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Câu 2.1.2: AuthService Unit Tests")
class AuthServiceTest {

    @Mock
    private AuthenticationManager authManager;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    @DisplayName("TC1: Login thành công và tạo JWT Token")
    void testLoginSuccess() {
        LoginRequest request = new LoginRequest("testuser", "Test123");
        String mockToken = "mock-jwt-token-for-testuser";

        when(jwtUtil.generateToken(request.getUsername())).thenReturn(mockToken);

        LoginResponse response = authService.authenticate(request);

        assertTrue(response.isSuccess());
        assertEquals("Đăng nhập thành công", response.getMessage());
        assertEquals(mockToken, response.getToken());

        verify(authManager, times(1)).authenticate(
                any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtil, times(1)).generateToken(request.getUsername());
    }

    @Test
    @DisplayName("TC2: Login thất bại do thông tin đăng nhập sai (AuthenticationException)")
    void testLoginFailureWrongCredentials() {
        LoginRequest request = new LoginRequest("wronguser", "WrongPass");

        Mockito.doThrow(new BadCredentialsException("Sai thông tin"))
                .when(authManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));

        LoginResponse response = authService.authenticate(request);

        assertFalse(response.isSuccess());
        assertEquals("Sai thông tin đăng nhập", response.getMessage());
        assertNull(response.getToken());

        verify(authManager, times(1)).authenticate(
                any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtil, never()).generateToken(anyString());
    }
}
