import { useContext, useState } from "react";
import { TaskContext } from "../Context/TaskContext";
import { Flex, Box, Spacer, useColorMode, Button, Icon } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TaskList from "../Components/TaskList";
import TaskForm from "../Components/TaskForm";

const TaskPage = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode(); //Manejo del modo claro/oscuro
  
  const handleAddNew = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <Flex direction="row" justify="space-between" p={5}>
      {/* Contenedor para lista de tareas */}
      <Box flex="2" mr={5} >
        <Flex align="center" mb={4}>
          <Spacer />
          {/* Botón para agregar tareas */}
          <Button
            onClick={handleAddNew}
            leftIcon={<Icon as={AddIcon} />}
            className="add-button"
            bg={colorMode === "light" ?  "#4fd1c5" : "#2c7a7b"} 
            boxShadow="md" 
            color={colorMode === "light" ? "black" : "white"}
          >
            Agregar
          </Button>
        </Flex>
        <TaskList onEdit={handleEdit} />
      </Box>

      {/* Formulario de tarea */}
      {showForm && (
        <Box flex="1" p={5} borderWidth="1px" borderRadius="md">
          <TaskForm
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            setShowForm={setShowForm}
          />
        </Box>
      )}
    </Flex>
  );
};

export default TaskPage;
