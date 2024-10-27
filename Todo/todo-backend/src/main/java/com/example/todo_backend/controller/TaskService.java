package com.example.todo_backend.controller;

import com.example.todo_backend.controller.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository toDoRepository;

    public List<TaskData> getAllToDos() {
        return toDoRepository.findAll();
    }

    public Optional<TaskData> getToDoById(Long id) {
        return toDoRepository.findById(id);
    }

    public TaskData createToDo(TaskData toDo) {
        return toDoRepository.save(toDo);
    }

    public void deleteToDoById(Long id) {
        toDoRepository.deleteById(id);
    }

    public TaskData updateToDoById(Long id, TaskData updatedToDo) {
        return toDoRepository.findById(id)
                .map(toDo -> {
                    toDo.setTitle(updatedToDo.getTitle());
                    toDo.setCompleted(updatedToDo.isCompleted());
                    return toDoRepository.save(toDo);
                })
                .orElseThrow(() -> new RuntimeException("ToDo not found with id " + id));
    }

    public void updateTaskStatus(Long id, boolean completed) {
        TaskData task = toDoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));  // Retrieve the TaskData or throw an exception
        task.setCompleted(completed);  // Update the completion status
        toDoRepository.save(task);     // Save the updated task
    }

    public List<TaskData> getTasksWithTitleContaining(String title) {
        return toDoRepository.findByTitleContaining(title);
    }
}