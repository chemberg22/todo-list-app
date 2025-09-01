package ToDoList.repository;

import ToDoList.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    boolean existsByName(String name);
}
