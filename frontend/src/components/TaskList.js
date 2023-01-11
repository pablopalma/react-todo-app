import {useEffect, useState} from 'react'
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from '../App';
import loadingImg from '../assets/loader.gif'

export const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [taskId, setTaskId] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        completed: false
    });

    const {name} = formData;
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    useEffect(() => {
        getTasks()
      
        return () => {
        }
      }, []);
  
      useEffect(() => {
          const cTask = tasks.filter((task) => {
              return task.completed === true;
          })
          setCompletedTasks(cTask);
      }, [tasks]);


    const getTasks = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.get(`${URL}/api/tasks/getAllTasks`);
            setTasks(data);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    const creatTask = async (e) => {
        e.preventDefault();
        if(name === ""){
            return toast.error("Input field cannot be empty!");
        }

        try {
            await axios.post(`${URL}/api/tasks/create`, formData);
            toast.success("Task created successfully")
            setFormData({...formData, name: ""});
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }

    };

    const deleteTask = async (id) =>{
        try {
            await axios.delete(`${URL}/api/tasks/delete/${id}`);
            getTasks();
            toast.success("Task deleted successfully!")
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getSingleTask = async (task) => {
        setFormData({name: task.name, completed: false});
        setTaskId(task._id);
        setEditing(true);
    };

    const updateTask = async (e) => {
        e.preventDefault();
        if(e.name === ""){
            toast.error("Input field cannot be empyt!");
        }
        
        try {
            await axios.put(`${URL}/api/tasks/update/${taskId}`, formData);
            setFormData({...formData, name:""});
            setEditing(false);
            getTasks();
            toast.success("Task updated successfully!")
        } catch (error) {
            toast.error(error.message);
        }
    }

    const setTaskToComplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true
        };

        try {
            await axios.put(`${URL}/api/tasks/update/${task._id}`, newFormData);
            getTasks();
            toast.success("Task completed! Congratz :D")
        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div>
            <h2>Task Manager</h2>
            <TaskForm 
                name={name} 
                handleInputChange = {handleInputChange}
                createTask = {creatTask}
                isEditing = {isEditing}
                updateTask = {updateTask}
                setTaskToComplete = {setTaskToComplete}
            />
            {tasks.length > 0 &&
                (
                    <div className='--flex-between --pb'>
                        <p>
                            <b>Total Tasks:</b> {tasks.length}
                        </p>
                        <p>
                            <b>Completed Tasks:</b>
                            {completedTasks.length}
                        </p>
                    </div>
                )
            }
            <hr />
            {
                isLoading && (
                    <div className='--flex-center'>
                        <img src={loadingImg} alt="Loading" />
                    </div>
            )}
            {
                isLoading && tasks.length === 0 ? (
                    <p className='--py'> No task added. </p>
                ) : (
                    <>
                    {tasks.map((task, index) => {
                        return <Task
                         key={task._id} 
                         task={task} 
                         index={index} 
                         deleteTask={deleteTask}
                         getSingleTask={getSingleTask}
                         updateTask={updateTask}
                         setTaskToComplete={setTaskToComplete}
                         />
                    } )}
                    </>
                )
            }
        </div>
    )
}

export default TaskList;