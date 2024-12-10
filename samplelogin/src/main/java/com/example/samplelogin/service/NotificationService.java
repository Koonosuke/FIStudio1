package com.example.samplelogin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.samplelogin.model.Notification;
import com.example.samplelogin.repository.NotificationRepository;

@Service
public class NotificationService {
    @Autowired
    private final NotificationRepository notificationRepository;
    
    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }
    //ログイン中のユーザー情報を取得する
    /*
    public User getCurrentUser(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        System.out.println(session);
        if (session == null){
            throw new IllegalStateException("ログインユーザーが見つかりません．セッションが存在しないのでは？");
        }
        User user = (User) session.getAttribute("user");
        if (user == null){
            throw new IllegalStateException("セッションにユーザー情報がありません．");
        }
        return user;

    } */
   //お知らせを保存する
    public Notification createNotification(Notification notification){
        return notificationRepository.save(notification);
    }
    //お知らせを全取得する
    public List<Notification> getAllNotifications(){
        return notificationRepository.findAll();
    }
    //自身が作成したお知らせだけを取得する．
    public List<Notification> getSelfNotifications(String userId){
        Long sendingUserId = null;
        try{
            sendingUserId = Long.parseLong(userId);
        }catch(NumberFormatException e){
            System.err.println(e.getMessage());
            return new ArrayList<>();
        }
        System.out.println("Fetching notifications for userId: "+ sendingUserId);
        return notificationRepository.getUserIdNotifications(sendingUserId);
    }
}
