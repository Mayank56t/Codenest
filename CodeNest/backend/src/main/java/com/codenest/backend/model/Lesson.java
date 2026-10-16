package com.codenest.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lessons")
public class Lesson {

    @Id
    private String id;

    private int lessonNumber;
    private String title;
    private String level;
    private String description;
    private String videoUrl;

    public Lesson() {
    }

    public Lesson(
            int lessonNumber,
            String title,
            String level,
            String description,
            String videoUrl) {

        this.lessonNumber = lessonNumber;
        this.title = title;
        this.level = level;
        this.description = description;
        this.videoUrl = videoUrl;
    }

    public String getId() {
        return id;
    }

    public int getLessonNumber() {
        return lessonNumber;
    }

    public void setLessonNumber(int lessonNumber) {
        this.lessonNumber = lessonNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}