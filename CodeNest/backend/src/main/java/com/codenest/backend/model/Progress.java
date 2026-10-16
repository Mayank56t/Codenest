package com.codenest.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "progress")
public class Progress {

    @Id
    private String id;

    private String username;

    private int lessonNumber;

    private boolean lessonCompleted;

    private int quizScore;

    private int totalQuestions;

    public Progress() {
    }

    public Progress(
            String username,
            int lessonNumber,
            boolean lessonCompleted,
            int quizScore,
            int totalQuestions) {

        this.username = username;
        this.lessonNumber = lessonNumber;
        this.lessonCompleted = lessonCompleted;
        this.quizScore = quizScore;
        this.totalQuestions = totalQuestions;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getLessonNumber() {
        return lessonNumber;
    }

    public void setLessonNumber(int lessonNumber) {
        this.lessonNumber = lessonNumber;
    }

    public boolean isLessonCompleted() {
        return lessonCompleted;
    }

    public void setLessonCompleted(boolean lessonCompleted) {
        this.lessonCompleted = lessonCompleted;
    }

    public int getQuizScore() {
        return quizScore;
    }

    public void setQuizScore(int quizScore) {
        this.quizScore = quizScore;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
}