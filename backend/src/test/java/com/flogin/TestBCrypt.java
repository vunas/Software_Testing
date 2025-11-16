package com.flogin;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestBCrypt {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "Test123";
        String hash = encoder.encode(rawPassword);
        System.out.println(hash);
    }
}
