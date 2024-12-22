package com.example.samplelogin.controller;
import java.util.HashMap;
import java.util.Map;

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

import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;
    private ServletRequest session;
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
public ResponseEntity<?> register(
    @RequestParam String email,
    @RequestParam String username,
    @RequestParam String password
) {
    if (userService.findByEmail(email) != null) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already registered");
    }

    User newUser = new User();
    newUser.setEmail(email);
    newUser.setUsername(username);
    newUser.setPassword(password); // ハッシュ化はUserServiceで実施

    userService.saveUser(newUser);
    return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
}
@GetMapping("/user")
public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
    HttpSession session = request.getSession(false); // 既存のセッションを取得
    if (session != null) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            // 必要なデータを Map に格納して返す
            Map<String, Object> userData = new HashMap<>();
            userData.put("username", user.getUsername());
            userData.put("email", user.getEmail());
            userData.put("grade", user.getGrade());
            userData.put("pr", user.getPr());
            return ResponseEntity.ok(userData);
        }
    }
    // セッションがない場合やユーザーが見つからない場合
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(new ErrorResponse("User not found or not logged in"));
}

    @PostMapping("/edit")
    public ResponseEntity<String> changeProfile(
            @RequestParam String username, 
            @RequestParam int grade, 
            @RequestParam String pr, 
            HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.FORBIDDEN);
        }
    
        // バリデーション
        if (username.isEmpty() || grade <= 0 || pr.isEmpty()) {
            return new ResponseEntity<>("Invalid input", HttpStatus.BAD_REQUEST);
        }
    
        try {
            // 更新
            currentUser.setUsername(username);
            currentUser.setGrade(grade);
            currentUser.setPr(pr);
    
            userService.UpdateUser(currentUser); // UserService のメソッドを利用
            return new ResponseEntity<>("Profile updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
