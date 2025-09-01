import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTask } from '../services/api';
import '../styles/TaskForm.css';

// Component for creating a new task
// @return = JSX element, task creation form component
function TaskForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 1,
    status: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handles changes to form inputs
  // @param = input change event
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  // Handles form submission to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Task name is required.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createTask({
        ...formData,
        priority: parseInt(formData.priority),
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error creating task.');
      setLoading(false);
    }
  };

  // Navigates back to the task list
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <header>
        <h1>New Task</h1>
      </header>

      <main>
        <div className="data-container">
          {error && <div className="error">{error}</div>}
          <div className="data-item">
            <span className="data-label">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="data-input"
              placeholder="Type task's name"
            />
          </div>
          <div className="data-item">
            <span className="data-label">Description:</span>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="data-input"
              placeholder="Type task's description"
            />
          </div>
          <div className="data-item">
            <span className="data-label">Priority:</span>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="data-input"
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div className="data-item">
            <span className="data-label">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="data-input"
            >
              <option value={false}>Pending</option>
              <option value={true}>Completed</option>
            </select>
          </div>
          <div className="button-group">
            <button
              className="save-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              className="cancel-button"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default TaskForm;