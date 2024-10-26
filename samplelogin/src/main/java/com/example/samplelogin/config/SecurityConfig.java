package com.example.samplelogin.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {//パスワードのハッシュ化！！BCryptアルゴリズムを使用してる
        return new BCryptPasswordEncoder();//SpringコンテナにBCryptPasswordEncoderのインスタンスを登録することを示しており、他の部分からこのインスタンスを使用可能！
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())//CSRF保護の無効化→CSRF保護は、主にブラウザからのフォーム送信を対象としたセキュリティ対策　APIベースのアプリケーションやRESTful APIではトークン認証など他の方法でセキュリティを確保することが一般的
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))//すべてのCORSエラーを解消の呼び出し
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login", "/api/register", "/api/users").permitAll() //リクエストは認証なしでアクセスを許可
                .anyRequest().authenticated()//それ以外のすべてのリクエストは認証が必要
            )
            .formLogin(form -> form.disable());
        return http.build();
    }
//すべてのCORSエラーを解消
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
