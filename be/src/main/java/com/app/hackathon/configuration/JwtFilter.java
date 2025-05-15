package com.app.hackathon.configuration;

import com.app.hackathon.entity.User;
import com.app.hackathon.service.JwtService;
import com.app.hackathon.service.UserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailService userDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        try{
            String authHeader = request.getHeader("Authorization");

            String token = null;
            String email = null;
            if(authHeader!=null && authHeader.startsWith("Bearer ")){
                token = authHeader.substring(7).trim();
                email = jwtService.extractEmail(token);
            }


            if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){

                User user = userDetailService.loadUserByUsername(email);
                if(jwtService.validate(token,user)){
                    UsernamePasswordAuthenticationToken tokenUP = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());

                    tokenUP.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(tokenUP);
                }
            }
            //issue here
            filterChain.doFilter(request,response);

        }catch (Exception e){
            System.out.println("Error in JWT filter(see JwtFilter.java)" + e);
        }
    }
}
