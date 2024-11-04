
// MessageController.java - メッセージコントローラー
package com.example.samplelogin.controller;

import com.example.samplelogin.model.Message;
import com.example.samplelogin.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<Message> getConversation(@RequestParam String senderEmail, @RequestParam String receiverEmail) {
        return messageService.getMessagesBetweenUsers(senderEmail, receiverEmail);
    }
}