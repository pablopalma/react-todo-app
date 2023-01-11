import React from 'react'

export const TaskForm = ({createTask, name, handleInputChange, isEditing, updateTask, setTaskToComplete}) => {
  return (
    <form className='task-form' onSubmit={isEditing ? updateTask : createTask}>
        <input 
        type="text"
        placerholder="Add a task"
        name="name"
        value={name}
        onChange={handleInputChange}
        />
        <button type='submit'>{isEditing ? "Edit" : "Add"}</button>
    </form>
  )
}
