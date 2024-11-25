package com.example.todo_backend.controller;

import com.example.todo_backend.controller.TaskData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.*;

@Repository
public interface TaskRepository extends JpaRepository<TaskData, Long> {
    @Query("SELECT t FROM TaskData t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<TaskData> findByTitleContaining(@Param("title") String title);

    @Query("SELECT t FROM TaskData t WHERE LOWER(t.description) LIKE LOWER(CONCAT('%', :description, '%'))")
    List<TaskData> findByDescriptionContaining(@Param("description") String description);

    @Query("SELECT t FROM TaskData t WHERE LOWER(t.importance) LIKE LOWER(CONCAT('%', :importance, '%'))")
    List<TaskData> findByImportanceContaining(@Param("importance") String importance);

    @Query("SELECT t FROM TaskData t WHERE t.id = :id")
    List<TaskData> findTaskById(@Param("id") String id);
}