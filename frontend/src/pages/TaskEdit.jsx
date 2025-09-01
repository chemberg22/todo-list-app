import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, updateTask } from '../services/api';
import '../styles/TaskEdit.css';

// Component for editing an existing task
// @return = JSX element, task edit form component
function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 1,
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetches the task data by ID and populates the form
  useEffect(() => {
    async function fetchTask() {
      try {
        const task = await getTask(id);
        setFormData({
          name: task.name || '',
          description: task.description || '',
          priority: task.priority || 1,
          status: task.status || false,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load task');
        setLoading(false);
      }
    }
    fetchTask();
  }, [id]);

  // Handles changes to form inputs
  // @param = input change event
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  // Handles form submission to update the task
  // @param = form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Task name is required');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await updateTask(id, {
        ...formData,
        priority: parseInt(formData.priority),
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to update task');
      setSaving(false);
    }
  };

  // Navigates back to the task list
  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <>
      <header>
        <h1>Edit Task</h1>
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
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              className="cancel-button"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default TaskEdit;