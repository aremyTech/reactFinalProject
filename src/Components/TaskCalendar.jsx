import { useContext, useState } from "react";
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, HStack } from "@chakra-ui/react";
import { TaskContext } from "../Context/TaskContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskForm from "../Components/TaskForm";

// Configuración del localizador con Moment.js
const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const { state } = useContext(TaskContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Mapeo de las tareas por react-big-calendar
  const events = state.tasks.map((task) => ({
    id: task.id,
    title: task.name,
    description: task.description,
    status: task.status,
    // Ajuste de la fecha al inicio del día local
    start: moment(task.dueDate).startOf("day").toDate(),
    end: moment(task.dueDate).endOf("day").toDate(),
  }));

  // Manejo de  clic en el evento
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  // Formulario de edición en un modal
  const handleEdit = () => {
    setEditingTask({
      id: selectedEvent.id,
      name: selectedEvent.title,
      description: selectedEvent.description,
      status: selectedEvent.status,
      // Conversión la fecha a formato `YYYY-MM-DD` para el campo de fecha
      dueDate: moment(selectedEvent.start).format("YYYY-MM-DD"),
    });
    setIsFormOpen(true); // Mostrar formulario en modal
    onClose(); // Cerrar modal de detalles
  };

  // Cierre del modal del formulario
  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Componente personalizado para el evento (solo título visible)
  const CustomEvent = ({ event }) => (
    <Box>
      <Text fontWeight="bold">{event.title}</Text>
    </Box>
  );

  return (
    <Box p={5}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day"]}
        defaultView="month"
        tooltipAccessor={(event) => event.title}
        components={{
          event: CustomEvent,
        }}
        onSelectEvent={handleEventClick}
      />

      {/* Modal para mostrar detalles del evento */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles de la Tarea</ModalHeader>
          <ModalBody>
            {selectedEvent && (
              <>
                <Text>
                  <strong>Título:</strong> {selectedEvent.title}
                </Text>
                <Text>
                  <strong>Descripción:</strong> {selectedEvent.description}
                </Text>
                <Text>
                  <strong>Estado:</strong> {selectedEvent.status}
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button onClick={handleEdit} colorScheme="blue" size="sm">
                Editar
              </Button>
              <Button onClick={onClose} colorScheme="red" size="sm">
                Cerrar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para el formulario de edición */}
      <Modal isOpen={isFormOpen} onClose={closeFormModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingTask ? "Editar Tarea" : "Nueva Tarea"}</ModalHeader>
          <ModalBody>
            <TaskForm
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              setShowForm={setIsFormOpen}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TaskCalendar;
