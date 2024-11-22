package com.example.demo.controller;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static com.example.demo.controller.UserController.hashPassword;


@Controller
@RequestMapping(path="/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    private static final Logger log = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private AdminRepository adminRepository;

    @GetMapping(path="/sign-in")
    public @ResponseBody String signIn(@RequestParam String email, @RequestParam String password) {
        try{
            Optional<Admin> admin = adminRepository.findByEmail(email);
            String hashedInputPassword = hashPassword(password);
            if(admin.isPresent()){
                if(hashedInputPassword.equals(admin.get().getHashed_password())){
                    return "Login Successful";
                }
                else{
                    return "Wrong password";
                }
            }
            else{
                log.info("Admin not found");
                return "Error : please check your email or register";
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : " + e.getMessage();
        }

    }

}