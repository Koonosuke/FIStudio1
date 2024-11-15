// MessageRestController.java
package com.example.samplelogin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.Message;
import com.example.samplelogin.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageRestController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/conversation")
    public List<Message> getConversation(@RequestParam String userEmail1, @RequestParam String userEmail2) {
        return messageService.getMessagesBetweenUsers(userEmail1, userEmail2);
    }
}
