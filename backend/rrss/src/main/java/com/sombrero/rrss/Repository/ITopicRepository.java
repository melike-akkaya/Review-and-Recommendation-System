package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITopicRepository extends JpaRepository<Topic, Integer> {
}
