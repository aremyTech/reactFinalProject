import { useState } from "react";
import { Box, Flex, HStack, IconButton, useDisclosure, useColorMode, Text, Avatar } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import profile_img from '../assets/1000029846.jpg';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); //Manejo del modo claro/oscuro
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <Box 
      as="header" w="100%" 
      bg={colorMode === "light" ?  "#4fd1c5" : "#2c7a7b"} 
      p={4} boxShadow="md" 
      color={colorMode === "light" ? "black" : "white"}
    >
      <Flex justify="space-between" align="center">
        {/* Alineación a la izquierda */}
        <HStack>
          <Text fontSize="lg" fontWeight="bold">Administrador de Tareas</Text>
        </HStack>

        {/* Alineación a la derecha */}
        <HStack spacing={4} >
            <Link to="/">Inicio</Link>
            <Link to="/tasks">Tareas</Link>
            <Link to="/TaskCalendar">Calendario</Link>
          
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            color={colorMode === "light" ? "black" : "white"}
            onClick={toggleColorMode} //Permite cambiar el tema
            fontSize="20px"
            aria-label="Toggle theme"
            variant="ghost"
          />

          <Avatar size="md" name="Luis Saúl" 
            src={profile_img}
            onClick={onOpen}
            aria-label="Profile"
            variant="ghost"
            fontSize="24px"
          />
        </HStack>
      </Flex>

      {/* Modal emergente de perfil */}
      <Profile isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
