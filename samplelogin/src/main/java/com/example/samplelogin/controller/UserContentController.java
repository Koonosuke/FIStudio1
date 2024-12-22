package com.example.samplelogin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.SubjectContent;
import com.example.samplelogin.model.User;
import com.example.samplelogin.service.SubjectContentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/subjects/contents")
@CrossOrigin(origins = "http://localhost:3000")
public class UserContentController {

    @Autowired
    private SubjectContentService subjectContentService;

    // ログイン中のユーザーが投稿したすべてのコメントを取得
    @GetMapping("/user")
    public List<SubjectContent> getContentsByUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session == null) {
            throw new IllegalStateException("ログインが必要です");
        }

        User user = (User) session.getAttribute("user");

        if (user == null) {
            throw new IllegalStateException("ユーザー情報が見つかりません");
        }

        return subjectContentService.getContentsByUserId(user.getId());
    }
}
