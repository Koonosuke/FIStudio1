//ユーザー情報の取得、パスワードの照合、およびユーザー情報の保存を
package com.example.samplelogin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.samplelogin.model.User;
import com.example.samplelogin.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User UpdateUser(User user) {
        return userRepository.save(user);
    }

    public void DeleteUser(User user) {
        userRepository.delete(user);
    }

    public boolean isUserAdmin(String userId){
        Long sendingUserId = null;
        try{
            sendingUserId = Long.parseLong(userId);
        }catch(NumberFormatException e){
            System.err.println(e.getMessage());
            return false;
        }
        System.out.println("isUserAdminを実行するゾ");
        Boolean isAdmin = userRepository.isUserAdmin(sendingUserId);
        return isAdmin != null ? isAdmin : false;
    }
}
//サービスはビジネスロジックを管理する層です。リポジトリを利用してデータを操作し、複雑な処理や条件分岐などのビジネスロジックを実装