import { useState, useContext, useMemo } from "react";
import { Box, Button, FormControl, FormLabel, Select, Grid, GridItem, Card, CardHeader, CardBody, Heading, Text, HStack, Icon, useColorMode } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { TaskContext } from "../Context/TaskContext";

const TaskList = ({ onEdit }) => {
  const { state, dispatch } = useContext(TaskContext);
  const { colorMode, toggleColorMode } = useColorMode(); //Manejo del modo claro/oscuro
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' para ascendente, 'desc' para descendente
  

  // Filtra y ordena las tareas
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = state.tasks.filter((task) => {
      if (filter === "all") return true;
      return task.status === filter;
    });

    // Ordena las tareas por fecha de vencimiento
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });

    return sorted;
  }, [state.tasks, filter, sortOrder]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortAsc = () => {
    setSortOrder("asc");
  };

  const handleSortDesc = () => {
    setSortOrder("desc");
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <Box p={5}>
      <HStack mb={4} align="center" spacing={2} justify="center">
      <FormControl mb={4} flex="1">
        <FormLabel>Filtrar tareas</FormLabel>
        <Select value={filter} onChange={handleFilterChange}>
          <option value="all">Todo</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completado">Completado</option>
        </Select>
      </FormControl>

      {/* Botones para ordenar */}
        <Button
            colorScheme="teal"
            onClick={handleSortAsc}
            leftIcon={<Icon as={ArrowUpIcon} w={6} h={6} fontWeight="bold"/>}
            className="order-button"
            bg={colorMode === "light" ?  "#4fd1c5" : "#2c7a7b"} 
            boxShadow="md" 
            color={colorMode === "light" ? "black" : "white"}
          >
        </Button>
        <Button
            size="md"
            colorScheme="teal"
            onClick={handleSortDesc}
            leftIcon={<Icon as={ArrowDownIcon} w={6} h={6} fontWeight="bold"/>}
            className="order-button"
            bg={colorMode === "light" ?  "#4fd1c5" : "#2c7a7b"} 
            boxShadow="md" 
            color={colorMode === "light" ? "black" : "white"}
          >
        </Button>
      </HStack>

      {/* Organiza las tareas en 3 columnas */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {filteredAndSortedTasks.map((task) => (
          <GridItem key={task.id}>
            <Card borderWidth="1px" borderRadius="md" boxShadow="md" minHeight="200px">
              <CardHeader>
                <Heading size="md">{task.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text><strong>Estado:</strong> {task.status}</Text>
                <Text><strong>Descripción:</strong> {task.description}</Text>
                <Text><strong>Fecha de vencimiento:</strong> {task.dueDate}</Text>
                <HStack justify="flex-end" mt={3}>
                  <Button colorScheme="blue" size="sm" onClick={() => onEdit(task)}>
                    Editar
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(task.id)}>
                    Eliminar
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskList;
