import { Box, useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode(); // Manejo del modo claro/oscuro

  return (
    <Box
      as="footer" // Indica que es un footer semántico
      bg={colorMode === "light" ? "#4fd1c5" : "#2c7a7b"}
      color={colorMode === "light" ? "black" : "white"}
      textAlign="center"
      py={5} // Espaciado interno vertical
      position="absolute" // Fija el footer en la parte inferior
      bottom={0} // Se ajusta al fondo de la pantalla
      width="100%"
    >
      <p>&copy; 2024 Administrador de tareas.</p>
    </Box>
  );
};

export default Footer;
