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

import com.example.samplelogin.dto.SubjectContentRequestDTO;
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
        @RequestBody SubjectContentRequestDTO requestDTO,
        HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        User user = (User)session.getAttribute("user");
        Long userId = user.getId();
        String username = user.getUsername();

        if (userId == null || username == null) {
            throw new IllegalStateException("ユーザー情報を取得できませんでした");
        }
        SubjectContent content = new SubjectContent();
        content.setSubjectId(subjectId);
        content.setUserId(userId); // ユーザIDを設定
        content.setUserName(username); // ユーザ名を設定
        content.setContent(requestDTO.getContent());
        content.setEvaluation(requestDTO.getEvaluation());
        content.setPastExams(requestDTO.getPastExams());
        return subjectContentService.saveContent(content);
    }
}