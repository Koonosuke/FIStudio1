
// MessageRepository.java - メッセージリポジトリ
package com.example.samplelogin.repository;

import com.example.samplelogin.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderEmailAndReceiverEmail(String senderEmail, String receiverEmail);
    List<Message> findByReceiverEmail(String receiverEmail);
}
