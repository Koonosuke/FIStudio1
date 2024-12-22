package com.example.samplelogin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.samplelogin.model.SubjectContent;
import com.example.samplelogin.repository.SubjectContentRepository;

@Service
public class SubjectContentService {

    @Autowired
    private SubjectContentRepository subjectContentRepository;

    public List<SubjectContent> getContentsBySubjectId(Long subjectId) {
        return subjectContentRepository.findBySubjectId(subjectId);
    }

    public SubjectContent saveContent(SubjectContent content) {
        return subjectContentRepository.save(content);
    }

    // 新規追加: ユーザーIDに基づいて投稿を取得するメソッド
    public List<SubjectContent> getContentsByUserId(Long userId) {
        return subjectContentRepository.findByUserId(userId);
    }

    public void deleteSubjectContent(Long subjectContentId){
        if(!subjectContentRepository.existsById(subjectContentId)){
            throw new IllegalArgumentException("SubjectContent with ID "+ subjectContentId + " not found. ");
        }
        subjectContentRepository.deleteById(subjectContentId);
    }
}
