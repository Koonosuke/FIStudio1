package com.example.samplelogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages={"com.example.samplelogin"})
public class SampleloginApplication {

	public static void main(String[] args) {
		SpringApplication.run(SampleloginApplication.class, args);
	}

}
