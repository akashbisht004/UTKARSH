package com.app.hackathon.service;

import com.app.hackathon.entity.User;
import com.app.hackathon.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private @Lazy AuthenticationManager authenticationManager;



    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if(user== null){
            throw new UsernameNotFoundException("User not found with the given email");
        }
        return user;
    }

    public String verify(User user) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        if(authentication.isAuthenticated()){
            User dbUser = userRepository.findByEmail(user.getEmail());
            return jwtService.generateToken(dbUser.getEmail());
        }
        else{
            return null;
        }

    }

    public String register(User user){

        if(userRepository.findByEmail(user.getEmail())!=null){
            return null;
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User dbUser = userRepository.save(user);

        if(dbUser!=null){
            return jwtService.generateToken(dbUser.getEmail());

        }
        else{
            throw new RuntimeException("Error in registration");
        }
    }



    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User find(String email){
        return userRepository.findByEmail(email);
    }


    public void delete(String userId) {
        ObjectId objectId = new ObjectId(userId);
        userRepository.deleteById(objectId);
    }
}
