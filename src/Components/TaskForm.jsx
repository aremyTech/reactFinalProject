import { useState, useContext, useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import { TaskContext } from "../Context/TaskContext";

const TaskForm = ({ editingTask, setEditingTask, setShowForm }) => {
  const { dispatch } = useContext(TaskContext);
  const [taskName, setTaskName] = useState(editingTask ? editingTask.name : "");
  const [taskDescription, setTaskDescription] = useState(editingTask ? editingTask.description : "");
  const [taskDueDate, setTaskDueDate] = useState(editingTask ? editingTask.dueDate : "");
  const [taskStatus, setTaskStatus] = useState(editingTask ? editingTask.status : "Pendiente");
  const { colorMode, toggleColorMode } = useColorMode(); //Manejo del modo claro/oscuro
  

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
      setTaskDescription(editingTask.description);
      setTaskDueDate(editingTask.dueDate);
      setTaskStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
      status: taskStatus,
    };

    if (editingTask) {
      dispatch({ type: "EDIT_TASK", payload: newTask });
      setEditingTask(null);
    } else {
      dispatch({ type: "ADD_TASK", payload: newTask });
    }

    setTaskName("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskStatus("pendiente");
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label><strong>Título:</strong></label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Tarea"
        required
      />
      <label><strong>Descripción:</strong></label>
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Descripción"
        required
      />
      <label><strong>Fecha de vencimiento:</strong></label>
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
        required
      />
      <label><strong>Estado:</strong></label>
      <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
        <option value="Pendiente">Pendiente</option>
        <option value="En progreso">En progreso</option>
        <option value="Completado">Completedo</option>
      </select>
      <button type="submit" className="form-button"
      style={{
        backgroundColor: colorMode === "light" ? "#4fd1c5" : "#2c7a7b",
        color: colorMode === "light" ? "black" : "white",
      }}>{editingTask ? "Editar" : "Agregar"} Tarea</button>
    </form>
  );
};

export default TaskForm;
