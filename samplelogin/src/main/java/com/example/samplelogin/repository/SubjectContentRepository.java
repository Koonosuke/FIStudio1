package com.example.samplelogin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.samplelogin.model.SubjectContent;

@Repository
public interface SubjectContentRepository extends JpaRepository<SubjectContent, Long> {
    List<SubjectContent> findBySubjectId(Long subjectId);
}