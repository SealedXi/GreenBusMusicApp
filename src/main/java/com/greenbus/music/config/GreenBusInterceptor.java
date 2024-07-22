package com.greenbus.music.config;

import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class GreenBusInterceptor implements HandlerInterceptor {
	 @Override
	    public boolean preHandle(HttpServletRequest request,  HttpServletResponse response, Object handler) throws Exception {
	        // When we logged in earlier, we created a session if we logged in successfully and set the user attributes in it.
	        HttpSession session = request.getSession(false);
	        if(session != null && session.getAttribute(Constant.USERINFO_SESSION_KEY)!=null){
	            return true; // pass
	        }
	      
	        System.out.println("user didn't login!");
	        return false;
	 }
}
