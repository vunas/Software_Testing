package com.flogin.service;

import com.flogin.dto.UserDto;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    UserDetails loadUserByUsername(String username);

    UserDto createUser(UserDto dto);

    List<UserDto> getAll();
}
