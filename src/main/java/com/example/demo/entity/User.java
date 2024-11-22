package com.example.demo.entity;
import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer user_id;

    @Column(nullable = false)
    private String user_name;

    @Column(nullable = false)
    private String hashed_password;

    @Column(unique = true)
    private String email;

    @Column
    private String location;

    @Column
    private Boolean active = true;

    @Column
    private Integer no_of_events_hosted =0;

    @Column
    private Integer no_of_registered_events =0;

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getHashed_password() {
        return hashed_password;
    }

    public void setHashed_password(String hashed_password) {
        this.hashed_password = hashed_password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Integer getNo_of_events_hosted() {
        return no_of_events_hosted;
    }

    public void setNo_of_events_hosted(Integer no_of_events_hosted) {
        this.no_of_events_hosted = no_of_events_hosted;
    }

    public Integer getNo_of_registered_events() {
        return no_of_registered_events;
    }

    public void setNo_of_registered_events(Integer no_of_registered_events) {
        this.no_of_registered_events = no_of_registered_events;
    }
}