// MessageController.java

//SpringのSTOMPプロトコルを使用しておるぞい
package com.example.samplelogin.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.samplelogin.model.Message;
import com.example.samplelogin.service.MessageService;

@Controller
public class MessageController {

    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat.sendMessage")//メッセージを受け取り、データベースに保存し、クライアントにブロードキャスト
    @SendTo("/topic/public")
    public Message sendMessage(Message message) {
        message.setSentAt(LocalDateTime.now());
        // メッセージをデータベースに保存
        messageService.saveMessage(message.getSenderEmail(), message.getReceiverEmail(), message.getContent());
        return message;
    }
    @MessageMapping("/chat.markAsRead")//特定のメッセージを既読としてマークし、クライアントに通知
    @SendTo("/topic/read-status")
    //戻り値がtrueの場合、既読状態の更新が成功
    public Long markAsReadWebSocket(Long messageId) {
        boolean isUpdated = messageService.markMessageAsRead(messageId);
        if (isUpdated) {
            return messageId;
        }
        return null;
    }
}