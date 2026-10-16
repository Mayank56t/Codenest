package com.codenest.backend.controller;

import com.codenest.backend.model.Quiz;
import com.codenest.backend.repository.QuizRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    private final QuizRepository quizRepository;

    public QuizController(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @GetMapping("/lesson/{lessonId}")
    public List<Quiz> getQuizzesByLesson(
            @PathVariable int lessonId) {

        return quizRepository.findByLessonId(lessonId);
    }
}