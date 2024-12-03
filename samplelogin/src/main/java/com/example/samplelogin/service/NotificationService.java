package com.example.samplelogin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.samplelogin.CustomUserDetails;
import com.example.samplelogin.model.Notification;
import com.example.samplelogin.model.User;
import com.example.samplelogin.repository.NotificationRepository;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }
    //ログイン中のユーザー情報を取得する
    public User getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()){
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserDetails){
                return ((CustomUserDetails) principal).getUser();
            }
        }
        return null;

    }
    public Notification createNotification(Notification notification){
        User currentUser = getCurrentUser();
        if (currentUser == null){
            throw new IllegalStateException("ログインユーザーが見つかりません．");
        }
        notification.setUserId(currentUser.getId());
        return notificationRepository.save(notification);
    }
}
