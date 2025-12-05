package com.App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;



@SpringBootApplication
public class EmsWebAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmsWebAppApplication.class, args);
		System.out.println("SpringBoot is Working fine .....");
		System.out.println("This is EMS WebApp");
	}

}
