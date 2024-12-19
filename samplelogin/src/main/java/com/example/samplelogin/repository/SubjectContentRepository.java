package com.example.samplelogin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.samplelogin.model.SubjectContent;

@Repository
public interface SubjectContentRepository extends JpaRepository<SubjectContent, Long> {

    // 科目IDで投稿を取得
    List<SubjectContent> findBySubjectId(Long subjectId);

    // ユーザーIDで投稿を取得
    List<SubjectContent> findByUserId(Long userId);
}
