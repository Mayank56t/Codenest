package com.codenest.backend.controller;

import com.codenest.backend.model.Progress;
import com.codenest.backend.repository.ProgressRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "http://localhost:5173")
public class ProgressController {

    private final ProgressRepository progressRepository;

    public ProgressController(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    @GetMapping("/{username}")
    public List<Progress> getUserProgress(
            @PathVariable String username) {

        return progressRepository.findByUsername(username);
    }

    @GetMapping("/{username}/{lessonNumber}")
    public Progress getLessonProgress(
            @PathVariable String username,
            @PathVariable int lessonNumber) {

        return progressRepository
                .findByUsernameAndLessonNumber(
                        username,
                        lessonNumber
                )
                .orElse(null);
    }

    @PostMapping
    public Progress saveProgress(
            @RequestBody Progress progress) {

        Progress existing =
                progressRepository
                        .findByUsernameAndLessonNumber(
                                progress.getUsername(),
                                progress.getLessonNumber()
                        )
                        .orElse(null);

        if (existing != null) {

            existing.setLessonCompleted(
                    progress.isLessonCompleted()
            );

            existing.setQuizScore(
                    progress.getQuizScore()
            );

            existing.setTotalQuestions(
                    progress.getTotalQuestions()
            );

            return progressRepository.save(existing);
        }
        return progressRepository.save(progress);
    }
}