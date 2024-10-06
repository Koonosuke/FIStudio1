package com.example.samplelogin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {//パスワードのハッシュ化！！BCryptアルゴリズムを使用してる
        return new BCryptPasswordEncoder();//SpringコンテナにBCryptPasswordEncoderのインスタンスを登録することを示しており、他の部分からこのインスタンスを使用可能！
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login", "/api/register").permitAll()//リクエストは認証なしでアクセスを許可
                .anyRequest().authenticated()//それ以外のすべてのリクエストは認証が必要
            )
            .formLogin(form -> form.disable());//フォームベースのログインを無効化!この設定によって、Spring Securityがデフォルトで提供するログインフォームを使わないようにしてる
        return http.build();
    }
}