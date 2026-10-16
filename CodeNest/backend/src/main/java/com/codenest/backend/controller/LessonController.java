package com.codenest.backend.controller;

import com.codenest.backend.model.Lesson;
import com.codenest.backend.repository.LessonRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "http://localhost:5173")
public class LessonController {

    private final LessonRepository lessonRepository;

    public LessonController(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    @GetMapping
    public List<Lesson> getLessons() {
        return lessonRepository.findAll();
    }

    @GetMapping("/{lessonNumber}")
    public Lesson getLessonByNumber(
            @PathVariable int lessonNumber) {

        return lessonRepository
                .findByLessonNumber(lessonNumber)
                .orElse(null);
    }
}