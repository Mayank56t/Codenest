package com.codenest.backend.repository;

import com.codenest.backend.model.Lesson;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LessonRepository
        extends MongoRepository<Lesson, String> {

    Optional<Lesson> findByLessonNumber(int lessonNumber);
}