package ToDoList.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;

// Represents a Task entity in the application
@Entity
@Table(name = "tasks")
public class Task {
    // Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 31, unique = true)
    @NotBlank(message = "Task name is required.")
    private String name;

    @Column(length = 255)
    private String description;

    @Min(value = 1, message = "Minimum priority is 1.")
    @Max(value = 3, message = "Maximum priority is 3.")
    private int priority;

    @Column(nullable = false)
    @NotNull(message = "Task status is required.")
    private boolean status;

    // Constructors
    public Task() {
    }

    public Task(String name, String description, int priority, boolean status) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getPriority() {
        return priority;
    }

    public boolean isStatus() {
        return status;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}