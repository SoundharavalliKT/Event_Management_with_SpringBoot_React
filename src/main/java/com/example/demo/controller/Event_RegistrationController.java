package com.example.demo.controller;

import com.example.demo.entity.Event_Registration;
import com.example.demo.entity.User;
import com.example.demo.repository.Event_RegistrationRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;


@Controller
@RequestMapping(path="/event_registration")
@CrossOrigin(origins = "http://localhost:3000")
public class Event_RegistrationController {
    private static final Logger log = LoggerFactory.getLogger(Event_RegistrationController.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Event_RegistrationRepository event_registrationRepository;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addNewEventRegistration (@RequestParam Integer event_id, @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        Optional<User> user = userRepository.findByEmail(email);

        Integer user_id=0;
        if(user.isPresent()){
            user_id = user.get().getUser_id();
        }
        else{
            log.info("User not found");
            return "Error : please check your email";
        }

        try{
            Event_Registration n = new Event_Registration();
            n.setEvent_id(event_id);
            n.setUser_id(user_id);


            log.info("Adding new : "+ n +"event registration");
            event_registrationRepository.save(n);
            return "Registration Successful! ";
        }
        catch (Exception e){
            log.error(e.getMessage());
            if(e.getMessage().contains("Duplicate"))
                return "Already Registered !";
            return "Error : " + e.getMessage();
        }

    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Event_Registration> getAllEvent_Registrations() {
        return event_registrationRepository.findAll();
    }


    @GetMapping(path="/get-attendees")
    public @ResponseBody Iterable<String> getAttendees(@RequestParam Integer event_id) {

        try{
            return event_registrationRepository.findRegistrationsByEventId(event_id);
        }
        catch (Exception e){
            log.error(e.getMessage());
            return new ArrayList<>();
        }

    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(RuntimeException.class)
    public String handleNotFound(RuntimeException ex) {
        return ex.getMessage();
    }
}