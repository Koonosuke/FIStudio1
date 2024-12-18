package com.example.samplelogin.config;

import java.io.IOException;
import java.util.Collections;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("Request URL: " + request.getRequestURL());
        System.out.println("Headers:");
        Collections.list(request.getHeaderNames())
                .forEach(header -> System.out.println(header + ": " + request.getHeader(header)));

        filterChain.doFilter(request, response);
    }
}
