package com.example.demo.controller;

import com.example.demo.entity.Event;
import com.example.demo.entity.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;


@Controller
@RequestMapping(path="/event")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {
    private static final Logger log = LoggerFactory.getLogger(EventController.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewEvent (@RequestParam String title, @RequestParam String description,
                               @RequestParam LocalDate date, @RequestParam LocalTime time,
                               @RequestParam String location, @RequestParam String email){
        Optional<User> user = userRepository.findByEmail(email);
        Integer user_id=0;
        if(user.isPresent()){
            user_id = user.get().getUser_id();
        }
        else{
            log.info("User not found");
            return "Error : please check your email";
        }
        try {
            Event n = new Event();
            n.setTitle(title);
            n.setDescription(description);
            n.setDate(date);
            n.setTime(time);
            n.setLocation(location);
            n.setUser_id(user_id);


            log.info("Adding new : " + n + "event");
            eventRepository.save(n);
            return "Event Added Successfully";
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : " + e.getMessage();
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Event> getAllEvents() {
        return eventRepository.findByActiveTrue();
    }

    @GetMapping(path="/get-event")
    public @ResponseBody Event getEvent(@RequestParam String event_id) {
        return eventRepository.findById(Integer.valueOf(event_id)).isPresent()?eventRepository.findById(Integer.valueOf(event_id)).get():null;
    }
    @PutMapping("/update-event")
    public @ResponseBody String updateEvent(@RequestBody Event new_event) {
        try{
            Optional<Event> event = eventRepository.findById(new_event.getEvent_id());
            if(event.isPresent()){
                Event e = event.get();
                e.setTitle(new_event.getTitle());
                e.setDescription(new_event.getDescription());
                e.setDate(new_event.getDate());
                e.setTime(new_event.getTime());
                e.setLocation(new_event.getLocation());
                e.setUser_id(new_event.getUser_id());
                eventRepository.save(e);
                return "Updated Successfully";
            }
            else{
                return "Event Not Found";
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : "+e.getMessage();
        }
    }

    @PutMapping("/delete-event")
    public @ResponseBody String deleteEvent(@RequestParam String event_id) {
        try{
            Optional<Event> event = eventRepository.findById(Integer.valueOf(event_id));
            if(event.isPresent()){
                Event e = event.get();
                e.setActive(false);
                eventRepository.save(e);
                return "Deleted Successfully";
            }
            else {
                return "Event Not Found";
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            return "Error : "+e.getMessage();
        }

    }

}