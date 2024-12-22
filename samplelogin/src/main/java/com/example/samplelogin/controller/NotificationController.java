package com.example.samplelogin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.Notification;
import com.example.samplelogin.service.NotificationService;



@RestController
@RequestMapping("/api")
public class NotificationController {
    @Autowired
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    //お知らせを保存する
    @PostMapping("/notifications")
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    //お知らせを全取得する
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }
    //特定のユーザIDのデータのみを取得する
    @GetMapping("/notifications/self")
    public ResponseEntity<List<Notification>> getSelfNotifications(@RequestParam("userId") String userId){
        System.out.println("Conduct query: "+userId);
        List<Notification> notifications = notificationService.getSelfNotifications(userId);
        return ResponseEntity.ok(notifications);
    }
    
    
}