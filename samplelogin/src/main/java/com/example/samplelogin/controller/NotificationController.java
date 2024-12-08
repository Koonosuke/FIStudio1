package com.example.samplelogin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Received notification: " + notification);
        System.out.println("Authentication: " + authentication);
        if(authentication != null){
            System.out.println("Principal: "+authentication.getPrincipal());
        }
        return notificationService.createNotification(notification);
    }
    
}
