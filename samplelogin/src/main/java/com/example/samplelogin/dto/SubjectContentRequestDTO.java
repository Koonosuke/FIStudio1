package com.example.samplelogin.dto;

import com.example.samplelogin.model.SubjectContent;

public class SubjectContentRequestDTO {
    private Long userId;
    private String username;
    private Long subjectId;
    private SubjectContent content;

    public Long getUserId(){
        return userId;
    }
    public void setUserId(Long userId){
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public SubjectContent getContent() {
        return content;
    }

    public void setContent(SubjectContent content) {
        this.content = content;
    }
}
