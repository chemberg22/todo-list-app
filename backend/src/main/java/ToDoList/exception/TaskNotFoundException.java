package ToDoList.exception;

public class TaskNotFoundException extends RuntimeException {

    // Construct TaskNotFoundException with a detailed message
    // @param = task ID that wasn't found
    public TaskNotFoundException(Long id) {
        super("Task not found with ID: " + id);
    }
}
