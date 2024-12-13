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

@RestController//RESTful APIを作成→エンドポイントの指定（リクエスト許可）により異なるシステム間でデータのやり取りが容易に
@RequestMapping("/api")//コントローラーのエンドポイントは全て /api から始まる
public class AuthController {
    HttpSession session;
    
    

    @Autowired//必要なクラスのインスタンスを自動
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, HttpServletRequest request) {
        User user = userService.findByEmail(email);// emailでユーザーを検索
        session = request.getSession(true);//セッションの初期化 11/26
        if (user != null && userService.checkPassword(user, password)) {// ユーザーが存在し、パスワードが一致するかを確認
            session.setAttribute("user", user);//セッションにユーザ情報を格納 11/26
            if (user.isAdmin()) {
                return new ResponseEntity<>("Admin login successful", HttpStatus.OK);
            }
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }
    

    @PostMapping("/register")
    public String register(@RequestParam String email, @RequestParam String username, @RequestParam String password, HttpServletRequest request) {
        if (userService.findByEmail(email) != null) {  // 入力されたemailが既に登録済みか確認
            return "Email is already registered";
        }
            // 新しいユーザーの情報を作成
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(username);
            newUser.setPassword(password);
            newUser.setGrade(0);
            newUser.setPr("");
            // 新しいユーザーを保存
            userService.saveUser(newUser);
            session = request.getSession();//セッションの初期化 11/26
            session.setAttribute("user", newUser);//セッションにユーザ情報を格納 11/26
            return "Registration successful";
    }

    @GetMapping("/user")//ユーザ情報を
    public ResponseEntity<?> getUserInfo(){
        User user = (User) session.getAttribute("user");
        if(user != null){
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/logout")//ログアウト
    public ResponseEntity<String> logout(){
        session.invalidate();
        return ResponseEntity.ok("Logout Complete!");
    }

    @PostMapping("/edit")
    public ResponseEntity<String> ChangeProfile(@RequestParam String username, @RequestParam String grade, @RequestParam String pr){
        User newUser = (User) session.getAttribute("user");
        try{
            int grade1 = Integer.parseInt(grade);
            newUser.setUsername(username);
            newUser.setGrade(grade1);
            newUser.setPr(pr);
            session.removeAttribute("user");
            session.setAttribute("user", newUser);
            userService.UpdataUser(newUser);
        }
        catch(NumberFormatException e){
            newUser.setUsername("Error");
            newUser.setGrade(0);
            newUser.setPr("Error");
            session.removeAttribute("user");
            session.setAttribute("user", newUser);
        }
            return new ResponseEntity<>("", HttpStatus.OK);

        
    }

}
