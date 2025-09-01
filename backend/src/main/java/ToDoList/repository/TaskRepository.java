package ToDoList.repository;

import ToDoList.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//JPA Repository for Task entity operations
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    //Checks if a task with the given name exists.
    //@param = name to check
    //@return = true if name exists
    boolean existsByName(String name);

    //List all tasks, sorted by status (ASC) and priority (DSC)
    //@return = sorted list
    List<Task> findAllByOrderByStatusAscPriorityDesc();
}
