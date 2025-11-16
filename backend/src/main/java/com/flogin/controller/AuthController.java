package com.flogin.controller;

import com.flogin.dto.LoginRequest;
import com.flogin.security.JwtUtil;
import com.flogin.service.impl.AuthServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest req) {

        return new AuthServiceImpl().authenticate(req);
    }
}
