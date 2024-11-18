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
    public SubjectContent addContent(@PathVariable Long subjectId, @RequestBody SubjectContent content) {
        content.setSubjectId(subjectId);
        
        // userIdを任意のフィールドにする（必要であればデフォルト値を設定）
        if (content.getUserId() == null) {
            content.setUserId(-1L); // デフォルトのユーザーIDを設定（例えば、匿名ユーザーとして扱う）
        }

        return subjectContentService.saveContent(content);
    }
}
