package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    List<User> findByNameLikeIgnoreCase(String name);
}