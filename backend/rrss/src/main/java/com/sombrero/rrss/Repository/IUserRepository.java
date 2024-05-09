package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    List<User> findByNameIgnoreCaseContaining(String name);
    Optional<User> findById(Integer id);
}