package com.example.demo.repository;

import com.example.demo.entity.Event_Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Event_RegistrationRepository extends JpaRepository<Event_Registration, Integer> {

    @Query(value = "SELECT u.user_name FROM user u INNER JOIN event_registration r ON u.user_id = r.user_id WHERE r.event_id = :eventId", nativeQuery = true)
    Iterable<String> findRegistrationsByEventId(Integer eventId);

}
