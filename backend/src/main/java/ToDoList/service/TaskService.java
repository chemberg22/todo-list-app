package ToDoList.service;

import ToDoList.entity.Task;
import ToDoList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task) {
        if (taskRepository.existsByName(task.getName())) {
            throw new RuntimeException("Task with this name already exists.");
        }
        return taskRepository.save(task);
    }

    public List<Task> listTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(Long id, Task task) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found by ID: " + id));

        if (!existingTask.getName().equals(task.getName()) &&
                taskRepository.existsByName(task.getName())) {
            throw new RuntimeException("Task with this name already exists.");
        }

        existingTask.setName(task.getName());
        existingTask.setDescription(task.getDescription());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.isStatus());

        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found by ID: " + id);
        }
        taskRepository.deleteById(id);
    }
}
