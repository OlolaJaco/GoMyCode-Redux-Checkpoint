
import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { RiAddLargeFill } from "react-icons/ri";
import ReactSwitch from 'react-switch';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleTask } from '../redux/todoSlice';

const TodoMenu = () => {
    const [task, setTask] = useState("");
    const list = useSelector((state) => state.todos.list);
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (task.trim()) {
            dispatch(addTask(task.trim()));
            setTask("");
        }
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const handleToggleTask = (id) => {
        dispatch(toggleTask(id));
    };

    return (
        <div className='mx-auto mt-8'>
            <div className='flex items-center justify-center mt-4'>
                <input
                    type="text"
                    className='w-[350px] border-2 border-blue-900 bg-gradient-to-r from-sky-900 via-sky-500 to-indigo-200 font-bold rounded-md px-3 py-2 mr-3 mb-4 placeholder:text-white'
                    placeholder='Enter Task ...'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTask();
                        }
                    }}
                />
                <button
                    className='bg-blue-500 hover:bg-blue-600 font-bold py-4 px-4 rounded mb-4'
                    onClick={handleAddTask}
                >
                    <RiAddLargeFill />
                </button>
            </div>

            <div className='flex flex-col items-center'>
                <div className={`${list.length > 0 && "bg-gradient-to-r from-sky-500 to-pink-100 pt-2 pl-2 pr-2"}`}>

                    {list.length === 0 ? (
                        <h1 className='font-bold text-3xl text-purple-700 p-2'>Add Task</h1>
                    ) : (
                        list.map(taskItem => (
                            <div
                                className={`flex w-[350px] text-md font-bold items-center space-x-2 p-2 rounded-md mb-2 ${taskItem.toggle ? "bg-green-800 text-cyan-50" : "bg-violet-500"}`}
                                key={taskItem.id}
                            >
                                <h4 className={`flex-grow ${taskItem.toggle ? "line-through" : ""}`}>
                                    {taskItem.title}
                                </h4>

                                <button
                                    className='text-red-600 font-bold text-xl py-1 px-2 rounded'
                                    onClick={() => handleDeleteTask(taskItem.id)}
                                >
                                    <MdOutlineDeleteOutline />
                                </button>

                                <ReactSwitch
                                    checked={taskItem.toggle}
                                    height={20}
                                    width={40}
                                    handleDiameter={18}
                                    onColor='#4299e1'
                                    offColor='#ccc'
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    onChange={() => handleToggleTask(taskItem.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoMenu;
