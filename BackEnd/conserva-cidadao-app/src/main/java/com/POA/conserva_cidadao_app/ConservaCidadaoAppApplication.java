package com.POA.conserva_cidadao_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.POA"})
public class ConservaCidadaoAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(ConservaCidadaoAppApplication.class, args);
	}
}
