import './App.css';
import TaskList from './components/TaskList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskForm } from './components/TaskForm';

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="App">
      <div className='task-container'>
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
