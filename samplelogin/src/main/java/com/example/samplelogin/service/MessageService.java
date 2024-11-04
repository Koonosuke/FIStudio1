// MessageService.java - メッセージサービス
package com.example.samplelogin.service;

import com.example.samplelogin.model.Message;
import com.example.samplelogin.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(String senderEmail, String receiverEmail, String content) {
        Message message = new Message();
        message.setSenderEmail(senderEmail);
        message.setReceiverEmail(receiverEmail);
        message.setContent(content);
        message.setSentAt(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Message> getMessagesBetweenUsers(String senderEmail, String receiverEmail) {
        return messageRepository.findBySenderEmailAndReceiverEmail(senderEmail, receiverEmail);
    }
}
