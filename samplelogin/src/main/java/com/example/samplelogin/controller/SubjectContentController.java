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
import com.example.samplelogin.service.SubjectContentService;

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
        @RequestBody SubjectContentRequestDTO requestDTO
    ) {
        if (requestDTO.getUserId() == null || requestDTO.getUsername() == null) {
            throw new IllegalStateException("ユーザー情報を取得できませんでした");
        }
        SubjectContent content = requestDTO.getContent();
        content.setSubjectId(requestDTO.getSubjectId());
        content.setUserId(requestDTO.getUserId()); // ユーザIDを設定
        content.setUserName(requestDTO.getUsername()); // ユーザ名を設定
        return subjectContentService.saveContent(content);
    }
}