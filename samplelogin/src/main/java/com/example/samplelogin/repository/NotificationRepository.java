//Notifications(DB)とserviceを仲介する
//save機能はデフォルトで入っているので問題なし
package com.example.samplelogin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.samplelogin.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{
    //ユーザの作成したお知らせを取得する
    @Query("SELECT p FROM Notification p WHERE p.userId = :userId")
    List<Notification> getUserIdNotifications(Long userId);
}