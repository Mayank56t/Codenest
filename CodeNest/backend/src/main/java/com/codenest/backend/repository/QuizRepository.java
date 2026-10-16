package com.codenest.backend.repository;

import com.codenest.backend.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizRepository extends MongoRepository<Quiz, String> {

    List<Quiz> findByLessonId(int lessonId);
}