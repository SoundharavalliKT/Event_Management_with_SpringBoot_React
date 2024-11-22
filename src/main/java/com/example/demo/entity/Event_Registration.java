package com.example.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Event_Registration {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer event_registration_id;

    @Column(nullable = false)
    private Integer event_id;

    @Column(nullable = false)
    private Integer user_id;

    @Column
    private LocalDateTime time_stamp=LocalDateTime.now();

    public Integer getEvent_registration_id() {
        return event_registration_id;
    }

    public void setEvent_registration_id(Integer event_registration_id) {
        this.event_registration_id = event_registration_id;
    }

    public Integer getEvent_id() {
        return event_id;
    }

    public void setEvent_id(Integer event_id) {
        this.event_id = event_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public LocalDateTime getTime_stamp() {
        return time_stamp;
    }

    public void setTime_stamp(LocalDateTime time_stamp) {
        this.time_stamp = time_stamp;
    }
}
