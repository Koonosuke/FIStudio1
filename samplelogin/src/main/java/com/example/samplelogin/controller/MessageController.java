
// MessageController.java - メッセージコントローラー
package com.example.samplelogin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.Message;
import com.example.samplelogin.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public Message sendMessage(@RequestParam String senderEmail, @RequestParam String receiverEmail, @RequestParam String content) {
        return messageService.saveMessage(senderEmail, receiverEmail, content);
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(@RequestParam String userEmail1, @RequestParam String userEmail2) {
        return messageService.getMessagesBetweenUsers(userEmail1, userEmail2);
        
    }
}