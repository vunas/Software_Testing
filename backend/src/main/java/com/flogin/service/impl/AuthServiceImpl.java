package com.flogin.service.impl;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.security.JwtUtil;
import com.flogin.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public LoginResponse authenticate(LoginRequest request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (Exception e) {
            return new LoginResponse(false, "Sai thông tin đăng nhập", null);
        }

        String token = jwtUtil.generateToken(request.getUsername());
        return new LoginResponse(true, "Đăng nhập thành công", token);
    }
}
