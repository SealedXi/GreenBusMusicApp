package com.greenbus.music.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig implements WebMvcConfigurer{
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.authorizeRequests().anyRequest().permitAll();
		http.csrf().disable();
		
		return http.build();
	}
	@Bean
	public InMemoryUserDetailsManager userDetailsService() {
	    UserDetails user = User.withUsername("cst8277")
	      .password("8277")
	      .roles("USER")
	      .build();
	    return new InMemoryUserDetailsManager(user);
	}
	
	
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new GreenBusInterceptor())
                .addPathPatterns("/**")// Intercept all url
                .excludePathPatterns("/api/users/login")// exception login
                .excludePathPatterns("/api/users/register");// and register
    }
 
}
