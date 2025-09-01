package ToDoList.service;

import ToDoList.entity.Task;
import ToDoList.exception.TaskNameExistsException;
import ToDoList.exception.TaskNotFoundException;
import ToDoList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Service layer for handling task-related business logic
@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    // Creates a new task after validating its uniqueness
    // @param = task to create
    // @return = created task
    // @throws = TaskNameExistsException if a task with the same name exists
    public Task createTask(Task task) {
        if (taskRepository.existsByName(task.getName())) {
            throw new TaskNameExistsException(task.getName());
        }
        return taskRepository.save(task);
    }

    // Retrieves all tasks, sorted by status and priority
    // @return = list of all tasks
    public List<Task> listTasks() {
        return taskRepository.findAllByOrderByStatusAscPriorityDesc();
    }

    // Finds a task by ID
    // @param = task ID
    // @return = Optional containing the task if found
    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    // Updates a task by ID
    // @param = task ID and task body
    // @return = updated task
    // @throws = TaskNotFoundException if the task is not found and TaskNameExistsException if the new name is already taken
    public Task updateTask(Long id, Task task) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        if (!existingTask.getName().equals(task.getName()) &&
                taskRepository.existsByName(task.getName())) {
            throw new TaskNameExistsException(task.getName());
        }

        existingTask.setName(task.getName());
        existingTask.setDescription(task.getDescription());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.isStatus());

        return taskRepository.save(existingTask);
    }

    // Deletes a task by ID
    // @param = task ID
    // @throws = TaskNotFoundException if the task is not found
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        taskRepository.deleteById(id);
    }
}
