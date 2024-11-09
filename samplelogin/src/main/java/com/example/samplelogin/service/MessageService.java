// MessageService.java - メッセージサービス
package com.example.samplelogin.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.samplelogin.model.Message;
import com.example.samplelogin.repository.MessageRepository;

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

    public List<Message> getMessagesBetweenUsers(String userEmail1, String userEmail2) {
        List<Message> messagesFromUser1ToUser2 = messageRepository.findBySenderEmailAndReceiverEmail(userEmail1, userEmail2);
        List<Message> messagesFromUser2ToUser1 = messageRepository.findBySenderEmailAndReceiverEmail(userEmail2, userEmail1);
        List<Message> allMessages = new ArrayList<>();
        allMessages.addAll(messagesFromUser1ToUser2);
        allMessages.addAll(messagesFromUser2ToUser1);
        allMessages.sort((m1, m2) -> m1.getSentAt().compareTo(m2.getSentAt()));
        return allMessages;
    }
}
