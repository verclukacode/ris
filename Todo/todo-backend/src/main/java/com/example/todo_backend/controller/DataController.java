package com.example.todo_backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.example.todo_backend.controller.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello backend!";
    }

    @GetMapping("/tasks")
    public List<TaskData> getTasks() {
        return taskService.getAllToDos();
    }

    @PostMapping("/newTask")
    public List<TaskData> addTask(@RequestBody Map<String, String> body) {
        String title = body.get("title");
        taskService.createToDo(new TaskData(title));
        return taskService.getAllToDos();
    }

    @GetMapping("/deleteChecked")
    public List<TaskData> deleteCheckedTasks() {
        List<TaskData> tasks = taskService.getAllToDos();
        for (int i = 0; i < tasks.size(); i++) {
            if (tasks.get(i).isCompleted()) {
                taskService.deleteToDoById(tasks.get(i).getId());  // Use getId() to access the ID
            }
        }
        return taskService.getAllToDos();
    }

    @GetMapping("/deleteTask/{id}")
    public String deleteTask(@PathVariable("id") String id) {
        taskService.deleteToDoById(Long.parseLong(id));
        return "Cock";
    }

    @PostMapping("/updateTask")
    public List<TaskData> updateTaskStatus(@RequestBody Map<String, String> body) {
        Long id = Long.parseLong(body.get("id"));
        String title = body.get("title");
        boolean completed = Boolean.parseBoolean(body.get("completed"));
        String description = body.get("description");
        String importance = body.get("importance");
        taskService.updateTaskStatus(id, completed, title, description, importance);

        return taskService.getAllToDos();
    }

    @GetMapping("/search/{prompt}")
    public List<TaskData> findTasks(@PathVariable("prompt") String prompt) {
        return taskService.getTasksWithTitleContaining(prompt);
    }

    @GetMapping("/getTask/{id}")
    public List<TaskData> getTasksWithID(@PathVariable("id") String id) {
        return taskService.getTasksWithID(id);
    }

    @GetMapping("/getSortedTasks/{sort}")
    public List<TaskData> getTasksWithID(@PathVariable("sort") String sort) {
        return taskService.getAllToDos();
    }
}