package com.example.samplelogin.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSecurity
@EnableWebSocketMessageBroker
public class SecurityConfig implements WebSocketMessageBrokerConfigurer {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/login",
                    "/api/logout",
                    "/api/isAdmin",
                    "api/notifications/self",
                    "/api/notifications",
                    "/api/edit",
                    "/api/register",
                    "/api/users",
                    "/api/user",
                    "/api/user/**",
                    "/api/messages/**",
                    "/api/subjects/**",
                    "/api/subjects/{subjectId}/contents/**",
                    "/admin",
                    "/ws/**",
                    "/api/messages/latest"
                ).permitAll() // 許可されるエンドポイント
                .anyRequest().authenticated() // 他のリクエストは認証を要求
            )
            .logout(logout -> logout
                .logoutUrl("/api/logout")
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(200);
                    response.getWriter().write("Logout successful");
                })
                .invalidateHttpSession(true) // セッションを無効化
                .deleteCookies("JSESSIONID") // クッキーを削除
            )
            .sessionManagement(session -> session
                .maximumSessions(1) // 最大セッション数を制限
                .maxSessionsPreventsLogin(false) // 新しいセッションが既存のセッションを無効化
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");  // ローカルでのReact実行
        configuration.addAllowedOrigin("http://frontendreact:3000"); // Docker内のReact実行（修正）
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 許可するHTTPメソッドをリスト化
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/topic/read-status"); // Adding /topic/read-status for read status updates
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // WebSocketのCORSを許可
                .withSockJS();
    }
}
