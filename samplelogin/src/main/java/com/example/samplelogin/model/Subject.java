package com.example.samplelogin.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "teacher_name", nullable = false)
    private String teacherName;

    @Column(nullable = false)
    private int year;
    /*
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(columnDefinition = "TEXT", nullable = true) // content をオプションにする
    private String content;

    @Column(nullable = true) // evaluation をオプションにする
    private Integer evaluation;

    @Column(name = "past_exams", columnDefinition = "TEXT", nullable = true) // pastExams をオプションにする
    private String pastExams;
 */
    // コンストラクタ
    public Subject() {
    }

    public Subject(String subjectName, String teacherName, int year) {
        this.subjectName = subjectName;
        this.teacherName = teacherName;
        this.year = year;
    }

    // 必須フィールドのみのコンストラクタ
    /*
    public Subject(String subjectName, String teacherName, int year, Long userId) {
        this.subjectName = subjectName;
        this.teacherName = teacherName;
        this.year = year;
    } */

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
    /*
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(Integer evaluation) {
        this.evaluation = evaluation;
    }

    public String getPastExams() {
        return pastExams;
    }

    public void setPastExams(String pastExams) {
        this.pastExams = pastExams;
    } */

    @Override
    public String toString() {
        return "Subject{" +
                "id=" + id +
                ", subjectName='" + subjectName + '\'' +
                ", teacherName='" + teacherName + '\'' +
                ", year=" + year +
                '}';
    }
}
