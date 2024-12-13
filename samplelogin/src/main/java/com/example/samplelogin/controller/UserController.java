
// Backend: UserController.java
package com.example.samplelogin.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.samplelogin.model.User;
import com.example.samplelogin.repository.UserRepository;
import com.example.samplelogin.service.UserService;

@RestController
@RequestMapping("/api")

public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/userDelete")
    public ResponseEntity<String> userDelete(@RequestParam String email) {
        User user = userRepository.findByEmail(email);
        userService.DeleteUser(user);
    return ResponseEntity.ok("Delete Successful!");
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        List<User> userList = new ArrayList<User>();//管理者をのぞいた全ユーザを返せるようにしたぜ。
        for (User user : userRepository.findAll()){
            if(user.isAdmin()){
                continue;
            }
            else{
                userList.add(user);
            }
        }
        return userList;
    }
    //指定されたuserIDが管理者であるかどうか
    @GetMapping("/isAdmin")
    public boolean isUserAdmin(@RequestParam("userId") String userId){
        System.out.println("received user ID:"+userId);
        return userService.isUserAdmin(userId);
    }

}
