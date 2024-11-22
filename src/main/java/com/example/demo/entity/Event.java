package com.example.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer event_id;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column
    private LocalDate date;

    @Column
    private LocalTime time;

    @Column
    private String location;

    @Column
    private Boolean active = true;

    @Column(nullable = false)
    private Integer user_id;

    @Column
    private LocalDateTime last_modified= LocalDateTime.now();

    @Column
    private Integer no_of_attendees = 0;

    public Integer getEvent_id() {
        return event_id;
    }

    public void setEvent_id(Integer event_id) {
        this.event_id = event_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public LocalDateTime getLast_modified() {
        return last_modified;
    }

    public void setLast_modified(LocalDateTime last_modified) {
        this.last_modified = last_modified;
    }

    public Integer getNo_of_attendees() {
        return no_of_attendees;
    }

    public void setNo_of_attendees(Integer no_of_attendees) {
        this.no_of_attendees = no_of_attendees;
    }
}
