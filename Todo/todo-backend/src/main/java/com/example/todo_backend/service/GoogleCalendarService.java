package com.example.todo_backend.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.google.api.client.util.DateTime;

@Service
public class GoogleCalendarService {

    public String syncTasksToGoogleCalendar(String accessToken, String title, String description, LocalDateTime startTime, LocalDateTime endTime) throws GeneralSecurityException, IOException {
        Calendar service = new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                request -> request.getHeaders().setAuthorization("Bearer " + accessToken)
        ).setApplicationName("Todo App").build();

        Event event = new Event()
                .setSummary(title)
                .setDescription(description);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        event.setStart(new EventDateTime().setDateTime(new com.google.api.client.util.DateTime(startTime.format(formatter) + "Z")));
        event.setEnd(new EventDateTime().setDateTime(new com.google.api.client.util.DateTime(endTime.format(formatter) + "Z")));

        Event createdEvent = service.events().insert("primary", event).execute();

        // Return the eventId
        return createdEvent.getId();
    }


    public void updateCalendarEvent(String accessToken, String eventId, String title, String description, LocalDateTime startTime, LocalDateTime endTime)
            throws GeneralSecurityException, IOException {

        // Build Calendar Service
        Calendar service = new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                request -> request.getHeaders().setAuthorization("Bearer " + accessToken)
        ).setApplicationName("Todo App").build();

        // Retrieve existing event
        Event existingEvent = service.events().get("primary", eventId).execute();

        // Update event details
        existingEvent.setSummary(title);
        existingEvent.setDescription(description);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        existingEvent.setStart(new EventDateTime().setDateTime(new DateTime(startTime.format(formatter) + "Z")));
        existingEvent.setEnd(new EventDateTime().setDateTime(new DateTime(endTime.format(formatter) + "Z")));

        // Update the event in Google Calendar
        service.events().update("primary", eventId, existingEvent).execute();
    }


    public void deleteCalendarEvent(String accessToken, String eventId)
            throws GeneralSecurityException, IOException {
        // Build Calendar Service
        Calendar service = new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                request -> request.getHeaders().setAuthorization("Bearer " + accessToken)
        ).setApplicationName("Todo App").build();

        // Delete event from Google Calendar
        service.events().delete("primary", eventId).execute();
    }
}