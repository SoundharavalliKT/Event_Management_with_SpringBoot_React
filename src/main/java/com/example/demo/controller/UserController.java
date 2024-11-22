package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.Event_RegistrationRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;


@Controller
@RequestMapping(path="/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewUser (@RequestParam String name, @RequestParam String email,
                              @RequestParam String password, @RequestParam String location) {

        try{
            String hashedPassword = hashPassword(password);
            User n = new User();
            n.setUser_name(name);
            n.setEmail(email);
            n.setHashed_password(hashedPassword);
            n.setLocation(location);

            log.info("Adding new : "+ n +"user");
            userRepository.save(n);
            return "Account Created Successfully";
        }
        catch (Exception e){
            log.error(e.getMessage());
            if(e.getMessage().contains("Duplicate"))
                return "User already exists !";
            return "Error : " + e.getMessage();
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findByActiveTrue();
    }

    @GetMapping(path="/get-user")
    public @ResponseBody User getUser(@RequestParam String email) {
        return userRepository.findByEmail(email).isPresent()?userRepository.findByEmail(email).get():null;
    }

    @GetMapping(path="/sign-in")
    public @ResponseBody String signIn(@RequestParam String email, @RequestParam String password) {
        try{
            String hashedInputPassword = hashPassword(password);
            Optional<User> user = userRepository.findByEmail(email);
            if(user.isPresent()){
                if(hashedInputPassword.equals(user.get().getHashed_password())){
                    return "Login Successful";
                }
                else{
                    return "Wrong password";
                }
            }
            else{
                log.info("User not found");
                return "Error : please check your email or register";
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : " + e.getMessage();
        }

    }

    @PutMapping("/update-user")
    public @ResponseBody String updateUser(@RequestBody User new_user) {
        try{
            Optional<User> user = userRepository.findById(new_user.getUser_id());
            if(user.isPresent()){
                User e = user.get();
                e.setUser_name(new_user.getUser_name());
                e.setEmail(new_user.getEmail());
                e.setLocation(new_user.getLocation());
                userRepository.save(e);
                return "Updated Successfully";
            }
            else{
                return "User Not Found";
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : "+e.getMessage();
        }
    }

    @PutMapping("/update-user-password")
    public @ResponseBody String updateUserPassword(@RequestParam String email, @RequestParam String password) {
        try{
            Optional<User> user = userRepository.findByEmail(email);
            String hashedPassword = hashPassword(password);
            if(user.isPresent()){
                User e = user.get();
                e.setHashed_password(hashedPassword);
                userRepository.save(e);
                return "Password Updated Successfully";
            }
            else{
                return "User Not Found";
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : "+e.getMessage();
        }
    }

    @GetMapping(path="/verify-password")
    public @ResponseBody String verifyPassword(@RequestParam String email, @RequestParam String password) {
        try{
            String hashedInputPassword = hashPassword(password);
            Optional<User> user = userRepository.findByEmail(email);
            if(user.isPresent()){
                if(hashedInputPassword.equals(user.get().getHashed_password())){
                    return "Password Verified";
                }
                else{
                    return "Wrong current password";
                }
            }
            else{
                log.info("User not found");
                return "Error : User not found";
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : " + e.getMessage();
        }

    }


    @PutMapping("/delete-user")
    public @ResponseBody String deleteUser(@RequestParam String user_id) {
        try{
            Optional<User> user = userRepository.findById(Integer.valueOf(user_id));
            if(user.isPresent()){
                User u = user.get();
                u.setActive(false);
                userRepository.save(u);
                return "Deleted Successfully";
            }
            else {
                return "User Not Found";
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : "+e.getMessage();
        }

    }

    public static String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");

        byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));

        StringBuilder hexString = new StringBuilder();
        for (byte b : encodedHash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}