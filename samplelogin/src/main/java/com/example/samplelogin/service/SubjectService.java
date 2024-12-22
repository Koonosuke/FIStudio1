package com.example.samplelogin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.samplelogin.model.Subject;
import com.example.samplelogin.repository.SubjectRepository;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getSubjectById(Long id) {
        Optional<Subject> subject = subjectRepository.findById(id);
        return subject.orElseThrow(() -> new RuntimeException("Subject not found with ID: " + id));
    }

    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Long id, Subject subjectDetails) {
        Subject subject = getSubjectById(id);
        subject.setSubjectName(subjectDetails.getSubjectName());
        subject.setTeacherName(subjectDetails.getTeacherName());
        subject.setYear(subjectDetails.getYear());
        //subject.setUserId(subjectDetails.getUserId());
        //subject.setContent(subjectDetails.getContent());
        //subject.setEvaluation(subjectDetails.getEvaluation());
        //subject.setPastExams(subjectDetails.getPastExams());
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        Subject subject = getSubjectById(id);
        subjectRepository.delete(subject);
    }

    public boolean subjectExists(Long subjectId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'subjectExists'");
    }
}