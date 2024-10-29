package com.example.samplelogin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.User;
import com.example.samplelogin.service.UserService;

@RestController//RESTful APIを作成→エンドポイントの指定（リクエスト許可）により異なるシステム間でデータのやり取りが容易に
@RequestMapping("/api")//コントローラーのエンドポイントは全て /api から始まる
public class AuthController {
    @Autowired//必要なクラスのインスタンスを自動
    private UserService userService;


      @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {   
        User user = userService.findByEmail(email);// emailでユーザーを検索 
        if (user != null && userService.checkPassword(user, password)) {// ユーザーが存在し、パスワードが一致するかを確認
            if (user.isAdmin()) {
                return new ResponseEntity<>("Admin login successful", HttpStatus.OK);
            }
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public String register(@RequestParam String email, @RequestParam String username, @RequestParam String password) {
        if (userService.findByEmail(email) != null) {  // 入力されたemailが既に登録済みか確認
            return "Email is already registered";
        }

        // 新しいユーザーの情報を作成

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setPassword(password);
        // 新しいユーザーを保存
        userService.saveUser(newUser);
        return "Registration successful";
    }
}
