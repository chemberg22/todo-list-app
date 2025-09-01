import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import TaskEdit from './pages/TaskEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskEdit />} />
      </Routes>
    </Router>
  );
}

export default App;