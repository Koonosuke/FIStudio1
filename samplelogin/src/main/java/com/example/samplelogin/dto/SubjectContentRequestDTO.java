package com.example.samplelogin.dto;

public class SubjectContentRequestDTO {
    private Long subjectId;
    private String content;
    private int evaluation;
    private String pastExams;

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getEvaluation(){
        return evaluation;
    }

    public void setEvaluation(int evaluation){
        this.evaluation = evaluation;
    }

    public String getPastExams(){
        return pastExams;
    }

    public void setPastExams(String pastExams){
        this.pastExams = pastExams;
    }
}
