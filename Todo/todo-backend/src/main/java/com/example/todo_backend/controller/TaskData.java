package com.example.todo_backend.controller;

import jakarta.persistence.*;


@Entity
public class TaskData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private boolean completed;

    private String description = "";
    private String importance = "";

    private String imageBase64 = "";

    private String calendarEventId;

    public TaskData() {}

    public TaskData(String title) {
        this.title = title;
        this.completed = false;
        this.description = "Basics";
        this.importance = "Low";
        this.imageBase64 = "";
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImageBase64(String string) {
        this.imageBase64 = string;
    }

    public String getDescription() { return this.description; }

    public void setImportance(String importance) {
        this.importance = importance;
    }

    public String getImportance() { return this.importance; }

    public String getImageBase64() {
        return this.imageBase64;
    }

    public String getCalendarEventId() {
        return calendarEventId;
    }

    public void setCalendarEventId(String calendarEventId) {
        this.calendarEventId = calendarEventId;
    }
}