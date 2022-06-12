import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface ModalProps {
  closeModal: () => void;
}

const NewContactModal: React.FC<ModalProps> = ({ closeModal }) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type={"text"} ref={idRef} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type={"text"} ref={nameRef} />
          </Form.Group>
          <Button className="mt-2" type={"submit"}>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;
