import { Modal } from "react-bootstrap";

interface ModalProps {
  closeModal: () => void;
}

const NewConversationModal: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
    </>
  );
};

export default NewConversationModal;
