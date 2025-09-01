import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../services/api';
import '../styles/TaskList.css';

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 1: return "Low";
    case 2: return "Medium";
    case 3: return "High";
  }
};

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks();
        console.log('Data obtained:', data);
        setTasks(data);
        setLoading(false);
      } catch (err) {
        console.error('Caught error:', err);
        setError(err.message);
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <>
      <header>
        <h1>Task List</h1>
      </header>

      <main>
        <section>
          <div className="search-bar">
            <Link to="/create" className="new-registration">New Task</Link>
          </div>

          <table className="user-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-tasks">No tasks found.</td>
                </tr>
              ) : (
                tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.description || 'No description.'}</td>
                    <td className={`priority-${task.priority}`}>
                      {getPriorityLabel(task.priority)}
                    </td>
                    <td className={task.status ? 'completed' : 'pending'}>
                      {task.status ? 'Completed' : 'Pending'}
                    </td>
                    <td>
                      <button className="action-button edit-button" onClick={() => navigate(`/edit/${task.id}`)}>
                        Edit
                      </button>
                      <button className="action-button delete-button" onClick={() => handleDelete(task.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default TaskList;