import React, { useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";

interface ModalProps {
  closeModal: () => void;
}

const NewContactModal: React.FC<ModalProps> = ({ closeModal }) => {
  const { createContact } = useContacts();
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();

    if (idRef.current?.value && nameRef.current?.value) {
      createContact({ id: idRef.current.value, name: nameRef.current.value });
      closeModal();
    }
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
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
