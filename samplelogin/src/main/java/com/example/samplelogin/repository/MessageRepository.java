
// MessageRepository.java - メッセージリポジトリ
package com.example.samplelogin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.samplelogin.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderEmailAndReceiverEmail(String senderEmail, String receiverEmail);
    List<Message> findByReceiverEmail(String receiverEmail);
}
