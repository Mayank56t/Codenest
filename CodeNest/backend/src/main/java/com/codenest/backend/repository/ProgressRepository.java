package com.codenest.backend.repository;

import com.codenest.backend.model.Progress;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProgressRepository
        extends MongoRepository<Progress, String> {

    List<Progress> findByUsername(String username);

    Optional<Progress> findByUsernameAndLessonNumber(
            String username,
            int lessonNumber);

    void deleteByUsername(String username);
}