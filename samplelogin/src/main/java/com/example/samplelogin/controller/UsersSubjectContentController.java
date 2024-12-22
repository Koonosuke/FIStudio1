package com.example.samplelogin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.SubjectContent;
import com.example.samplelogin.service.SubjectContentService;

@RestController
@RequestMapping("/api/subjects/contents")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersSubjectContentController {

    @Autowired
    private SubjectContentService subjectContentService;

    @GetMapping("/user/{userId}")
    public List<SubjectContent> getContentsByUser(@PathVariable Long userId) {
        return subjectContentService.getContentsByUserId(userId);
    }
}
