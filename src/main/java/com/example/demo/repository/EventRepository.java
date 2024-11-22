package com.example.demo.repository;

import com.example.demo.entity.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, Integer> {
    Iterable<Event> findByActiveTrue();
}