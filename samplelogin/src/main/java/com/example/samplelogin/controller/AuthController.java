package com.example.samplelogin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.User;
import com.example.samplelogin.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password, HttpServletRequest request) {
        User user = userService.findByEmail(email); // emailでユーザーを検索
        if (user != null && userService.checkPassword(user, password)) { // ユーザーが存在し、パスワードが一致するかを確認
            HttpSession session = request.getSession(true); // 新規または既存のセッションを取得
            session.setAttribute("user", user); // ユーザ情報をセッションに保存

            if (user.isAdmin()) {
                return ResponseEntity.ok("Admin login successful");
            }
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid email or password"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam String email, @RequestParam String username, @RequestParam String password) {
        if (userService.findByEmail(email) != null) { // 入力されたemailが既に登録済みか確認
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Email is already registered"));
        }
        // 新しいユーザーの情報を作成
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setPassword(password); // パスワードのハッシュ化はUserServiceで実施
        
        // 新しいユーザーを保存
        userService.saveUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserName(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 既存のセッションを取得（存在しない場合はnullを返す）
        if (session != null) {
            User user = (User) session.getAttribute("user");
            if (user != null) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("Not found or not logged in"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 既存のセッションを取得
        if (session != null) {
            session.invalidate(); // セッションを無効化
            return ResponseEntity.ok("Logout successful");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("No active session found"));
    }

    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
