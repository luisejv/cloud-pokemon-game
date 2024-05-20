import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type MessageModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  message: string;
};

const MessageModal = ({ isOpen, onOpenChange, message }: MessageModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xs">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <p style={{ color: "#000" }}>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
