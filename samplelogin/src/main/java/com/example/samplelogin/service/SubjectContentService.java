package com.example.samplelogin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.samplelogin.model.SubjectContent;
import com.example.samplelogin.repository.SubjectContentRepository;
import com.example.samplelogin.repository.SubjectRepository;

@Service
public class SubjectContentService {

    @Autowired
    private SubjectContentRepository subjectContentRepository;

    @Autowired
    private SubjectRepository subjectRepository; // SubjectRepositoryのインスタンスを注入

    public List<SubjectContent> getContentsBySubjectId(Long subjectId) {
        return subjectContentRepository.findBySubjectId(subjectId);
    }

    public SubjectContent saveContent(SubjectContent content) {
        return subjectContentRepository.save(content);
    }

    public boolean subjectExists(Long subjectId) {
        // SubjectRepositoryを使ってsubjectIdの存在を確認
        return subjectRepository.existsById(subjectId);
    }
}
