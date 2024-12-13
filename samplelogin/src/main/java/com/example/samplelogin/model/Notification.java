// Notification.java - お知らせモデル
package com.example.samplelogin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {
    //テーブル定義
    //https://discord.com/channels/1285463851718017094/1298192805604360243/1313404154961596528
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "subject", nullable = false)//件名
    private String subject;

    @Column(name = "value", nullable = false, columnDefinition = "TEXT")
    private String value;
    
    //ゲッター，セッター
    public Long getNotificationId(){
        return notificationId;
    }
    public void setNotificationId(Long notificationId){
        this.notificationId = notificationId;
    }
    public Long getUserId(){
        return userId;
    }
    public void setUserId(Long userId){
        this.userId = userId;
    }
    public String getSubject(){
        return subject;
    }
    public void setSubject(String subject){
        this.subject = subject;
    }
    public String getValue(){
        return value;
    }
    public void setValue(String value){
        this.value = value;
    }
    //コンストラクタ
    public Notification(){

    }

    public Notification(Long userId, String subject, String value){
        this.userId = userId;
        this.subject = subject;
        this.value = value;
    }
}
