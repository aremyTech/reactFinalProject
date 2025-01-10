import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const Profile = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent 
          position="fixed"
          top="1%"
          right="10px"
          transform="translateY(-50%)"
          w="250px"
        >
        <ModalHeader>Perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
