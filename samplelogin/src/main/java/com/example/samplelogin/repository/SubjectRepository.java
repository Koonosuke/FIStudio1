package com.example.samplelogin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.samplelogin.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {}