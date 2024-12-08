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
        String imageBase64 = body.get("imageBase64");
        taskService.updateTaskStatus(id, completed, title, description, importance, imageBase64);

        return taskService.getAllToDos();
    }

    @GetMapping("/search/{prompt}")
    public Map<String, List<TaskData>> findTasks(@PathVariable("prompt") String prompt) {
        Map<String, List<TaskData>> response = new HashMap<>();
        response.put("title", taskService.getTasksWithTitleContaining(prompt));
        response.put("description", taskService.getTasksWithDescriptionContaining(prompt));
        response.put("importance", taskService.getTasksWithImportanceContaining(prompt));

        return response;
    }

    @GetMapping("/getTask/{id}")
    public List<TaskData> getTasksWithID(@PathVariable("id") String id) {
        return taskService.getTasksWithID(id);
    }
}