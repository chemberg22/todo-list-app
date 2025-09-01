package ToDoList.exception;

public class TaskNameExistsException extends RuntimeException {

    // Construct TaskNameExistsException with a detailed message
    // @param = task name that already exists
    public TaskNameExistsException(String name) {
        super("Task with name '" + name + "' already exists");
    }
}
