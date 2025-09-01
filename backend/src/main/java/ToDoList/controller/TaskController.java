package ToDoList.controller;

import ToDoList.entity.Task;
import ToDoList.exception.TaskNotFoundException;
import ToDoList.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// REST controller for managing tasks in route /tasks
@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173/")
public class TaskController {
    @Autowired
    private TaskService taskService;

    // Creates a new task
    // @param = task to create
    // @return = created task with HTTP status 201
    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    // Retrieves all tasks sorted
    // @return = list of all tasks
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.listTasks();
        return ResponseEntity.ok(tasks);
    }

    // Retrieves a task by ID
    // @param = task ID
    // @return = the task if found, or 404 if not found
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        return ResponseEntity.ok(task);
    }

    // Updates an existing task by ID
    // @param = task ID to update
    // @return = updated task
    @PutMapping("{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        return ResponseEntity.ok(updatedTask);
    }

    // Delete a task by ID
    // @param = task id to delete
    // @return = HTTP status 204 if successful
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
