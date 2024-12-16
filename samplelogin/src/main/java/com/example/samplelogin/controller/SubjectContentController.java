package com.example.samplelogin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.SubjectContent;
import com.example.samplelogin.model.User;
import com.example.samplelogin.service.SubjectContentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/subjects/{subjectId}/contents")
@CrossOrigin(origins = "http://localhost:3000")
public class SubjectContentController {

    @Autowired
    private SubjectContentService subjectContentService;

    @GetMapping
    public List<SubjectContent> getContentsBySubject(@PathVariable Long subjectId) {
        return subjectContentService.getContentsBySubjectId(subjectId);
    }

    @PostMapping
    public SubjectContent addContent(
        @PathVariable Long subjectId,
        @RequestBody SubjectContent content,
        HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
    
        if (session == null) {
            throw new IllegalStateException("ログインが必要です");
        }
    
        User user = (User) session.getAttribute("user");
    
        if (user == null) {
            throw new IllegalStateException("ユーザー情報が見つかりません");
        }
    
        content.setSubjectId(subjectId);
        content.setUserId(user.getId()); // ユーザIDを設定
        content.setUserName(user.getUsername()); // ユーザ名を設定
        return subjectContentService.saveContent(content);
    }
}