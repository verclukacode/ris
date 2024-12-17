package com.example.todo_backend.controller;

import com.example.todo_backend.service.GoogleCalendarService;
import com.example.todo_backend.controller.TaskService;
import com.example.todo_backend.controller.TaskData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private GoogleCalendarService googleCalendarService;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

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
        String eventID = body.get("eventID");
        taskService.updateTaskStatus(id, completed, title, description, importance, imageBase64, eventID);

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


    @PostMapping("/syncTask")
    public String syncAllTasksToGoogleCalendar(OAuth2AuthenticationToken authToken) {
        try {
            OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                    authToken.getAuthorizedClientRegistrationId(), authToken.getName());

            String accessToken = authorizedClient.getAccessToken().getTokenValue();
            List<TaskData> tasks = taskService.getAllToDos();

            for (TaskData task : tasks) {
                if (task.getCalendarEventId() == null) {
                    // Create new event if no calendarEventId exists
                    String eventId = googleCalendarService.syncTasksToGoogleCalendar(
                            accessToken,
                            task.getTitle(),
                            task.getDescription(),
                            LocalDateTime.now(),
                            LocalDateTime.now().plusHours(1)
                    );
                    taskService.updateTaskStatus(
                            task.getId(),
                            task.isCompleted(),
                            task.getTitle(),
                            task.getDescription(),
                            task.getImportance(),
                            task.getImageBase64(),
                            eventId
                    );
                } else {
                    // Update existing event in Google Calendar
                    googleCalendarService.updateCalendarEvent(
                            accessToken,
                            task.getCalendarEventId(),
                            task.getTitle(),
                            task.getDescription(),
                            LocalDateTime.now(),
                            LocalDateTime.now().plusHours(1)
                    );
                }
            }
            return "Tasks synced and updated successfully!";
        } catch (Exception e) {
            return "Failed to sync tasks: " + e.getMessage();
        }
    }

    @GetMapping("/deleteTaskGoogle/{id}")
    public String deleteTaskGoogle(@PathVariable("id") Long id, OAuth2AuthenticationToken authToken) {
        try {
            TaskData task = taskService.getToDoById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found with ID: " + id));

            if (task.getCalendarEventId() != null) {
                OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                        authToken.getAuthorizedClientRegistrationId(), authToken.getName());

                String accessToken = authorizedClient.getAccessToken().getTokenValue();
                googleCalendarService.deleteCalendarEvent(accessToken, task.getCalendarEventId());
            }

            taskService.deleteToDoById(id);
            return "Task and corresponding Google Calendar event deleted successfully!";
        } catch (Exception e) {
            return "Failed to delete task: " + e.getMessage();
        }
    }
}