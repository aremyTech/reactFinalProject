// TaskContext.jsx
import React, { createContext, useReducer } from 'react';

// Crea el contexto de tareas
export const TaskContext = createContext();

// Define el estado inicial
const initialState = {
  tasks: [],
  currentTask: null,
};

// Define el reducer que manejará las acciones
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "SET_CURRENT_TASK":
      return { ...state, currentTask: action.payload };
    default:
      return state;
  }
};

// El proveedor de contexto que envolverá los componentes
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
