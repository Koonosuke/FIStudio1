package com.example.samplelogin.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.samplelogin.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Query("SELECT p.isAdmin FROM User p WHERE p.id = :userId")
    Boolean isUserAdmin(Long userId);
}

//データベースへのアクセスを担当する層